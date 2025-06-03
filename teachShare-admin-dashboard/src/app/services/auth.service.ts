import { Injectable, signal } from "@angular/core"
import   { HttpClient } from "@angular/common/http"
import  { Router } from "@angular/router"
import { type Observable, BehaviorSubject, tap, catchError, throwError } from "rxjs"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isActive: boolean
}

export interface LoginResponse {
  success: boolean
  token: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
  }
  expiresIn: number
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:5301/api/user"
  private tokenKey = "admin_token"
  private userKey = "admin_user"

  // Signals for reactive state
  isAuthenticated = signal(false)
  currentUser = signal<User | null>(null)
  loading = signal(false)
  error = signal<string | null>(null)

  // BehaviorSubject for compatibility with guards
  private authSubject = new BehaviorSubject<boolean>(this.hasValidToken())

  constructor(
    private http: HttpClient,private router: Router
  ) {
    // Initialize auth state on service creation
    this.initializeAuthState()
  }

  private initializeAuthState() {
    const token = this.getToken()
    const user = this.getStoredUser()

    if (token && user && !this.isTokenExpired(token)) {
      this.isAuthenticated.set(true)
      this.currentUser.set(user)
      this.authSubject.next(true)
    } else {
      this.logout()
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.loading.set(true)
    this.error.set(null)

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.success) {
          // Store token and user data
          localStorage.setItem(this.tokenKey, response.token)
          localStorage.setItem(this.userKey, JSON.stringify(response.user))

          // Update state
          this.isAuthenticated.set(true)
          this.currentUser.set(response.user)
          this.authSubject.next(true)

          // Navigate to dashboard
          this.router.navigate(["/dashboard"])
        }
      }),
      catchError((error) => {
        console.error("Login error:", error)
        const errorMessage = error.error?.message || "שגיאה בהתחברות"
        this.error.set(errorMessage)
        return throwError(() => error)
      }),
      tap(() => {
        this.loading.set(false)
      }),
    )
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    this.loading.set(true)
    this.error.set(null)

    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, userData).pipe(
      tap((response) => {
        if (response.success) {
          // Registration successful, redirect to login
          this.router.navigate(["/login"], {
            queryParams: { message: "הרשמה בוצעה בהצלחה! אנא התחבר עם הפרטים שלך" },
          })
        }
      }),
      catchError((error) => {
        console.error("Registration error:", error)
        const errorMessage = error.error?.message || "שגיאה בהרשמה"
        this.error.set(errorMessage)
        return throwError(() => error)
      }),
      tap(() => {
        this.loading.set(false)
      }),
    )
  }

  logout() {
    // Clear storage
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)

    // Reset state
    this.isAuthenticated.set(false)
    this.currentUser.set(null)
    this.authSubject.next(false)
    this.error.set(null)

    // Navigate to login
    this.router.navigate(["/login"])
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.userKey)
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
    return null
  }

  private hasValidToken(): boolean {
    const token = this.getToken()
    return token !== null && !this.isTokenExpired(token)
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch {
      return true
    }
  }

  // For guards and interceptors
  get isAuthenticated$(): Observable<boolean> {
    return this.authSubject.asObservable()
  }

  // Check if user has admin role
  isAdmin(): boolean {
    const user = this.currentUser()
    return user?.role === "admin"
  }

  // Check if user has teacher role
  isTeacher(): boolean {
    const user = this.currentUser()
    return user?.role === "teacher"
  }

  // Refresh token if needed
  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/refresh`, {}).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem(this.tokenKey, response.token)
          localStorage.setItem(this.userKey, JSON.stringify(response.user))
        }
      }),
      catchError((error) => {
        this.logout()
        return throwError(() => error)
      }),
    )
  }

  // Change password
  changePassword(currentPassword: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<{ success: boolean; message: string }>(`${this.baseUrl}/change-password`, {
        currentPassword,
        newPassword,
      })
      .pipe(
        catchError((error) => {
          const errorMessage = error.error?.message || "שגיאה בשינוי סיסמה"
          this.error.set(errorMessage)
          return throwError(() => error)
        }),
      )
  }

  // Clear error
  clearError() {
    this.error.set(null)
  }
}
