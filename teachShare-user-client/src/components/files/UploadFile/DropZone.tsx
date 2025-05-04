import React from "react"
import { Upload } from "lucide-react"
import { cn } from "../../../lib/utils"

interface DropZoneProps {
  isDragging: boolean
  isUploading: boolean
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onClick: () => void
  fileInputRef: React.RefObject<HTMLInputElement|null>
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DropZone: React.FC<DropZoneProps> = ({
  isDragging,
  isUploading,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  fileInputRef,
  handleFileSelect,
}) => {
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer",
        isDragging
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50",
        isUploading && "opacity-50 pointer-events-none",
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <Upload className={cn("h-12 w-12", isDragging ? "text-emerald-500" : "text-gray-400")} />

      <div className="space-y-1">
        <p className="font-medium text-lg">גררי קובץ לכאן או לחצי לבחירה</p>
        <p className="text-sm text-gray-500">גודל מקסימלי: 50MB</p>
      </div>
    </div>
  )
}