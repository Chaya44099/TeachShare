import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadFile, selectUploadProgress, clearUploadProgress } from "../../../slices/MaterialSlice"
import type { AppDispatch } from "../../../store"
import type { Collection } from "../../../Models/Collection"
import { DropZone } from "./DropZone"
import { SelectedFilePreview } from "./SelectedFilePreview"
import { UploadError } from "./UploadError"
import { UploadProgress } from "./UploadProgress"
import { UploadSuccess } from "./UploadSuccess"
import { UploadModalHeader } from "./UploadModalHeader"
import { UploadModalFooter } from "./UploadModalFooter"
import {
  Dialog,DialogContent,DialogHeader,
} from "../../../components/ui/dialog"

interface UploadFileModalProps {
  currentFolder: Collection
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * UploadFileModal - מודל מודרני להעלאת קבצים
 */
const UploadFileModal: React.FC<UploadFileModalProps> = ({ currentFolder, open, onOpenChange }) => {
  const dispatch = useDispatch<AppDispatch>()
  const uploadProgress = useSelector(selectUploadProgress)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    const maxSizeInBytes = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSizeInBytes) {
      setUploadError("הקובץ גדול מדי. גודל מקסימלי: 50MB")
      return
    }
    setSelectedFile(file)
    setUploadError(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleUploadFile = async () => {
    if (!selectedFile || !currentFolder) {
      setUploadError("אנא בחרי קובץ ותיקייה")
      return
    }

    try {
      dispatch(clearUploadProgress())
      setUploadError(null)
      setIsUploading(true)
      setUploadComplete(false)

      const userString = sessionStorage.getItem("user")
      let userId = 0

      if (userString) {
        const user = JSON.parse(userString)
        userId = user.id
      }

      await dispatch(
        uploadFile({
          file: selectedFile,
          folderId: currentFolder.id,
          userId: userId,
        }),
      )

      setUploadComplete(true)
      setTimeout(() => {
        handleClose()
      }, 1500) // סגירה אוטומטית אחרי 1.5 שניות
    } catch (error) {
      console.error("שגיאה בהעלאת קובץ:", error)
      setUploadError("שגיאה בהעלאת הקובץ. אנא נסי שנית.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setUploadError(null)
    setIsUploading(false)
    setUploadComplete(false)
    dispatch(clearUploadProgress())
    onOpenChange(false)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] rtl" dir="rtl">
        <DialogHeader>
          <UploadModalHeader currentFolder={currentFolder} />
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <DropZone
            isDragging={isDragging}
            isUploading={isUploading}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
          />

          {selectedFile && (
            <SelectedFilePreview
              file={selectedFile}
              onRemove={() => setSelectedFile(null)}
              isUploading={isUploading}
            />
          )}

          {uploadError && <UploadError message={uploadError} />}

          {isUploading && <UploadProgress progress={uploadProgress} />}

          {uploadComplete && <UploadSuccess />}
        </div>

        <UploadModalFooter
          onClose={handleClose}
          onUpload={handleUploadFile}
          isUploading={isUploading}
          uploadComplete={uploadComplete}
          hasFile={!!selectedFile}
        />
      </DialogContent>
    </Dialog>
  )
}

export default UploadFileModal