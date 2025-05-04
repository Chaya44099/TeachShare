import React from "react"
import { FolderOpen, FolderPlus } from "lucide-react"
import type { Collection } from "../../../Models/Collection"

interface EmptyFolderStateProps {
  searchQuery: string
  currentFolder: Collection | null
}

export const EmptyFolderState: React.FC<EmptyFolderStateProps> = ({ searchQuery, currentFolder }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {searchQuery ? (
        <>
          <FolderOpen className="h-12 w-12 text-gray-300 mb-2" />
          <p className="text-gray-500">לא נמצאו תיקיות התואמות לחיפוש "{searchQuery}"</p>
        </>
      ) : (
        <>
          <FolderPlus className="h-12 w-12 text-gray-300 mb-2" />
          <p className="text-gray-500 mb-1">אין תיקיות {currentFolder ? "בתיקייה זו" : ""}</p>
          <p className="text-sm text-gray-400">לחצי על "תיקייה חדשה" כדי ליצור תיקייה</p>
        </>
      )}
    </div>
  )
}