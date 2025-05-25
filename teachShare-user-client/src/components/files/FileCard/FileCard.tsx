"use client"

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {
  deleteFile,
  downloadFile as downloadFileAction,
  softDeleteFile,
  restoreFile,
} from "../../../slices/MaterialSlice"
import type { Material } from "../../../Models/Collection"
import type { AppDispatch } from "../../../store"
import { FileIcon } from "./FileIcon"
import { FileDetails } from "./FileDetails"
import { FileActions } from "./FileActions"
import ShareFileModal from "../ShareFileModal"
import RenameFileModal from "../RenameFileModal"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import DeleteConfirmationDialog from "../DeleteConfirmationDialog"
import { useConfirmation } from "../../../hooks/useConfirmation"

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const { isOpen, options, confirm, handleClose } = useConfirmation()

  // הורדת קובץ
  const handleDownloadFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await dispatch(downloadFileAction(file.s3Key)).unwrap()
      if (!response) throw new Error("לא התקבל URL להורדה")

      const fileResponse = await fetch(response)
      const blob = await fileResponse.blob()

      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = file.name

      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
    } catch (error) {
      console.error("שגיאה בקבלת כתובת הורדה:", error)
      alert(`שגיאה בהורדת הקובץ: ${file.name}`)
    }
  }

  // מחיקה רכה או קשה עם דיאלוג אישור
  const handleDeleteFile = async (e: React.MouseEvent) => {
    e.stopPropagation()

    await confirm({
      title: "אישור מחיקה",
      description: `האם את/ה בטוח/ה שברצונך למחוק את הקובץ "${file.name}"?`,
      itemName: file.name,
      onConfirm: async () => {
        try {
          setIsDeleting(true)
          if (file.isDeleted) {
            await dispatch(deleteFile(file.id))
          } else {
            await dispatch(softDeleteFile(file.id))
          }
        } catch (error) {
          console.error("שגיאה במחיקת קובץ:", error)
        } finally {
          setIsDeleting(false)
        }
      },
    })
  }

  // שחזור קובץ
  const handleRestoreFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      setIsDeleting(true)
      await dispatch(restoreFile(file.id))
    } catch (error) {
      console.error("שגיאה בשחזור קובץ:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // פתיחת מודל שיתוף
  const handleShareFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsShareModalOpen(true)
  }

  // פתיחת מודל שינוי שם
  const handleRenameFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRenameModalOpen(true)
  }

  return (
    <>
      <Card
        className={`overflow-hidden hover:shadow-md transition-shadow duration-300 border-gray-200 ${
          file.isDeleted ? "opacity-70 border-red-200 bg-red-50" : ""
        }`}
      >
        <div
          className="p-4 flex flex-col items-center text-center cursor-pointer relative"
          onClick={() => onViewFile(file)}
        >
          {file.isPublic && !file.isDeleted && (
            <Badge className="absolute top-2 right-2 text-xs bg-indigo-500">משותף</Badge>
          )}
          {file.isDeleted && <Badge className="absolute top-2 right-2 text-xs bg-red-500">נמחק</Badge>}
          <FileIcon file={file} />
          <h3 className="mt-3 font-medium text-sm line-clamp-2 h-10">{file.name}</h3>
        </div>

        <CardContent className="p-3 pt-0 border-t border-gray-100">
          <FileDetails file={file} />
        </CardContent>

        <CardFooter className="p-2 pt-0 flex justify-between">
          <FileActions
            file={file}
            onViewFile={onViewFile}
            onDownloadFile={handleDownloadFile}
            onDeleteFile={handleDeleteFile}
            onRestoreFile={file.isDeleted ? handleRestoreFile : undefined}
            onShareFile={handleShareFile}
            onRenameFile={handleRenameFile}
            isDeleting={isDeleting}
          />
        </CardFooter>
      </Card>

      <ShareFileModal file={file} open={isShareModalOpen} onOpenChange={setIsShareModalOpen} />

      <RenameFileModal file={file} open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen} />

      {options && (
        <DeleteConfirmationDialog
          isOpen={isOpen}
          onClose={handleClose}
          onConfirm={options.onConfirm}
          title={options.title}
          description={options.description}
          fileName={options.itemName}
        />
      )}
    </>
  )
}

export default FileCard
