"use client"

import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getViewFileUrl } from "../../../slices/MaterialSlice"
import type { Material } from "../../../Models/Collection"
import type { AppDispatch } from "../../../store"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { FileIcon } from "../FileCard/FileIcon"
import { FilePreviewContent } from "./FilePreviewContent"
import { useFileDownload } from "../../../hooks/useFileDownload"

interface ViewFileModalProps {
  file: Material
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * ViewFileModal - מודל לצפייה בקבצים
 */
const ViewFileModal: React.FC<ViewFileModalProps> = ({ file, open, onOpenChange }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [fileViewUrl, setFileViewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { handleDownloadFile } = useFileDownload(file)

  // Fetch view URL when component mounts
  useEffect(() => {
    const fetchViewUrl = async () => {
      if (!open) return // אם המודל סגור, לא צריך לטעון

      setIsLoading(true)
      setError(null)

      try {
        const viewUrl = await dispatch(getViewFileUrl(file.s3Key)).unwrap()
        setFileViewUrl(viewUrl)
      } catch (error) {
        console.error("שגיאה בקבלת כתובת צפייה:", error)
        setError(`שגיאה בפתיחת הקובץ: ${file.name}`)
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      fetchViewUrl()
    }

    // ניקוי כשהקומפוננט מתפרק או כשהמודל נסגר
    return () => {
      setFileViewUrl(null)
    }
  }, [file.s3Key, dispatch, open, file.name])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl rtl flex flex-col" dir="rtl">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileIcon file={file} size="sm" />
              <span className="truncate max-w-[300px]">{file.name}</span>
            </DialogTitle>
            <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <DialogBody>
          <FilePreviewContent 
            file={file} 
            fileViewUrl={fileViewUrl} 
            isLoading={isLoading} 
            error={error}
            onDownload={handleDownloadFile}
          />
        </DialogBody>

        <DialogFooter className="pt-4 border-t">
          <FileDownloadButton onDownload={handleDownloadFile} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// קומפוננטת כפתור הורדה פשוטה
const FileDownloadButton: React.FC<{ onDownload: () => void }> = ({ onDownload }) => {
  return (
    <Button onClick={onDownload} variant="outline" className="gap-2">
      <DownloadIcon />
      הורדה
    </Button>
  )
}

// אייקון הורדה נפרד לשימוש חוזר
const DownloadIcon: React.FC = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
}

export default ViewFileModal