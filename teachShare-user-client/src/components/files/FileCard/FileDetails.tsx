import React from "react"
import { HardDrive, Calendar } from "lucide-react"
import type { Material } from "../../../Models/Collection"
import { formatFileSize } from "../../../utils/fileUtils"

interface FileDetailsProps {
  file: Material
}

/**
 * FileDetails - קומפוננטה להצגת פרטי הקובץ
 */
export const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  // פונקציה לקבלת סוג קובץ מפושט
  const getSimplifiedFileType = () => {
    const fileType = file.type?.toLowerCase() || ""
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""

    if (fileType.includes("image")) return "תמונה"
    if (fileType.includes("video")) return "וידאו"
    if (fileType.includes("audio")) return "אודיו"
    if (fileType.includes("pdf") || fileExtension === "pdf") return "PDF"
    if (fileType.includes("zip") || fileType.includes("rar")) return "ארכיון"
    if (fileType.includes("html") || fileType.includes("css") || fileType.includes("javascript")) return "קוד"
    if (fileType.includes("vnd.openxmlformats-officedocument.wordprocessingml")) return "DOCX"
    if (fileType.includes("vnd.openxmlformats-officedocument.spreadsheetml")) return "XLSX"
    if (fileType.includes("vnd.openxmlformats-officedocument.presentationml")) return "PPTX"
    if (fileType.includes("msword")) return "DOC"
    if (fileType.includes("ms-excel")) return "XLS"
    if (fileType.includes("ms-powerpoint")) return "PPT"
    if (fileType.includes("text")) return "טקסט"

    // אם לא זוהה סוג ספציפי, החזר את סיומת הקובץ
    return fileExtension.toUpperCase()
  }

  // פונקציה לפורמט תאריך
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <HardDrive className="h-3 w-3" />
        <span>{formatFileSize(file.size)}</span>
      </div>
      <div className="flex items-center gap-1 justify-end">
        <span>{getSimplifiedFileType()}</span>
      </div>
      <div className="flex items-center gap-1 col-span-2">
        <Calendar className="h-3 w-3" />
        <span>{formatDate(file.createdDate)}</span>
      </div>
    </div>
  )
}