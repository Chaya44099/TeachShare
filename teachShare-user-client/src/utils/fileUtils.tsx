// // src/utils/fileUtils.ts
// /**
//  * Utility functions for handling files
//  */

// /**
//  * Format file size to human readable format
//  */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// /**
//  * Get appropriate icon for file type
//  */
// export const getFileIcon = (fileType: string): string => {
//     const iconMap: { [key: string]: string } = {
//         'pdf': '📄',
//         'doc': '📝',
//         'docx': '📝',
//         'jpg': '🖼️',
//         'jpeg': '🖼️',
//         'png': '🖼️',
//         'gif': '🖼️',
//         'xls': '📊',
//         'xlsx': '📊',
//         'ppt': '📑',
//         'pptx': '📑',
//         'txt': '📋',
//         'csv': '📊'
//     };
    
//     let ext = fileType.toLowerCase();
//     if (ext.includes('/')) {
//         ext = ext.split('/').pop() || '';
//     }
    
//     return iconMap[ext] || '📄';
// };
/**
 * FileTypeUtils - כלי עזר לזיהוי סוגי קבצים
 */
export class FileTypeUtils {
    /**
     * בדיקה האם קובץ הוא תמונה
     */
    static isImageFile(fileType: string, fileExtension: string): boolean {
      return (
        fileType.includes("image") || 
        ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension)
      )
    }
  
    /**
     * בדיקה האם קובץ הוא וידאו
     */
    static isVideoFile(fileType: string, fileExtension: string): boolean {
      return (
        fileType.includes("video") || 
        ["mp4", "webm", "avi", "mov", "wmv"].includes(fileExtension)
      )
    }
  
    /**
     * בדיקה האם קובץ הוא אודיו
     */
    static isAudioFile(fileType: string, fileExtension: string): boolean {
      return (
        fileType.includes("audio") || 
        ["mp3", "wav", "ogg", "m4a", "mpeg"].includes(fileExtension)
      )
    }
  
    /**
     * בדיקה האם קובץ הוא PDF
     */
    static isPdfFile(fileType: string, fileExtension: string): boolean {
      return fileType.includes("pdf") || fileExtension === "pdf"
    }
  
    /**
     * בדיקה האם קובץ הוא קובץ טקסט
     */
    static isTextFile(fileType: string, fileExtension: string): boolean {
      return (
        fileType.includes("text") || 
        ["txt", "csv", "json", "xml", "html", "css", "js"].includes(fileExtension)
      )
    }
  
    /**
     * בדיקה האם קובץ הוא מסוג Office
     */
    static isOfficeFile(fileExtension: string): boolean {
      return ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(fileExtension)
    }
  
    /**
     * קבלת תיאור סוג הקובץ בעברית
     */
    static getFileTypeText(fileType: string, fileName: string): string {
      const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""
      
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
      
      return fileExtension.toUpperCase()
    }
  }