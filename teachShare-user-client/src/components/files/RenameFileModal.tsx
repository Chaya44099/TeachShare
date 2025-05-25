"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { renameFile } from "../../slices/MaterialSlice"
import type { Material } from "../../Models/Collection"
import type { AppDispatch } from "../../store"
import { Edit2, Loader2, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

interface RenameFileModalProps {
  file: Material
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * RenameFileModal - מודל לשינוי שם קובץ
 */
const RenameFileModal: React.FC<RenameFileModalProps> = ({ file, open, onOpenChange }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [newName, setNewName] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // איפוס הסטייט כשהמודל נפתח
  useEffect(() => {
    if (open) {
      setNewName(file.name)
      setIsSuccess(false)
      setError(null)
    }
  }, [open, file])

  // פונקציה לקבלת סיומת הקובץ
  const getFileExtension = (filename: string): string => {
    const parts = filename.split(".")
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : ""
  }

  // פונקציה לקבלת שם הקובץ ללא סיומת
  const getFileNameWithoutExtension = (filename: string): string => {
    const extension = getFileExtension(filename)
    return extension ? filename.slice(0, filename.length - extension.length) : filename
  }

  const fileExtension = getFileExtension(file.name)
  const fileNameWithoutExt = getFileNameWithoutExtension(file.name)

  // פונקציה לשינוי שם הקובץ
  const handleRename = async () => {
    // לא ממשיכים אם השם לא השתנה או ריק
    if (newName === file.name || !newName.trim()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // וידוא שהסיומת נשמרת
      const finalName = fileExtension && !newName.endsWith(fileExtension) ? `${newName}${fileExtension}` : newName

      await dispatch(
        renameFile({
          id: file.id,
          newName: finalName,
        }),
      ).unwrap()

      setIsSuccess(true)
      setTimeout(() => onOpenChange(false), 1500)
    } catch (err) {
      console.error("שגיאה בשינוי שם הקובץ:", err)
      setError("אירעה שגיאה בשינוי שם הקובץ. אנא נסה שנית.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rtl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-right flex items-center gap-2">
            <Edit2 className="h-5 w-5 text-amber-500" />
            שינוי שם קובץ
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">שם קובץ נוכחי:</p>
            <p className="font-medium">{file.name}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-name" className="block font-medium">
              שם קובץ חדש <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <Input
                id="file-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
                placeholder="הזן שם קובץ חדש"
                disabled={isLoading}
                autoFocus
              />
            </div>
            {fileExtension && <p className="text-xs text-gray-500">סיומת הקובץ ({fileExtension}) תישמר אוטומטית</p>}
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>שם הקובץ שונה בהצלחה!</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
          <Button
            onClick={handleRename}
            disabled={isLoading || isSuccess || newName === file.name || !newName.trim()}
            className={`${
              newName !== file.name && newName.trim()
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-amber-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                מעדכן...
              </>
            ) : (
              "שמירה"
            )}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            ביטול
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RenameFileModal
