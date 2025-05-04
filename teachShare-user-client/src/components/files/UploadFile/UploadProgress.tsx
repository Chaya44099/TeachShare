import React from "react"
import { Progress } from "../../../components/ui/progress"

interface UploadProgressProps {
  progress: number
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>מעלה את הקובץ...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}