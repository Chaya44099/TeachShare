"use client"

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteFile, downloadFile as downloadFileAction } from "../../../slices/MaterialSlice"
import type { Material } from "../../../Models/Collection"
import type { AppDispatch } from "../../../store"
import { FileIcon } from "./FileIcon"
import { FileDetails } from "./FileDetails"
import { FileActions } from "./FileActions"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"

interface FileCardProps {
  file: Material
  onViewFile: (file: Material) => void
}

/**
 * FileCard - כרטיס קובץ מודרני עם אפשרויות פעולה
 */
const FileCard: React.FC<FileCardProps> = ({ file, onViewFile }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isDeleting, setIsDeleting] = useState(false)

  // פונקציה להורדת קובץ
  const handleDownloadFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      // קבלת ה-URL להורדה
      const response = await dispatch(downloadFileAction(file.s3Key)).unwrap()

      if (!response) {
        throw new Error("לא התקבל URL להורדה")
      }

      // ביצוע fetch לקובץ עצמו
      const fileResponse = await fetch(response)
      const blob = await fileResponse.blob()

      // יצירת URL לבלוב והורדתו
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = file.name

      // הוספה לעמוד, הפעלה, והסרה
      document.body.appendChild(link)
      link.click()

      // ניקוי
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
    } catch (error) {
      console.error("שגיאה בקבלת כתובת הורדה:", error)
      alert(`שגיאה בהורדת הקובץ: ${file.name}`)
    }
  }

  // פונקציה למחיקת קובץ
  const handleDeleteFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm("האם את בטוחה שברצונך למחוק קובץ זה?")) {
      try {
        setIsDeleting(true)
        await dispatch(deleteFile(file.id))
      } catch (error) {
        console.error("שגיאה במחיקת קובץ:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-gray-200">
      {/* כותרת הקובץ */}
      <div className="p-4 flex flex-col items-center text-center cursor-pointer" onClick={() => onViewFile(file)}>
        <FileIcon file={file} />
        <h3 className="mt-3 font-medium text-sm line-clamp-2 h-10">{file.name}</h3>
      </div>

      {/* פרטי הקובץ */}
      <CardContent className="p-3 pt-0 border-t border-gray-100">
        <FileDetails file={file} />
      </CardContent>

      {/* כפתורי פעולה */}
      <CardFooter className="p-2 pt-0 flex justify-between">
        <FileActions 
          file={file} 
          onViewFile={onViewFile} 
          onDownloadFile={handleDownloadFile} 
          onDeleteFile={handleDeleteFile}
          isDeleting={isDeleting}
        />
      </CardFooter>
    </Card>
  )
}

export default FileCard