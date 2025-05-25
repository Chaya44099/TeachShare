import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../slices/CategoriesSlice";
import type { Material } from "../../../Models/Collection";
import { Globe, Tag } from "lucide-react";

interface FileDetailsProps {
  file: Material;
}

export const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  const categories = useSelector(selectCategories);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  
  // מציאת שם הקטגוריה לפי הID
  useEffect(() => {
    if (file.categoryId && categories.length > 0) {
      const category = categories.find(cat => cat.id === file.categoryId);
      setCategoryName(category ? category.name : null);
    }
  }, [file.categoryId, categories]);

  // פורמט גודל קובץ
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  };

  // פורמט תאריך
  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), "dd בMMM yyyy", { locale: he });
    } catch (error) {
      return "תאריך לא תקין";
    }
  };

  return (
    <div className="text-xs text-gray-500 space-y-1">
      <div className="flex justify-between">
        <span>סוג:</span>
        <span className="font-medium">{file.type}</span>
      </div>
      
      <div className="flex justify-between">
        <span>גודל:</span>
        <span className="font-medium">{formatFileSize(file.size)}</span>
      </div>
      
      <div className="flex justify-between">
        <span>תאריך יצירה:</span>
        <span className="font-medium">{formatDate(file.createdDate)}</span>
      </div>
      
      {/* מידע על שיתוף */}
      {file.isPublic && (
        <>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              סטטוס:
            </span>
            <span className="font-medium text-indigo-600">משותף</span>
          </div>
          
          {/* הצגת קטגוריה אם קיימת */}
          {categoryName && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                קטגוריה:
              </span>
              <span className="font-medium text-indigo-600">{categoryName}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};