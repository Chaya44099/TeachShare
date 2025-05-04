import React from "react"
import { AlertCircle } from "lucide-react"

interface UploadErrorProps {
  message: string
}

export const UploadError: React.FC<UploadErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2 text-sm">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}