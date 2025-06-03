import { Component, signal, inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { LucideAngularModule } from "lucide-angular"
import { AuthService, type LoginRequest } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  credentials = signal<LoginRequest>({
    email: "",
    password: "",
  })

  showPassword = signal(false)
  successMessage = signal<string | null>(null)

  ngOnInit() {
    // Check for success message from registration
    this.route.queryParams.subscribe((params) => {
      if (params["message"]) {
        this.successMessage.set(params["message"])
      }
    })

    // Clear any existing errors
    this.authService.clearError()
  }

  onSubmit() {
    const creds = this.credentials()
    if (!creds.email || !creds.password) {
      this.authService.error.set("נא למלא את כל השדות")
      return
    }

    this.authService.login(creds).subscribe({
      next: () => {
        // Navigation handled in AuthService
      },
      error: (error) => {
        console.error("Login failed:", error)
      },
    })
  }

  updateCredentials(field: keyof LoginRequest, value: string) {
    this.credentials.update((current) => ({
      ...current,
      [field]: value,
    }))
  }

  togglePasswordVisibility() {
    this.showPassword.update((current) => !current)
  }

  goToRegister() {
    this.router.navigate(["/register"])
  }
}
