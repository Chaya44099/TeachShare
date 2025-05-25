"use client"

import React from "react"
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  fileName?: string
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "אישור מחיקה",
  description = "האם את/ה בטוח/ה שברצונך למחוק קובץ זה?",
  fileName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rtl">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-red-100 p-2 rounded-full">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-right">
            {description}
          </AlertDialogDescription>
          {/* הוצאת שם הקובץ מחוץ ל-AlertDialogDescription */}
          {fileName && (
            <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-right">
              {fileName}
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse gap-2">
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
            אישור
          </AlertDialogAction>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmationDialog