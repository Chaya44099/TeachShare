// src/components/folders/FolderForm.tsx
import React from "react"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { FolderOpen } from "lucide-react"
import FolderIconSelector from "./FolderIconSelector"

interface FolderFormProps {
  newFolderName: string
  setNewFolderName: (name: string) => void
  newFolderDescription: string
  setNewFolderDescription: (description: string) => void
  selectedIcon: number
  setSelectedIcon: (index: number) => void
  currentFolder: any
}

const FolderForm: React.FC<FolderFormProps> = ({
  newFolderName,
  setNewFolderName,
  newFolderDescription,
  setNewFolderDescription,
  selectedIcon,
  setSelectedIcon,
  currentFolder
}) => {
  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="folderName" className="text-right">שם התיקייה</Label>
        <Input 
          id="folderName" 
          dir="rtl" 
          value={newFolderName} 
          onChange={(e) => setNewFolderName(e.target.value)} 
          placeholder="הזן שם לתיקייה החדשה" 
          className="text-right" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="folderDescription" className="text-right">תיאור (אופציונלי)</Label>
        <Textarea 
          id="folderDescription" 
          dir="rtl" 
          value={newFolderDescription} 
          onChange={(e) => setNewFolderDescription(e.target.value)} 
          placeholder="תיאור התיקייה" 
          className="resize-none text-right" 
          rows={3} 
        />
      </div>

      <div className="space-y-2">
        <Label className="text-right block">בחר אייקון לתיקייה</Label>
        <FolderIconSelector selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
      </div>

      {currentFolder && (
        <div className="bg-muted p-3 rounded-md flex items-center gap-2 text-sm">
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
          <span>
            התיקייה תיווצר בתוך: <strong>{currentFolder.name}</strong>
          </span>
        </div>
      )}
    </div>
  )
}

export default FolderForm