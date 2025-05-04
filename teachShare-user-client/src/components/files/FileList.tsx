"use client"

import React from "react"
import type { Material } from "../../Models/Collection"
import FileCard from "./FileCard/FileCard"

interface FileListProps {
  files: Material[]
  onViewFile: (file: Material) => void
}

/**
 * FileList - תצוגת גריד מודרנית של קבצים
 */
const FileList: React.FC<FileListProps> = ({ files, onViewFile }) => {
  return (
    <div className="files-list-container overflow-auto max-h-[calc(100vh-220px)]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {files.map((file) => (
          <FileCard key={file.id} file={file} onViewFile={onViewFile} />
        ))}
      </div>
    </div>
  )
}

export default FileList
