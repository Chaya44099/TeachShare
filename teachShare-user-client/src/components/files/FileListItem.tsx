// src/components/files/FileListItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteFile,
    downloadFile as downloadFileAction
} from '../../slices/MaterialSlice';
import { Material } from '../../Models/Collection';
import { AppDispatch } from '../../store';
import { getFileIcon, formatFileSize } from '../../utils/fileUtils';

interface FileListItemProps {
    file: Material;
    onViewFile: (file: Material) => void;
}

/**
 * FileListItem - Displays a single file card with actions
 */
const FileListItem: React.FC<FileListItemProps> = ({ file, onViewFile }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDownloadFile = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            // קבלת ה-URL להורדה
            const response = await dispatch(downloadFileAction(file.s3Key)).unwrap();
    
            if (!response) {
                throw new Error("לא התקבל URL להורדה");
            }
    
            // ביצוע fetch לקובץ עצמו
            const fileResponse = await fetch(response);
            const blob = await fileResponse.blob();
            
            // יצירת URL לבלוב והורדתו
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = file.name;
            
            // הוספה לעמוד, הפעלה, והסרה
            document.body.appendChild(link);
            link.click();
            
            // ניקוי
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            }, 100);
        } catch (error) {
            console.error('שגיאה בקבלת כתובת הורדה:', error);
            alert(`שגיאה בהורדת הקובץ: ${file.name}`);
        }
    };

    const handleDeleteFile = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('האם את בטוחה שברצונך למחוק קובץ זה?')) {
            try {
                await dispatch(deleteFile(file.id));
            } catch (error) {
                console.error('שגיאה במחיקת קובץ:', error);
            }
        }
    };

    return (
        <div 
            className="file-card"
            onClick={() => onViewFile(file)}
        >
            <div className="file-icon">
                {getFileIcon(file.type)}
            </div>
            <div className="file-details">
                <h4>{file.name}</h4>
                <div className="file-meta">
                    <span>{file.type.toUpperCase()}</span>
                    <span>{formatFileSize(file.size)}</span>
                    <span>
                        {new Date(file.createdDate).toLocaleDateString('he-IL')}
                    </span>
                </div>
            </div>
            <div className="file-actions">
                <button 
                    className="view-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewFile(file);
                    }}
                >
                    צפייה
                </button>
                <button 
                    className="download-btn"
                    onClick={handleDownloadFile}
                >
                    הורדה
                </button>
                <button 
                    className="delete-btn"
                    onClick={handleDeleteFile}
                >
                    מחיקה
                </button>
            </div>
        </div>
    );
};

export default FileListItem;