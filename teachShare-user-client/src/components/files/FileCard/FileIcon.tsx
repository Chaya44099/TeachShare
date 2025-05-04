import React from "react"
import { FileText, ImageIcon, File, Video, Music, Archive, Code } from "lucide-react"
import type { Material } from "../../../Models/Collection"

interface FileIconProps {
  file: Material
  size?: "sm" | "md" | "lg"
}

/**
 * FileIcon - קומפוננטה להצגת אייקון מתאים לסוג הקובץ
 */
export const FileIcon: React.FC<FileIconProps> = ({ file, size = "md" }) => {
  // הגדרת גודל האייקון לפי הפרמטר שהועבר
  const iconSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }[size]

  // פונקציה לקבלת אייקון מתאים לסוג הקובץ
  const getFileIcon = () => {
    const fileType = file.type?.toLowerCase() || ""
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""

    if (fileType.includes("image") || ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension))
      return <ImageIcon className={`${iconSize} text-blue-500`} />
    if (fileType.includes("video") || ["mp4", "webm", "avi", "mov", "wmv"].includes(fileExtension))
      return <Video className={`${iconSize} text-red-500`} />
    if (fileType.includes("audio") || ["mp3", "wav", "ogg", "m4a"].includes(fileExtension))
      return <Music className={`${iconSize} text-purple-500`} />
    if (fileType.includes("pdf") || fileExtension === "pdf") 
      return <FileText className={`${iconSize} text-orange-500`} />
    if (
      fileType.includes("zip") ||
      fileType.includes("rar") ||
      ["zip", "rar", "7z", "tar", "gz"].includes(fileExtension)
    )
      return <Archive className={`${iconSize} text-yellow-500`} />
    if (
      fileType.includes("html") ||
      fileType.includes("css") ||
      fileType.includes("javascript") ||
      ["html", "css", "js", "ts", "jsx", "tsx", "json", "xml", "py", "java", "c", "cpp"].includes(fileExtension)
    )
      return <Code className={`${iconSize} text-green-500`} />
    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf", "odt"].includes(fileExtension))
      return <FileText className={`${iconSize} text-blue-700`} />

    return <File className={`${iconSize} text-gray-500`} />
  }

  return getFileIcon()
}