// src/components/files/ViewFileModal.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getViewFileUrl,
    downloadFile as downloadFileAction
} from '../../slices/MaterialSlice';
import { Material } from '../../Models/Collection';
import { AppDispatch } from '../../store';

interface ViewFileModalProps {
    file: Material;
    onClose: () => void;
}

/**
 * ViewFileModal - Modal for viewing file content
 */
const ViewFileModal: React.FC<ViewFileModalProps> = ({ file, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [fileViewUrl, setFileViewUrl] = useState<string | null>(null);

    // Fetch view URL when component mounts
    useEffect(() => {
        const fetchViewUrl = async () => {
            try {
                const viewUrl = await dispatch(getViewFileUrl(file.s3Key)).unwrap();
                setFileViewUrl(viewUrl);
            } catch (error) {
                console.error('שגיאה בקבלת כתובת צפייה:', error);
                alert(`שגיאה בפתיחת הקובץ: ${file.name}`);
                onClose();
            }
        };

        fetchViewUrl();
    }, [file, dispatch, onClose]);

    const handleDownloadFile = async () => {
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

    const renderFileViewer = () => {
        if (!fileViewUrl) return <div className="loading">טוען תצוגה...</div>;
        
        const fileType = file.type.toLowerCase();
        
        if (fileType === 'pdf') {
            return (
                <iframe 
                    src={fileViewUrl}
                    style={{ width: '100%', height: '80vh' }}
                    title={file.name}
                ></iframe>
            );
        }
        
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            return (
                <img 
                    src={fileViewUrl} 
                    alt={file.name}
                    style={{ maxWidth: '100%', maxHeight: '80vh' }}
                />
            );
        }
        
        if (['mp4', 'webm'].includes(fileType)) {
            return (
                <video 
                    src={fileViewUrl} 
                    controls 
                    style={{ maxWidth: '100%', maxHeight: '80vh' }}
                >
                    הדפדפן שלך אינו תומך בתגית וידאו.
                </video>
            );
        }
        
        if (['mp3', 'wav'].includes(fileType)) {
            return (
                <audio 
                    src={fileViewUrl} 
                    controls 
                    style={{ width: '100%' }}
                >
                    הדפדפן שלך אינו תומך בתגית אודיו.
                </audio>
            );
        }
        
        if (fileType === 'txt') {
            return (
                <iframe 
                    src={fileViewUrl} 
                    style={{ width: '100%', height: '80vh', border: 'none' }}
                    title={file.name}
                ></iframe>
            );
        }
        
        return (
            <div className="unsupported-preview">
                <p>לא ניתן להציג סוג קובץ זה ישירות. אנא הורידי את הקובץ.</p>
                <button 
                    className="download-btn-large"
                    onClick={handleDownloadFile}
                >
                    הורדת הקובץ
                </button>
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            <div className="view-modal">
                <div className="modal-header">
                    <h3>{file.name}</h3>
                    <button 
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="view-content">
                    {renderFileViewer()}
                </div>

                <div className="modal-footer">
                    <button 
                        className="download-btn"
                        onClick={handleDownloadFile}
                    >
                        הורדה
                    </button>
                    <button 
                        className="close-view-btn"
                        onClick={onClose}
                    >
                        סגירה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewFileModal;