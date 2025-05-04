import React from "react"
import { File, X } from "lucide-react"
import { Button } from "../../../components/ui/button"

interface SelectedFilePreviewProps {
  file: File
  onRemove: () => void
  isUploading: boolean
}

export const SelectedFilePreview: React.FC<SelectedFilePreviewProps> = ({ file, onRemove, isUploading }) => {
  // פונקציה להמרת גודל קובץ לפורמט קריא
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
      <div className="bg-emerald-100 p-2 rounded-md">
        <File className="h-6 w-6 text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        disabled={isUploading}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}