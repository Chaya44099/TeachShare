// import { Injectable, signal } from "@angular/core"
// import { HttpClient, HttpParams } from "@angular/common/http"
// import { Observable, catchError, finalize, throwError } from "rxjs"
// import type { FileItem, ApiResponse, PresignedUrlResponse, ShareMaterialDTO } from "../models/api.models"

// @Injectable({
//   providedIn: "root",
// })
// export class FileService {
//   private baseUrl = "http://localhost:5103/api/material" // שנה לכתובת השרת שלך

//   loading = signal(false)
//   error = signal<string | null>(null)
//   uploadProgress = signal(0)

//   constructor(private http: HttpClient) {}

//   private handleRequest<T>(request: Observable<T>): Observable<T> {
//     this.loading.set(true)
//     this.error.set(null)

//     return request.pipe(
//       catchError((error) => {
//         console.error("API Error:", error)
//         this.error.set(error.message || "שגיאה בטעינת הנתונים")
//         return throwError(() => error)
//       }),
//       finalize(() => {
//         this.loading.set(false)
//       }),
//     )
//   }

//   // Get all files
//   getAllFiles(): Observable<FileItem[]> {
//     return this.handleRequest(this.http.get<FileItem[]>(`${this.baseUrl}`))
//   }

//   // Get file by ID
//   getFileById(id: number): Observable<FileItem> {
//     return this.handleRequest(this.http.get<FileItem>(`${this.baseUrl}/${id}`))
//   }

//   // Get files by category
//   getFilesByCategory(categoryId: number): Observable<FileItem[]> {
//     return this.handleRequest(this.http.get<FileItem[]>(`${this.baseUrl}/by-category/${categoryId}`))
//   }

//   // Get files by user
//   getFilesByUser(userId: number): Observable<FileItem[]> {
//     return this.handleRequest(this.http.get<FileItem[]>(`${this.baseUrl}/user/${userId}`))
//   }

//   // Get presigned URL for upload
//   getUploadUrl(fileName: string, contentType: string): Observable<PresignedUrlResponse> {
//     const params = new HttpParams()
//       .set('fileName', fileName)
//       .set('contentType', contentType)
    
//     return this.handleRequest(
//       this.http.get<PresignedUrlResponse>(`${this.baseUrl}/presigned-url`, { params })
//     )
//   }

//   // Get presigned URL for download
//   getDownloadUrl(fileName: string): Observable<PresignedUrlResponse> {
//     const params = new HttpParams().set('fileName', fileName)
    
//     return this.handleRequest(
//       this.http.get<PresignedUrlResponse>(`${this.baseUrl}/download-url`, { params })
//     )
//   }

//   // Get presigned URL for view
//   getViewUrl(fileName: string): Observable<PresignedUrlResponse> {
//     const params = new HttpParams().set('fileName', fileName)
    
//     return this.handleRequest(
//       this.http.get<PresignedUrlResponse>(`${this.baseUrl}/view-url`, { params })
//     )
//   }

//   // Upload file to S3 using presigned URL
//   uploadFileToS3(presignedUrl: string, file: File): Observable<any> {
//     this.uploadProgress.set(0)
    
//     return new Observable(observer => {
//       const xhr = new XMLHttpRequest()
      
//       xhr.upload.addEventListener('progress', (event) => {
//         if (event.lengthComputable) {
//           const progress = Math.round((event.loaded / event.total) * 100)
//           this.uploadProgress.set(progress)
//         }
//       })
      
//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//           this.uploadProgress.set(100)
//           observer.next({ success: true })
//           observer.complete()
//         } else {
//           observer.error(new Error(`Upload failed with status: ${xhr.status}`))
//         }
//       })
      
//       xhr.addEventListener('error', () => {
//         observer.error(new Error('Upload failed'))
//       })
      
//       xhr.open('PUT', presignedUrl)
//       xhr.setRequestHeader('Content-Type', file.type)
//       xhr.send(file)
//     })
//   }

//   // Save file metadata to database
//   saveFileInfo(fileData: Partial<FileItem>): Observable<FileItem> {
//     return this.handleRequest(
//       this.http.post<FileItem>(`${this.baseUrl}/save-file-info`, fileData)
//     )
//   }

//   // Share file
//   shareFile(fileId: number, shareData: ShareMaterialDTO): Observable<FileItem> {
//     return this.handleRequest(
//       this.http.put<FileItem>(`${this.baseUrl}/share/${fileId}`, shareData)
//     )
//   }

//   // Rename file
//   renameFile(fileId: number, newName: string): Observable<FileItem> {
//     return this.handleRequest(
//       this.http.put<FileItem>(`${this.baseUrl}/rename/${fileId}`, JSON.stringify(newName), {
//         headers: { 'Content-Type': 'application/json' }
//       })
//     )
//   }

//   // Soft delete file
//   deleteFile(fileId: number): Observable<FileItem> {
//     return this.handleRequest(
//       this.http.put<FileItem>(`${this.baseUrl}/delete/${fileId}`, {})
//     )
//   }

//   // Helper method to get file icon based on mime type
//   getFileIcon(mimeType: string): string {
//     if (mimeType.startsWith('image/')) return 'image'
//     if (mimeType.startsWith('video/')) return 'video'
//     if (mimeType.startsWith('audio/')) return 'music'
//     if (mimeType.includes('pdf')) return 'file-text'
//     if (mimeType.includes('word') || mimeType.includes('document')) return 'file-text'
//     if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'file-spreadsheet'
//     if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'presentation'
//     return 'file'
//   }

//   // Helper method to format file size
//   formatFileSize(bytes: number): string {
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Helper method to get content type from file
//   getContentType(file: File): string {
//     return file.type || 'application/octet-stream'
//   }

//   // Generate unique file name to avoid conflicts
//   generateUniqueFileName(originalName: string): string {
//     const timestamp = Date.now()
//     const randomString = Math.random().toString(36).substring(2, 8)
//     const extension = originalName.substring(originalName.lastIndexOf('.'))
//     const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'))
//     return `${nameWithoutExt}_${timestamp}_${randomString}${extension}`
//   }
// }
