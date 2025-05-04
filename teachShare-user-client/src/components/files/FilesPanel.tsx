"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentFolder } from "../../slices/CollectionSlice"
import { fetchMaterialsByFolder, selectCurrentFiles, selectMaterialLoading } from "../../slices/MaterialSlice"
import type { AppDispatch } from "../../store"
import type { Material } from "../../Models/Collection"
import FileList from "./FileList"
import UploadFileModal from "./UploadFile/UploadFileModal"
import ViewFileModal from "./ViewFileModal/ViewFileModal"
import "../styles/FilesPanel.css"
import { FileUp, FolderOpen, Loader2, AlertCircle, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

/**
 * FilesPanel - Main container for file management functionality.
 */
const FilesPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentFolder = useSelector(selectCurrentFolder)
  const currentFiles = useSelector(selectCurrentFiles)
  const isLoading = useSelector(selectMaterialLoading)

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [viewFile, setViewFile] = useState<Material | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Load files when current folder changes
  useEffect(() => {
    if (currentFolder?.id) {
      dispatch(fetchMaterialsByFolder(currentFolder.id))
    }
  }, [currentFolder?.id, dispatch])

  // Open file viewer modal
  const handleViewFile = (file: Material) => {
    setViewFile(file)
    setIsViewModalOpen(true)
  }

  // Handle upload button click
  const handleUploadClick = () => {
    if (currentFolder) {
      setIsUploadModalOpen(true)
    }
  }

  // סינון קבצים לפי חיפוש
  const filteredFiles = currentFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="files-panel p-4 rounded-lg bg-white shadow-sm flex flex-col h-full">
      <div className="files-header flex justify-between items-center mb-4 flex-shrink-0">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-emerald-500" />
          {currentFolder ? `קבצים בתיקייה: ${currentFolder.name}` : "בחרי תיקייה להצגת קבצים"}
        </h3>
        <Button onClick={handleUploadClick} className="bg-emerald-600 hover:bg-emerald-700" disabled={!currentFolder}>
          <FileUp className="mr-2 h-4 w-4" />
          העלאת קובץ
        </Button>
      </div>

      {/* חיפוש קבצים - עם רוחב מוגבל */}
      {currentFolder && currentFiles.length > 0 && (
        <div className="relative mb-4 w-64 mr-auto">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="חיפוש קבצים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 text-right"
            dir="rtl"
          />
        </div>
      )}

      {!currentFolder && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-center gap-2 text-amber-700 flex-shrink-0">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>יש לבחור תיקייה כדי להציג ולנהל קבצים</p>
        </div>
      )}

      <div className="flex-grow overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 h-full">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>טוען קבצים...</p>
          </div>
        ) : currentFolder && filteredFiles.length > 0 ? (
          <FileList files={filteredFiles} onViewFile={handleViewFile} />
        ) : currentFolder && searchQuery && currentFiles.length > 0 ? (
          <div className="empty-state bg-gray-50 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
            <Search className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-lg font-medium text-gray-700 mb-1">לא נמצאו קבצים</p>
            <p className="text-gray-500">לא נמצאו קבצים התואמים לחיפוש "{searchQuery}"</p>
          </div>
        ) : currentFolder ? (
          <div className="empty-state bg-gray-50 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FileUp className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700 mb-1">אין קבצים בתיקייה זו</p>
            <p className="text-gray-500 mb-4">העלי קובץ ראשון כדי להתחיל</p>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <FileUp className="mr-2 h-4 w-4" />
              העלאת קובץ ראשון
            </Button>
          </div>
        ) : (
          <div className="empty-state bg-gray-50 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FolderOpen className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700">בחרי תיקייה מהרשימה</p>
            <p className="text-gray-500">כדי לצפות בקבצים ולנהל אותם</p>
          </div>
        )}
      </div>

      {/* מודל העלאת קובץ - עם הממשק החדש */}
      {currentFolder && (
        <UploadFileModal currentFolder={currentFolder} open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
      )}

      {/* מודל צפייה בקובץ - עם הממשק החדש */}
      {viewFile && <ViewFileModal file={viewFile} open={isViewModalOpen} onOpenChange={setIsViewModalOpen} />}
    </div>
  )
}

export default FilesPanel
