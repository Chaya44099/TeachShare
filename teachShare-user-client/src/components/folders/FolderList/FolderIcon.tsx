import React from "react"
import {
  Folder,
  FolderOpen,
  FolderArchive,
  FolderHeart,
  FolderKanban,
  FolderInput,
  FolderSync,
  FolderTree,
  FolderRoot,
  FolderGit2,
  FolderDot,
  FolderPlus,
} from "lucide-react"
import type { Collection } from "../../../Models/Collection"

// מיפוי אייקונים לפי סוג תיקייה
export const getFolderIcon = (folder: Collection) => {
  // אם יש לתיקייה שדה iconType, השתמש בו
  if (folder.iconType !== undefined) {
    const icons = [
      Folder,
      FolderOpen,
      FolderPlus,
      FolderHeart,
      FolderArchive,
      FolderKanban,
      FolderInput,
      FolderSync,
      FolderTree,
      FolderRoot,
      FolderGit2,
      FolderDot,
    ]
    const IconComponent = icons[folder.iconType] || Folder
    return <IconComponent className="h-5 w-5 text-emerald-500" />
  }

  // ברירת מחדל
  return <Folder className="h-5 w-5 text-emerald-500" />
}