import { Component, signal, inject, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { LucideAngularModule } from "lucide-angular"
import { Subject, takeUntil } from "rxjs"
import { ApiService } from "../../services/api.service.service"
import type { User } from "../../models/api.models"

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  password?: string
  role: "teacher" | "admin"
  isActive: boolean
}

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService)
  private destroy$ = new Subject<void>()
  
  // Add Math for template usage
  Math = Math
  users = signal<User[]>([])
  pagination = signal<any>(null)
  showUserModal = signal(false)
  showDeleteModal = signal(false)
  showStatusModal = signal(false)
  editingUser = signal<User | null>(null)
  userToDelete = signal<User | null>(null)
  userToToggle = signal<User | null>(null)
  searchTerm = ""
  currentPage = 1
  pageSize = 10
  searchTimeout: any
  
  userFormData: UserFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "teacher",
    isActive: true,
  }
  
  showPassword = signal(false)
  statusAction = signal<"activate" | "deactivate">("activate")
  
  // Form validation signals
  formErrors = signal<{[key: string]: string}>({})
  isFormValid = signal(true)

  ngOnInit() {
    this.loadUsers()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  }

  loadUsers() {
    this.apiService
      .getUsers(this.currentPage, this.pageSize, this.searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users.set(response.data)
          this.pagination.set(response.pagination)
        },
        error: (error) => {
          console.error("Error loading users:", error)
        },
      })
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1
      this.loadUsers()
    }, 500)
  }

  // Modal Management
  openCreateUserModal() {
    this.editingUser.set(null)
    this.resetForm()
    this.showUserModal.set(true)
  }

  editUser(user: User) {
    this.editingUser.set(user)
    this.userFormData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", // Empty password for editing - optional
      role: user.role,
      isActive: user.isActive,
    }
    this.clearFormErrors()
    this.showUserModal.set(true)
  }

  closeUserModal() {
    this.showUserModal.set(false)
    this.editingUser.set(null)
    this.showPassword.set(false)
    this.clearFormErrors()
  }

  resetForm() {
    this.userFormData = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "teacher",
      isActive: true,
    }
    this.clearFormErrors()
  }

  clearFormErrors() {
    this.formErrors.set({})
    this.isFormValid.set(true)
  }

  // Form Validation
  validateForm(): boolean {
    const errors: {[key: string]: string} = {}
    
    // First Name validation
    if (!this.userFormData.firstName.trim()) {
      errors['firstName'] = 'שם פרטי הוא שדה חובה'
    } else if (this.userFormData.firstName.trim().length < 2) {
      errors['firstName'] = ' שם פרטי חייב להכיל לפחות2תווים '
    }
    
    // Last Name validation
    if (!this.userFormData.lastName.trim()) {
      errors['lastName'] = 'שם משפחה הוא שדה חובה'
    } else if (this.userFormData.lastName.trim().length < 2) {
      errors['lastName'] = ' שם משפחה חייב להכיל לפחות2תווים '
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!this.userFormData.email.trim()) {
      errors['email'] = 'אימייל הוא שדה חובה'
    } else if (!emailRegex.test(this.userFormData.email)) {
      errors['email'] = 'פורמט האימייל אינו תקין'
    }
    
    // Password validation
    if (this.isCreating()) {
      if (!this.userFormData.password || this.userFormData.password.trim() === '') {
        errors['password'] = 'סיסמה היא שדה חובה למשתמש חדש'
      } else if (this.userFormData.password.length < 6) {
        errors['password'] = ' סיסמה חייבת להכיל לפחות6תווים '
      }
    } else {
      // For editing, password is optional but if provided must be valid
      if (this.userFormData.password && 
          this.userFormData.password.trim() !== '' && 
          this.userFormData.password.length < 6) {
        errors['password'] = ' סיסמה חייבת להכיל לפחות6תווים '
      }
    }
    
    // Check for duplicate email (excluding current user when editing)
    const existingUser = this.users().find(user => 
      user.email.toLowerCase() === this.userFormData.email.toLowerCase() &&
      (!this.editingUser() || user.id !== this.editingUser()!.id)
    )
    if (existingUser) {
      errors['email'] = 'אימייל זה כבר קיים במערכת'
    }
    
    this.formErrors.set(errors)
    const isValid = Object.keys(errors).length === 0
    this.isFormValid.set(isValid)
    return isValid
  }

  // Enhanced Delete Function
  deleteUser(userId: number) {
    const user = this.users().find((u) => u.id === userId)
    if (!user) return
    this.userToDelete.set(user)
    this.showDeleteModal.set(true)
  }

  confirmDelete() {
    const user = this.userToDelete()
    if (!user) return
    
    this.apiService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadUsers()
          this.closeDeleteModal()
          console.log("User deleted successfully")
        },
        error: (error) => {
          console.error("Error deleting user:", error)
          this.closeDeleteModal()
        },
      })
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false)
    this.userToDelete.set(null)
  }

  // Enhanced Status Toggle
  toggleUserStatus(user: User) {
    this.userToToggle.set(user)
    this.statusAction.set(user.isActive ? "deactivate" : "activate")
    this.showStatusModal.set(true)
  }

  confirmStatusChange() {
    const user = this.userToToggle()
    if (!user) return
    
    const newStatus = !user.isActive
    this.apiService
      .updateUser(user.id, { isActive: newStatus })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadUsers()
          this.closeStatusModal()
          console.log("User status updated successfully")
        },
        error: (error) => {
          console.error("Error updating user status:", error)
          this.closeStatusModal()
        },
      })
  }

  closeStatusModal() {
    this.showStatusModal.set(false)
    this.userToToggle.set(null)
  }

  // Save User - Enhanced with better validation
  saveUser() {
    // Validate form before submission
    if (!this.validateForm()) {
      return
    }
    
    const editing = this.editingUser()
    if (editing) {
      // Update existing user - שינוי כאן: password -> passwordHash
      const updateData: Partial<User> & { passwordHash?: string } = {
        firstName: this.userFormData.firstName.trim(),
        lastName: this.userFormData.lastName.trim(),
        email: this.userFormData.email.trim(),
        role: this.userFormData.role,
        isActive: this.userFormData.isActive,
      }
      
      // Only include passwordHash if it's provided and not empty
      if (this.userFormData.password && this.userFormData.password.trim() !== "") {
        updateData.passwordHash = this.userFormData.password.trim()  // שינוי כאן!
      }
      
      this.apiService
        .updateUser(editing.id, updateData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadUsers()
            this.closeUserModal()
            console.log("User updated successfully")
          },
          error: (error) => {
            console.error("Error updating user:", error)
            // Handle specific API errors
            if (error.error?.message?.includes('email')) {
              this.formErrors.set({ ...this.formErrors(), email: ' אימייל זה כבר קיים במערכת' })
            }
          },
        })
    } else {
      // Create new user - שינוי כאן: password -> passwordHash
      const createData: Partial<User> & { passwordHash: string } = {
        firstName: this.userFormData.firstName.trim(),
        lastName: this.userFormData.lastName.trim(),
        email: this.userFormData.email.trim(),
        passwordHash: this.userFormData.password!.trim(),  // שינוי כאן!
        role: this.userFormData.role,
        isActive: this.userFormData.isActive,
      }
      
      this.apiService
        .createUser(createData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadUsers()
            this.closeUserModal()
            console.log("User created successfully")
          },
          error: (error) => {
            console.error("Error creating user:", error)
            // Handle specific API errors
            if (error.error?.message?.includes('email')) {
              this.formErrors.set({ ...this.formErrors(), email: ' אימייל זה כבר קיים במערכת' })
            }
          },
        })
    }
  }

  // Pagination
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.loadUsers()
    }
  }

  nextPage() {
    const pagination = this.pagination()
    if (pagination && this.currentPage < pagination.totalPages) {
      this.currentPage++
      this.loadUsers()
    }
  }

  // Utility functions
  trackByUserId(index: number, user: User): number {
    return user.id
  }

  getUserInitials(user: User): string {
    return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
  }

  getRoleText(role: string): string {
    switch (role) {
      case "admin":
        return "מנהל"
      case "teacher":
        return "מורה"
      default:
        return role
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  togglePasswordVisibility() {
    this.showPassword.update((current) => !current)
  }

  isCreating(): boolean {
    return this.editingUser() === null
  }

  getStatusActionText(): string {
    return this.statusAction() === "activate" ? "הפעלת" : "השבתת"
  }

  getStatusActionColor(): string {
    return this.statusAction() === "activate" ? "green" : "red"
  }

  // Helper method to check if field has error
  hasFieldError(fieldName: string): boolean {
    return !!this.formErrors()[fieldName]
  }

  // Helper method to get field error message
  getFieldError(fieldName: string): string {
    return this.formErrors()[fieldName] || ''
  }
}