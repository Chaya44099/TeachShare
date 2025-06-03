import { Component, signal, inject, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { LucideAngularModule } from "lucide-angular"
import { Subject, takeUntil, forkJoin } from "rxjs"
import { ApiService } from "../../services/api.service.service"
import { AuthService } from "../../services/auth.service"
import type { FileItem, Category } from "../../models/api.models"

@Component({
  selector: "app-files",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"],
})
export class FilesComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService)
  authService = inject(AuthService)
  private destroy$ = new Subject<void>()

  files = signal<FileItem[]>([])
  categories = signal<Category[]>([])
  filteredFiles = signal<FileItem[]>([])

  // Filters
  searchTerm = ""
  selectedStatus = ""
  selectedCategory = ""

  // Modals
  showUploadModal = signal(false)
  showViewModal = signal(false)
  showDeleteModal = signal(false)
  showRejectModal = signal(false)

  // Selected items
  selectedFile = signal<FileItem | null>(null)
  fileToDelete = signal<FileItem | null>(null)
  fileToReject = signal<FileItem | null>(null)

  // Upload
  selectedFileForUpload: File | null = null
  uploadProgress = signal(0)
  isUploading = signal(false)

  // Form data
  uploadFormData = {
    categoryId: 0,
    description: "",
  }

  rejectReason = ""

  ngOnInit() {
    this.loadData()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  loadData() {
    forkJoin({
      files: this.apiService.getAllFiles(),
      categories: this.apiService.getCategories(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.files.set(data.files)
          this.categories.set(data.categories.filter((cat) => cat.isActive))
          this.applyFilters()
        },
        error: (error) => {
          console.error("Error loading data:", error)
        },
      })
  }

  applyFilters() {
    let filtered = this.files()

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(
        (file) =>
          file.fileName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          file.uploaderName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          file.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter((file) => file.status === this.selectedStatus)
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((file) => file.categoryId?.toString() === this.selectedCategory)
    }

    this.filteredFiles.set(filtered)
  }

  onSearchChange() {
    this.applyFilters()
  }

  onStatusChange() {
    this.applyFilters()
  }

  onCategoryChange() {
    this.applyFilters()
  }

  // File Upload
  openUploadModal() {
    this.uploadFormData = {
      categoryId: 0,
      description: "",
    }
    this.selectedFileForUpload = null
    this.showUploadModal.set(true)
  }

  closeUploadModal() {
    this.showUploadModal.set(false)
    this.selectedFileForUpload = null
    this.uploadProgress.set(0)
    this.isUploading.set(false)
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.selectedFileForUpload = file
    }
  }

  async uploadFile() {
    if (!this.selectedFileForUpload || !this.uploadFormData.categoryId) {
      this.apiService.error.set("נא לבחור קובץ וקטגוריה")
      return
    }

    const currentUser = this.authService.currentUser()
    if (!currentUser) {
      this.apiService.error.set("משתמש לא מחובר")
      return
    }

    this.isUploading.set(true)

    try {
      // Generate unique filename
      const timestamp = Date.now()
      const fileName = `${timestamp}_${this.selectedFileForUpload.name}`

      // Get presigned URL for upload
      const uploadUrlResponse = await this.apiService
        .getUploadUrl(fileName, this.selectedFileForUpload.type)
        .toPromise()

      if (!uploadUrlResponse) {
        throw new Error("Failed to get upload URL")
      }

      // Upload file to S3
      await this.apiService.uploadFileToS3(uploadUrlResponse.url, this.selectedFileForUpload).toPromise()

      // Save file info to database
      const fileData = {
        fileName: fileName,
        fileSize: this.selectedFileForUpload.size,
        mimeType: this.selectedFileForUpload.type,
        uploadedBy: currentUser.id,
        categoryId: this.uploadFormData.categoryId,
        description: this.uploadFormData.description,
      }

      await this.apiService.saveFileInfo(fileData).toPromise()

      // Reload files
      this.loadData()
      this.closeUploadModal()
    } catch (error) {
      console.error("Upload error:", error)
      this.apiService.error.set("שגיאה בהעלאת הקובץ")
    } finally {
      this.isUploading.set(false)
    }
  }

  // File Actions
  async viewFile(file: FileItem) {
    try {
        console.log(file);
      
      const viewUrlResponse = await this.apiService.getViewUrl(file.s3Key).toPromise()
      if (viewUrlResponse) {
        window.open(viewUrlResponse.url, "_blank")
      }
    } catch (error) {
      console.error("Error getting view URL:", error)
      this.apiService.error.set("שגיאה בפתיחת הקובץ")
    }
  }

  async downloadFile(file: FileItem) {
    try {
      const downloadUrlResponse = await this.apiService.getDownloadUrl(file.s3Key).toPromise()
      if (downloadUrlResponse) {
        const link = document.createElement("a")
        link.href = downloadUrlResponse.url
        link.download = file.s3Key
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Error getting download URL:", error)
      this.apiService.error.set("שגיאה בהורדת הקובץ")
    }
  }

  approveFile(file: FileItem) {
    this.apiService
      .updateFileStatus(file.id, 'approve') // כאן שולחים את ה-action כ'approve'
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // this.loadData();
        },
        error: (error) => {
          console.error("Error approving file:", error);
        },
      });
  }
  openRejectModal(file: FileItem) {
    this.fileToReject.set(file)
    this.rejectReason = ""
    this.showRejectModal.set(true)
  }

  closeRejectModal() {
    this.showRejectModal.set(false)
    this.fileToReject.set(null)
    this.rejectReason = ""
  }

  confirmReject() {
    const file = this.fileToReject()
    if (!file) return

    this.apiService
       .updateFileStatus(file.id, 'reject', this.rejectReason) // כאן שולחים גם את סיבת הדחייה
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // this.loadData();
        },
        error: (error) => {
          console.error("Error rejecting file:", error);
        },
      });
  }

  openDeleteModal(file: FileItem) {
    this.fileToDelete.set(file)
    this.showDeleteModal.set(true)
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false)
    this.fileToDelete.set(null)
  }

  confirmDelete() {
    const file = this.fileToDelete()
    if (!file) return

    this.apiService
      .deleteFile(file.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadData()
          this.closeDeleteModal()
        },
        error: (error) => {
          console.error("Error deleting file:", error)
          this.closeDeleteModal()
        },
      })
  }

  // Utility functions
  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  getStatusText(status: string): string {
    switch (status) {
      case "pending":
        return "ממתין לאישור"
      case "approved":
        return "מאושר"
      case "rejected":
        return "נדחה"
      default:
        return status
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith("image/")) return "image"
    if (mimeType.startsWith("video/")) return "video"
    if (mimeType.startsWith("audio/")) return "music"
    if (mimeType.includes("pdf")) return "file-text"
    if (mimeType.includes("word")) return "file-text"
    if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "file-spreadsheet"
    if (mimeType.includes("powerpoint") || mimeType.includes("presentation")) return "presentation"
    return "file"
  }

  trackByFileId(index: number, file: FileItem): number {
    return file.id
  }
}
