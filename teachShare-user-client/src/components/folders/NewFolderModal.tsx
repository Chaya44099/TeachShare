// src/components/folders/NewFolderModal.tsx
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { FolderPlus, FolderSync } from "lucide-react"
import { motion } from "framer-motion"
import FolderForm from "./FolderForm"
import StatusSnackbar from "./StatusSnackbar"
import { useFolderCreation } from "../../hooks/useFolderCreation"

interface NewFolderModalProps {
  currentFolder: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NewFolderModal: React.FC<NewFolderModalProps> = ({ currentFolder, open, onOpenChange }) => {
  const {
    newFolderName,
    setNewFolderName,
    newFolderDescription,
    setNewFolderDescription,
    selectedIcon,
    setSelectedIcon,
    isCreating,
    handleCreateFolder,
    resetForm,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity
  } = useFolderCreation(currentFolder, onOpenChange)

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] rtl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-right flex items-center gap-2">
              <FolderPlus className="h-6 w-6 text-emerald-500" />
              יצירת תיקייה חדשה
            </DialogTitle>
            <DialogDescription className="text-right">צור תיקייה חדשה לארגון הקבצים והתוכן שלך</DialogDescription>
          </DialogHeader>

          <FolderForm 
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
            newFolderDescription={newFolderDescription}
            setNewFolderDescription={setNewFolderDescription}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            currentFolder={currentFolder}
          />

          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button
              type="submit"
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim() || isCreating}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="mr-2"
                  >
                    <FolderSync className="h-4 w-4" />
                  </motion.div>
                  יוצר תיקייה...
                </>
              ) : (
                <>יצירת תיקייה</>
              )}
            </Button>
            <Button variant="outline" onClick={handleClose}>ביטול</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StatusSnackbar 
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  )
}

export default NewFolderModal