"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteFolder } from "../slices/CollectionSlice"
import { deleteFilesByFolder } from "../slices/MaterialSlice"
import type { Collection } from "../Models/Collection"
import type { AppDispatch } from "../store"

/**
 * Hook לניהול מחיקת תיקיות
 */
export const useFolderDeletion = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * פונקציה למחיקת תיקייה ותכולתה
   */
  const handleDeleteFolder = async (folder: Collection) => {
    if (!folder) return false

    try {
      setIsDeleting(true)
      setError(null)

      // מחיקת התיקייה בשרת (כולל תתי-תיקיות)
      await dispatch(deleteFolder(folder.id)).unwrap()

      // עדכון הקבצים ברידאקס
      await dispatch(deleteFilesByFolder(folder.id)).unwrap()

      return true
    } catch (err) {
      console.error("שגיאה במחיקת תיקייה:", err)
      setError("אירעה שגיאה במחיקת התיקייה. אנא נסי שנית.")
      return false
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isDeleting,
    error,
    handleDeleteFolder,
  }
}
