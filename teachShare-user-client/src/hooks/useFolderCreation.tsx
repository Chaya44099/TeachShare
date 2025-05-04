// src/hooks/useFolderCreation.ts
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createFolder } from "../slices/CollectionSlice"
import type { CreateCollectionDto } from "../Models/Collection"
import type { AppDispatch } from "../store"

export const useFolderCreation = (currentFolder: any, onOpenChange: (open: boolean) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderDescription, setNewFolderDescription] = useState("")
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [isCreating, setIsCreating] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      setIsCreating(true)

      const userString = sessionStorage.getItem("user")
      let userId = null

      if (userString) {
        const user = JSON.parse(userString)
        userId = user.id
      }

      const newFolder: CreateCollectionDto = {
        name: newFolderName,
        description: newFolderDescription || undefined,
        iconType: selectedIcon,
        parentCollectionId: currentFolder?.id || null,
        userId: userId,
        isPublic: false,
      }

      try {
        await dispatch(createFolder(newFolder))
        showSnackbar(`התיקייה "${newFolderName}" נוצרה בהצלחה`, "success")
        resetForm()
        onOpenChange(false)
      } catch (error) {
        showSnackbar("אירעה שגיאה בעת יצירת התיקייה, אנא נסה שוב", "error")
      } finally {
        setIsCreating(false)
      }
    }
  }

  const resetForm = () => {
    setNewFolderName("")
    setNewFolderDescription("")
    setSelectedIcon(0)
  }

  return {
    newFolderName,
    setNewFolderName,
    newFolderDescription,
    setNewFolderDescription,
    selectedIcon,
    setSelectedIcon,
    isCreating,
    handleCreateFolder,
    resetForm,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity
  }
}