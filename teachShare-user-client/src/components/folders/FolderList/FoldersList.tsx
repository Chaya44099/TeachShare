"use client"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSubFolders,
  navigateToFolder,
  navigateBack,
  selectFolderCache,
} from "../../../slices/CollectionSlice"
import { setCurrentFiles } from "../../../slices/MaterialSlice"
import type { Collection } from "../../../Models/Collection"
import type { AppDispatch } from "../../../store"

import { BackButton } from "./BackButton"
import { FolderSearch } from "./FolderSearch"
import { FolderList } from "./FolderList"
import { EmptyFolderState } from "./EmptyFolderState"
import { DeleteFolderDialog } from "./DeleteFolderDialog"

import { ScrollArea } from "../../../components/ui/scroll-area"
// import { motion } from "framer-motion"

interface FoldersListProps {
  folders: Collection[]
  currentFolder: Collection | null
}

/**
 * FoldersList - תצוגת תיקיות מודרנית עם אנימציות ואפשרויות חיפוש
 */
const FoldersList: React.FC<FoldersListProps> = ({ folders, currentFolder }) => {
  const dispatch = useDispatch<AppDispatch>()
  const folderCache = useSelector(selectFolderCache)
  const [searchQuery, setSearchQuery] = useState("")
  const [folderToDelete, setFolderToDelete] = useState<Collection | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // טיפול בלחיצה על תיקייה - ניווט לתיקייה וטעינת התוכן שלה
  const handleFolderClick = (folder: Collection) => {
    dispatch(navigateToFolder(folder))

    if (!folderCache[folder.id] && !folder.subCollections?.length) {
      dispatch(fetchSubFolders(folder.id))
    }

    // עדכון הקבצים הנוכחיים אם לתיקייה יש קבצים
    if (folder.materials && folder.materials.length > 0) {
      dispatch(setCurrentFiles(folder.materials))
    } else {
      dispatch(setCurrentFiles([]))
    }
  }

  // חזרה לתיקיית האב
  const handleBackClick = () => {
    dispatch(navigateBack())
  }

  // פתיחת דיאלוג מחיקת תיקייה
  const openDeleteDialog = (folder: Collection) => {
    setFolderToDelete(folder)
    setIsDeleteDialogOpen(true)
  }

  // סינון תיקיות לפי חיפוש
  const filteredFolders = folders.filter((folder) => folder.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-4">
      {/* כפתור חזרה */}
      {currentFolder && (
        <BackButton onClick={handleBackClick} />
      )}

      {/* חיפוש תיקיות */}
      <FolderSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* רשימת תיקיות */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        {filteredFolders.length === 0 ? (
          <EmptyFolderState searchQuery={searchQuery} currentFolder={currentFolder} />
        ) : (
          <FolderList 
            folders={filteredFolders} 
            onFolderClick={handleFolderClick} 
            onDeleteClick={openDeleteDialog} 
          />
        )}
      </ScrollArea>

      {/* דיאלוג אישור מחיקת תיקייה */}
      <DeleteFolderDialog 
        isOpen={isDeleteDialogOpen} 
        setIsOpen={setIsDeleteDialogOpen} 
        folder={folderToDelete} 
      />
    </div>
  )
}

export default FoldersList