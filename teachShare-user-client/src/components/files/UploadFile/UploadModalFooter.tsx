import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { DialogFooter } from "../../../components/ui/dialog"

interface UploadModalFooterProps {
  onClose: () => void
  onUpload: () => void
  isUploading: boolean
  uploadComplete: boolean
  hasFile: boolean
}

export const UploadModalFooter: React.FC<UploadModalFooterProps> = ({
  onClose,
  onUpload,
  isUploading,
  uploadComplete,
  hasFile,
}) => {
  return (
    <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
      <Button
        type="submit"
        onClick={onUpload}
        disabled={!hasFile || isUploading || uploadComplete}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            מעלה...
          </>
        ) : (
          <>העלאה</>
        )}
      </Button>
      <Button variant="outline" onClick={onClose} disabled={isUploading}>
        ביטול
      </Button>
    </DialogFooter>
  )
}
