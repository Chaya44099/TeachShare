import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { 
  User, 
  FileItem, 
  Category, 
  Stats, 
  ApiResponse,
  PresignedUrlResponse,
  FileUploadData
} from '../models/api.models';
import { LoginRequest, LoginResponse } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5103/api'; // שנה לכתובת השרת שלך
  
  // State management with signals
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Auth state
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  public token$ = this.tokenSubject.asObservable();

  constructor() {
    // Set auth header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      this.setAuthHeader(token);
    }
  }

  private setAuthHeader(token: string) {
    this.tokenSubject.next(token);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenSubject.value;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    this.loading.set(false);
    
    let errorMessage = 'שגיאה לא ידועה';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.status === 0) {
      errorMessage = 'שגיאת חיבור לשרת';
    } else if (error.status === 401) {
      errorMessage = 'אין הרשאה - נא להתחבר מחדש';
      this.logout();
    } else if (error.status === 403) {
      errorMessage = 'אין הרשאה לפעולה זו';
    } else if (error.status === 404) {
      errorMessage = 'המשאב לא נמצא';
    } else if (error.status >= 500) {
      errorMessage = 'שגיאת שרת פנימית';
    }
    
    this.error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Auth Methods
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.baseUrl}/auth/login`, 
      credentials
    ).pipe(
      map(response => response.data),
      tap(loginData => {
        localStorage.setItem('token', loginData.token);
        // localStorage.setItem('refreshToken', loginData.refreshToken);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        this.setAuthHeader(loginData.token);
        this.loading.set(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
  }

  // Stats Methods
  getStats(): Observable<Stats> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.get<ApiResponse<Stats>>(
      `${this.baseUrl}/stats`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  // Users Methods
  getUsers(page: number = 1, limit: number = 10, search?: string): Observable<ApiResponse<User[]>> {
    this.loading.set(true);
    this.error.set(null);
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }
    
    return this.http.get<ApiResponse<User[]>>(
      `${this.baseUrl}/user`,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(
      `${this.baseUrl}/user/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError.bind(this))
    );
  }

  createUser(user: Partial<User>& { passwordHash: string }): Observable<User> {
    this.loading.set(true);
    
    return this.http.post<ApiResponse<User>>(
      `${this.baseUrl}/user`,
      user,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  updateUser(id: number, user: Partial<User>& { passwordHash?: string }): Observable<User> {
    this.loading.set(true);   
    console.log(user);
     
    return this.http.put<ApiResponse<User>>(
      `${this.baseUrl}/user/${id}`,
      user,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  deleteUser(id: number): Observable<void> {
    this.loading.set(true);
    
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/user/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(() => void 0),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  // Files Methods
  getFiles(
    page = 1,
    limit = 10,
    status?: string,
    categoryId?: number,
    search?: string,
  ): Observable<ApiResponse<FileItem[]>> {
    let params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    if (status) params = params.set("status", status)
    if (categoryId) params = params.set("categoryId", categoryId.toString())
    if (search) params = params.set("search", search)

    return this.http.get<ApiResponse<FileItem[]>>(`${this.baseUrl}/material`, { params })
  }

  getAllFiles(): Observable<FileItem[]> {
    return this.http.get<FileItem[]>(`${this.baseUrl}/material`).pipe(
      tap(files =>console.log('קבצים שהתקבלו:', files))
    )
  }

  getFileById(fileId: number): Observable<FileItem> {
    return this.http.get<FileItem>(`${this.baseUrl}/material/${fileId}`)
  }


// getFilesByCategory(categoryId: number): Observable<FileItem[]> {
//   return this.http.get<FileItem[]>(`${this.baseUrl}/material/by-category/${categoryId}`).pipe(
//     tap(files => {
//       console.log('קבצים שהתקבלו:', files);
//     })
//   );
// }


  // S3 Presigned URLs
  getUploadUrl(fileName: string, contentType: string): Observable<PresignedUrlResponse> {
    const params = new HttpParams().set("fileName", fileName).set("contentType", contentType)

    return this.http.get<PresignedUrlResponse>(`${this.baseUrl}/material/presigned-url`, { params }).pipe(
          tap(url => {
            console.log('קבצים שהתקבלו:', url);
          })
  );}

  getDownloadUrl(fileName: string): Observable<PresignedUrlResponse> {
    const params = new HttpParams().set("fileName", fileName)

    return this.http.get<PresignedUrlResponse>(`${this.baseUrl}/material/download-url`, { params }).pipe(
      tap(url => {
        console.log('קבצים שהתקבלו:', url);
      })
  );}

  getViewUrl(fileName: string): Observable<PresignedUrlResponse> {
    const params = new HttpParams().set("fileName", fileName)
    console.log(fileName);
    
    

    return this.http.get<PresignedUrlResponse>(`${this.baseUrl}/material/view-url`, { params }).pipe(
      tap(url => {
        console.log('קבצים שהתקבלו:', url);
      })
  
  
  );  }

  // Upload file to S3 using presigned URL
  uploadFileToS3(presignedUrl: string, file: File): Observable<any> {
    
    return  this.http.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
      },
      
      })
      
  }

  // Save file info after successful upload
  saveFileInfo(fileData: FileUploadData): Observable<FileItem> {
    return this.http.post<FileItem>(`${this.baseUrl}/material/save-file-info`, fileData)
  }

  // Admin file management
  updateFileStatus(fileId: number, action: 'approve' | 'reject', reason?: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.baseUrl}/material/status/${fileId}`,
      { action, reason }
    ).pipe(tap(response => console.log(response)));
  }
  

  deleteFile(fileId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/material/delete/${fileId}`, {})}


  // Categories Methods
  getCategories(): Observable<Category[]> {
    this.loading.set(true);
    this.error.set(null);
  
    return this.http.get<Category[]>(`${this.baseUrl}/Category`, { headers: this.getAuthHeaders() }).pipe(
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }
  

  createCategory(category: Partial<Category>): Observable<Category> {
    this.loading.set(true);
    
    return this.http.post<ApiResponse<Category>>(
      `${this.baseUrl}/Category`,
      category,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    this.loading.set(true);
    
    return this.http.put<ApiResponse<Category>>(
      `${this.baseUrl}/Category/${id}`,
      category,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }

  deleteCategory(id: number): Observable<void> {
    this.loading.set(true);
    
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/Category/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(() => void 0),
      tap(() => this.loading.set(false)),
      catchError(this.handleError.bind(this))
    );
  }
}