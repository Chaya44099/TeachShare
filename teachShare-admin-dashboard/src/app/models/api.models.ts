export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "admin" | "teacher" 
  isActive: boolean
  createdAt: string
  lastLogin?: string
  school?: string
  fileCount?: number
}

export interface FileItem {
  id: number
  fileName: string
  s3Key :string
  fileSize: number
  mimeType: string
  uploadedBy: number
  uploaderName: string
  categoryId: number
  categoryName: string
  status: "pending" | "approved" | "rejected"
  downloadCount: number
  uploadedAt: string
  approvedAt?: string
  approvedBy?: number
  description?: string
}

export interface Category {
  id: number
  name: string
  description?: string
  isActive: boolean
  fileCount: number
  createdAt: string
}

export interface Stats {
  totalUsers: number
  activeUsers: number
  totalFiles: number
  approvedFiles: number
  pendingFiles: number
  rejectedFiles: number
  totalDownloads: number
  todayDownloads: number
  storageUsed: number
  storageLimit: number
}

export interface RecentFile {
  id: number
  fileName: string
  uploaderName: string
  categoryName: string
  status: string
  uploadedAt: string
  fileSize: number
}

export interface PopularFile {
  fileName: string
  downloadCount: number
}

export interface CategoryStat {
  categoryName: string
  percentage: number
  fileCount: number
}

export interface DashboardData {
  stats: Stats
  recentFiles: RecentFile[]
  recentUsers: User[]
  popularFiles: PopularFile[]
  categoryStats: CategoryStat[]
}

export interface ApiResponse<T> {
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PresignedUrlResponse {
  url: string
}

export interface FileUploadData {
  fileName: string
  fileSize: number
  mimeType: string
  uploadedBy: number
  categoryId: number
  description?: string
}

