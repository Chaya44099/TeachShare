import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectCurrentFolder 
} from '../slices/CollectionSlice';
import { 
    fetchMaterialsByFolder, 
    uploadFile, 
    deleteFile,
    downloadFile as downloadFileAction,
    getViewFileUrl,
    selectCurrentFiles,
    selectMaterialLoading,
    selectUploadProgress,
    clearUploadProgress
} from '../slices/MaterialSlice';
import { AppDispatch } from '../store';
import { Material } from '../Models/Collection';

const FilesPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentFolder = useSelector(selectCurrentFolder);
    const currentFiles = useSelector(selectCurrentFiles);
    const isLoading = useSelector(selectMaterialLoading);
    const uploadProgress = useSelector(selectUploadProgress);
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    
    const [viewFile, setViewFile] = useState<Material | null>(null);
    const [fileViewUrl, setFileViewUrl] = useState<string | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        if (currentFolder?.id) {
            dispatch(fetchMaterialsByFolder(currentFolder.id));
        }
    }, [currentFolder?.id, dispatch]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSizeInBytes) {
                setUploadError('הקובץ גדול מדי. גודל מקסימלי: 50MB');
                return;
            }
            setSelectedFile(file);
            setUploadError(null);
        }
    };

    const handleUploadFile = async () => {
        if (!selectedFile || !currentFolder) {
            setUploadError('אנא בחרי קובץ ותיקייה');
            return;
        }

        try {
            dispatch(clearUploadProgress());
            setUploadError(null);
            const userString = sessionStorage.getItem('user');
            let userId = 0;
            
            if (userString) {
                const user = JSON.parse(userString);
                userId = user.id;
            }

            await dispatch(uploadFile({
                file: selectedFile,
                folderId: currentFolder.id,
                userId: userId
            }));

            setSelectedFile(null);
            setShowUploadModal(false);
        } catch (error) {
            console.error('שגיאה בהעלאת קובץ:', error);
            setUploadError('שגיאה בהעלאת הקובץ. אנא נסי שנית.');
        }
    };

    const handleDeleteFile = async (fileId: number) => {
        if (window.confirm('האם את בטוחה שברצונך למחוק קובץ זה?')) {
            try {
                await dispatch(deleteFile(fileId));
            } catch (error) {
                console.error('שגיאה במחיקת קובץ:', error);
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getFileIcon = (fileType: string) => {
        const iconMap: { [key: string]: string } = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'png': '🖼️',
            'gif': '🖼️',
            'xls': '📊',
            'xlsx': '📊',
            'ppt': '📑',
            'pptx': '📑',
            'txt': '📋',
            'csv': '📊'
        };
        
        let ext = fileType.toLowerCase();
        if (ext.includes('/')) {
            ext = ext.split('/').pop() || '';
        }
        
        return iconMap[ext] || '📄';
    };

    const downloadFile = async (file: Material) => {
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
    
    const openFileForView = async (file: Material) => {
        try {
            // קבלת URL לצפייה
            const viewUrl = await dispatch(getViewFileUrl(file.s3Key)).unwrap();
            
            // שמירת ה-file ו-URL לצפייה
            setViewFile(file);
            setFileViewUrl(viewUrl);
            setShowViewModal(true);
        } catch (error) {
            console.error('שגיאה בקבלת כתובת צפייה:', error);
            alert(`שגיאה בפתיחת הקובץ: ${file.name}`);
        }
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setViewFile(null);
        setFileViewUrl(null);
    };

    const renderFileViewer = () => {
        if (!viewFile || !fileViewUrl) return null;
        
        const fileUrl = fileViewUrl;
        const fileType = viewFile.type.toLowerCase();
        
        if (fileType === 'pdf') {
            return (
                <iframe 
                    src={fileUrl}
                    style={{ width: '100%', height: '80vh' }}
                    title={viewFile.name}
                ></iframe>
            );
        }
        
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            return (
                <img 
                    src={fileUrl} 
                    alt={viewFile.name}
                    style={{ maxWidth: '100%', maxHeight: '80vh' }}
                />
            );
        }
        
        if (['mp4', 'webm'].includes(fileType)) {
            return (
                <video 
                    src={fileUrl} 
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
                    src={fileUrl} 
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
                    src={fileUrl} 
                    style={{ width: '100%', height: '80vh', border: 'none' }}
                    title={viewFile.name}
                ></iframe>
            );
        }
        
        return (
            <div className="unsupported-preview">
                <p>לא ניתן להציג סוג קובץ זה ישירות. אנא הורידי את הקובץ.</p>
                <button 
                    className="download-btn-large"
                    onClick={() => downloadFile(viewFile)}
                >
                    הורדת הקובץ
                </button>
            </div>
        );
    };

    return (
        <div className="files-panel">
            <div className="files-header">
                <h3>
                    {currentFolder 
                        ? `קבצים בתיקייה: ${currentFolder.name}` 
                        : 'בחרי תיקייה להצגת קבצים'}
                </h3>
                <button 
                    className="upload-btn"
                    onClick={() => setShowUploadModal(true)}
                    disabled={!currentFolder}
                >
                    + העלאת קובץ
                </button>
            </div>

            {isLoading ? (
                <div className="loading-state">טוען קבצים...</div>
            ) : currentFolder && currentFiles.length > 0 ? (
                <div className="files-grid">
                    {currentFiles.map((file) => (
                        <div 
                            key={file.id} 
                            className="file-card"
                            onClick={() => openFileForView(file)}
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
                                        openFileForView(file);
                                    }}
                                >
                                    צפייה
                                </button>
                                <button 
                                    className="download-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadFile(file);
                                    }}
                                >
                                    הורדה
                                </button>
                                <button 
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFile(file.id);
                                    }}
                                >
                                    מחיקה
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>אין קבצים בתיקייה זו</p>
                    <p>העלי קובץ ראשון כדי להתחיל</p>
                </div>
            )}

            {showUploadModal && (
                <div className="modal-overlay">
                    <div className="upload-modal">
                        <div className="modal-header">
                            <h3>העלאת קובץ ל{currentFolder?.name}</h3>
                            <button 
                                className="close-btn"
                                onClick={() => setShowUploadModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="upload-content">
                            <input 
                                type="file" 
                                id="file-upload"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className="file-select-btn">
                                {selectedFile 
                                    ? `נבחר: ${selectedFile.name}` 
                                    : 'בחרי קובץ להעלאה'}
                            </label>

                            {uploadError && (
                                <div className="error-message">
                                    {uploadError}
                                </div>
                            )}

                            {uploadProgress > 0 && (
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                    <span className="progress-text">{uploadProgress}%</span>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button 
                                    className="cancel-btn"
                                    onClick={() => setShowUploadModal(false)}
                                >
                                    ביטול
                                </button>
                                <button 
                                    className="upload-submit-btn"
                                    onClick={handleUploadFile}
                                    disabled={!selectedFile || uploadProgress > 0}
                                >
                                    העלאה
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && viewFile && (
                <div className="modal-overlay">
                    <div className="view-modal">
                        <div className="modal-header">
                            <h3>{viewFile.name}</h3>
                            <button 
                                className="close-btn"
                                onClick={closeViewModal}
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
                                onClick={() => downloadFile(viewFile)}
                            >
                                הורדה
                            </button>
                            <button 
                                className="close-view-btn"
                                onClick={closeViewModal}
                            >
                                סגירה
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilesPanel;