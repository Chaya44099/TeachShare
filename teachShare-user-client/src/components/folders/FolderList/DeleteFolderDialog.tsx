"use client"

import React from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import type { Collection } from "../../../Models/Collection"
import { useFolderDeletion } from "../../../hooks/useFolderDeletion"
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
  const { isDeleting, error, handleDeleteFolder } = useFolderDeletion()

  // מחיקת תיקייה
  const confirmDeleteFolder = async () => {
    if (folder) {
      const success = await handleDeleteFolder(folder)
      if (success) {
        setIsOpen(false)
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

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <AlertDialogFooter className="flex-row-reverse">
          <AlertDialogAction
            onClick={confirmDeleteFolder}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                מוחק...
              </>
            ) : (
              "מחיקה"
            )}
          </AlertDialogAction>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
