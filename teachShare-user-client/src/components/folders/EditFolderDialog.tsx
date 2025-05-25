"use client"

import React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { FolderEdit, FolderSync } from "lucide-react"
import { motion } from "framer-motion"
import FolderForm from "./FolderForm"
import StatusSnackbar from "./StatusSnackbar"
import { useDispatch } from "react-redux"
import { updateFolder } from "../../slices/CollectionSlice"
import type { Collection } from "../../Models/Collection"
import type { AppDispatch } from "../../store"

interface EditFolderDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  folder: Collection | null
}

export const EditFolderDialog: React.FC<EditFolderDialogProps> = ({ isOpen, setIsOpen, folder }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [folderName, setFolderName] = useState("")
  const [folderDescription, setFolderDescription] = useState("")
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  // עדכון הערכים כאשר התיקייה משתנה
  useEffect(() => {
    if (folder) {
      setFolderName(folder.name || "")
      setFolderDescription(folder.description || "")
      setSelectedIcon(folder.iconType || 0)
    }
  }, [folder])

  // איפוס הטופס
  const resetForm = () => {
    setFolderName("")
    setFolderDescription("")
    setSelectedIcon(0)
  }

  // עדכון התיקייה
  const handleUpdateFolder = async () => {
    if (!folder || !folderName.trim()) return

    setIsUpdating(true)

    try {
      // יצירת אובייקט העדכון - שולחים רק את השדות הנדרשים
      const updateData = {
        id: folder.id,
        name: folderName.trim(),
        description: folderDescription.trim(),
        iconType: selectedIcon,
      }

      // שליחת הפעולה לעדכון התיקייה
      await dispatch(updateFolder(updateData))

      // הצגת הודעת הצלחה
      setSnackbarMessage("התיקייה עודכנה בהצלחה")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)

      // סגירת המודל
      setIsOpen(false)
      resetForm()
    } catch (error) {
      console.error("שגיאה בעדכון התיקייה:", error)
      setSnackbarMessage("אירעה שגיאה בעדכון התיקייה")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] rtl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-right flex items-center gap-2">
              <FolderEdit className="h-6 w-6 text-emerald-500" />
              עדכון תיקייה
            </DialogTitle>
            <DialogDescription className="text-right">עדכן את שם התיקייה והאיקון שלה</DialogDescription>
          </DialogHeader>

          <FolderForm
            newFolderName={folderName}
            setNewFolderName={setFolderName}
            newFolderDescription={folderDescription}
            setNewFolderDescription={setFolderDescription}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            currentFolder={null} // לא רלוונטי בעדכון תיקייה
          />

          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button
              type="submit"
              onClick={handleUpdateFolder}
              disabled={!folderName.trim() || isUpdating}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isUpdating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="mr-2"
                  >
                    <FolderSync className="h-4 w-4" />
                  </motion.div>
                  מעדכן תיקייה...
                </>
              ) : (
                <>עדכון תיקייה</>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              ביטול
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StatusSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  )
}

export default EditFolderDialog
