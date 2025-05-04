import { useState } from "react"
import { useDispatch } from "react-redux"
import { downloadFile as downloadFileAction } from "../slices/MaterialSlice"
import type { Material } from "../Models/Collection"
import type { AppDispatch } from "../store"

/**
 * Hook לטיפול בהורדת קבצים
 */
export const useFileDownload = (file: Material) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  // פונקציה להורדת קובץ
  const handleDownloadFile = async () => {
    setIsDownloading(true)
    setDownloadError(null)
    
    try {
      // קבלת ה-URL להורדה
      const response = await dispatch(downloadFileAction(file.s3Key)).unwrap()

      if (!response) {
        throw new Error("לא התקבל URL להורדה")
      }

      // ביצוע fetch לקובץ עצמו
      const fileResponse = await fetch(response)
      const blob = await fileResponse.blob()

      // יצירת URL לבלוב והורדתו
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = file.name

      // הוספה לעמוד, הפעלה, והסרה
      document.body.appendChild(link)
      link.click()

      // ניקוי
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
    } catch (error) {
      console.error("שגיאה בקבלת כתובת הורדה:", error)
      setDownloadError(`שגיאה בהורדת הקובץ: ${file.name}`)
    } finally {
      setIsDownloading(false)
    }
  }

  return {
    handleDownloadFile,
    isDownloading,
    downloadError
  }
}