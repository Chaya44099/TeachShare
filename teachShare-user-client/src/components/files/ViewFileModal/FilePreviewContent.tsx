import React from "react"
import { Download, AlertCircle, Loader2 } from "lucide-react"
import type { Material } from "../../../Models/Collection"
import { Button } from "../../ui/button"
import { FileIcon } from "../FileCard/FileIcon"
import { FileTypeUtils } from "../../../utils/fileUtils"

interface FilePreviewContentProps {
  file: Material
  fileViewUrl: string | null
  isLoading: boolean
  error: string | null
  onDownload: () => void
}

/**
 * FilePreviewContent - קומפוננטה להצגת תוכן הקובץ בהתאם לסוג
 */
export const FilePreviewContent: React.FC<FilePreviewContentProps> = ({
  file,
  fileViewUrl,
  isLoading,
  error,
  onDownload
}) => {
  // אם יש שגיאה, הצג הודעת שגיאה
  if (error) {
    return <ErrorDisplay message={error} />
  }

  // אם בטעינה, הצג אנימציית טעינה
  if (isLoading || !fileViewUrl) {
    return <LoadingDisplay />
  }

  const fileType = file.type?.toLowerCase() || ""
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""
  
  // תמונות
  if (FileTypeUtils.isImageFile(fileType, fileExtension)) {
    return <ImagePreview fileViewUrl={fileViewUrl} fileName={file.name} />
  }

  // וידאו
  if (FileTypeUtils.isVideoFile(fileType, fileExtension)) {
    return <VideoPreview fileViewUrl={fileViewUrl} />
  }
  
  // אודיו
  if (FileTypeUtils.isAudioFile(fileType, fileExtension)) {
    return <AudioPreview fileViewUrl={fileViewUrl} />
  }

  // PDF
  if (FileTypeUtils.isPdfFile(fileType, fileExtension)) {
    return <PdfPreview fileViewUrl={fileViewUrl} fileName={file.name} />
  }

  // קבצי טקסט
  if (FileTypeUtils.isTextFile(fileType, fileExtension)) {
    return <TextFilePreview fileViewUrl={fileViewUrl} fileName={file.name} />
  }

  // קבצי Office וסוגים אחרים שלא ניתן להציג
  return (
    <UnsupportedFilePreview 
      file={file}
      onDownload={onDownload}
      isOfficeFile={FileTypeUtils.isOfficeFile(fileExtension)}
    />
  )
}

// קומפוננטות משנה להצגת סוגי קבצים שונים

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start gap-3 my-4">
    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
    <div>{message}</div>
  </div>
)

const LoadingDisplay: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
    <p className="text-gray-500">טוען תצוגה...</p>
  </div>
)

const ImagePreview: React.FC<{ fileViewUrl: string, fileName: string }> = ({ fileViewUrl, fileName }) => (
  <div className="flex justify-center items-center">
    <img
      src={fileViewUrl || "/placeholder.svg"}
      alt={fileName}
      className="max-w-full max-h-[60vh] object-contain"
    />
  </div>
)

const VideoPreview: React.FC<{ fileViewUrl: string }> = ({ fileViewUrl }) => (
  <div className="flex justify-center items-center">
    <video src={fileViewUrl} controls className="max-w-full max-h-[60vh]">
      הדפדפן שלך אינו תומך בתגית וידאו.
    </video>
  </div>
)

const AudioPreview: React.FC<{ fileViewUrl: string }> = ({ fileViewUrl }) => (
  <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg">
    <audio 
      src={fileViewUrl}    
      controls 
      style={{ width: '100%' }}
    >
      הדפדפן שלך אינו תומך בתגית אודיו.
    </audio>
  </div>
)

const PdfPreview: React.FC<{ fileViewUrl: string, fileName: string }> = ({ fileViewUrl, fileName }) => (
  <div className="w-full h-[60vh] overflow-hidden rounded-md border border-gray-200">
    <iframe src={`${fileViewUrl}#toolbar=0`} className="w-full h-full" title={fileName} />
  </div>
)

const TextFilePreview: React.FC<{ fileViewUrl: string, fileName: string }> = ({ fileViewUrl, fileName }) => (
  <div className="w-full h-[60vh] overflow-hidden rounded-md border border-gray-200">
    <iframe src={fileViewUrl} className="w-full h-full" title={fileName} />
  </div>
)

const UnsupportedFilePreview: React.FC<{ 
  file: Material, 
  onDownload: () => void,
  isOfficeFile: boolean
}> = ({ file, onDownload, isOfficeFile }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <FileIcon file={file} size="lg" />
    <p className="mt-4 text-lg font-medium">{file.name}</p>
    <p className="text-gray-500 mb-6">
      {isOfficeFile 
        ? "לא ניתן להציג תצוגה מקדימה לקובץ Office" 
        : "לא ניתן להציג תצוגה מקדימה לסוג קובץ זה"}
    </p>
    <Button onClick={onDownload} className="bg-emerald-600 hover:bg-emerald-700">
      <Download className="mr-2 h-4 w-4" />
      הורדת הקובץ
    </Button>
  </div>
)