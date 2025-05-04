import React from "react"
import { AlertCircle } from "lucide-react"
import type { Collection } from "../../../Models/Collection"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog"

interface DeleteFolderDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  folder: Collection | null
}

export const DeleteFolderDialog: React.FC<DeleteFolderDialogProps> = ({ isOpen, setIsOpen, folder }) => {
  // מחיקת תיקייה
  const confirmDeleteFolder = async () => {
    if (folder) {
      try {
        // כאן צריך להפעיל את פעולת המחיקה בפועל
        // await dispatch(deleteFolder(folder.id))
        setIsOpen(false)
      } catch (error) {
        console.error("שגיאה במחיקת תיקייה:", error)
      }
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            אישור מחיקת תיקייה
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            האם את בטוחה שברצונך למחוק את התיקייה "{folder?.name}"?
            <br />
            פעולה זו תמחק גם את כל התיקיות והקבצים שבתוכה.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse">
          <AlertDialogAction onClick={confirmDeleteFolder} className="bg-red-600 hover:bg-red-700">
            מחיקה
          </AlertDialogAction>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}