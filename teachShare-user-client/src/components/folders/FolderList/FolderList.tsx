"use client"

import  React from "react"
import { AnimatePresence } from "framer-motion"
import { FolderItem } from "./FolderItem"
import type { Collection } from "../../../Models/Collection"

interface FolderListProps {
  folders: Collection[]
  onFolderClick: (folder: Collection) => void
  onDeleteClick: (folder: Collection) => void
  onEditClick: (folder: Collection) => void
}

export const FolderList: React.FC<FolderListProps> = ({ folders, onFolderClick, onDeleteClick, onEditClick }) => {
  return (
    <AnimatePresence>
      <div className="space-y-2">
        {folders.map((folder, index) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            index={index}
            onClick={() => onFolderClick(folder)}
            onDeleteClick={(e) => {
              e.stopPropagation()
              onDeleteClick(folder)
            }}
            onEditClick={(e) => {
              e.stopPropagation()
              onEditClick(folder)
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  )
}
