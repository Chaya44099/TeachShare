import { Component, signal, inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { LucideAngularModule } from "lucide-angular"
import { AuthService, type RegisterRequest } from "../../services/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  registerData = signal<RegisterRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "teacher",
    isActive: true,
  })

  confirmPassword = signal("")
  showPassword = signal(false)
  showConfirmPassword = signal(false)
  passwordsMatch = signal(true)

  ngOnInit() {
    // Clear any existing errors
    this.authService.clearError()
  }

  onSubmit() {
    const data = this.registerData()
    const confirmPwd = this.confirmPassword()

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      this.authService.error.set("נא למלא את כל השדות החובה")
      return
    }

    if (data.password !== confirmPwd) {
      this.passwordsMatch.set(false)
      this.authService.error.set("הסיסמאות אינן תואמות")
      return
    }

    if (data.password.length < 6) {
      this.authService.error.set("הסיסמה חייבת להכיל לפחות 6 תווים")
      return
    }

    this.passwordsMatch.set(true)
    this.authService.register(data).subscribe({
      next: () => {
        // Navigation handled in AuthService
      },
      error: (error) => {
        console.error("Registration failed:", error)
      },
    })
  }

  updateRegisterData(field: keyof RegisterRequest, value: string | boolean) {
    this.registerData.update((current) => ({
      ...current,
      [field]: value,
    }))
  }

  updateConfirmPassword(value: string) {
    this.confirmPassword.set(value)
    const data = this.registerData()
    this.passwordsMatch.set(data.password === value)
  }

  togglePasswordVisibility() {
    this.showPassword.update((current) => !current)
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update((current) => !current)
  }

  goToLogin() {
    this.router.navigate(["/login"])
  }
}
