import React from "react"
import { FileUp } from "lucide-react"
import { DialogTitle, DialogDescription } from "../../../components/ui/dialog"
import type { Collection } from "../../../Models/Collection"

interface UploadModalHeaderProps {
  currentFolder: Collection
}

export const UploadModalHeader: React.FC<UploadModalHeaderProps> = ({ currentFolder }) => {
  return (
    <>
      <DialogTitle className="text-2xl font-bold text-right flex items-center gap-2">
        <FileUp className="h-6 w-6 text-emerald-500" />
        העלאת קובץ
      </DialogTitle>
      <DialogDescription className="text-right">
        העלאת קובץ לתיקייה: <span className="font-semibold">{currentFolder?.name}</span>
      </DialogDescription>
    </>
  )
}