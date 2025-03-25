import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentFolder } from '../slices/CollectionSlice';
import { Material } from '../Models/Collection';
// import './styles/FilesPanel.css';

const FilesPanel: React.FC = () => {
    const currentFolder = useSelector(selectCurrentFolder);

    // פתיחת חלון להעלאת קובץ
    const [showUploadModal, setShowUploadModal] = useState(false);

    // פונקציה להעלאת קובץ (בעתיד תתחבר ל-API אמיתי)
    const uploadFile = (event: React.FormEvent) => {
        event.preventDefault();
        // כאן יבוא הקוד להעלאת קובץ אמיתי לשרת
        alert('הקובץ הועלה בהצלחה!');
        setShowUploadModal(false);
    };

    // פונקציה להצגת גודל הקובץ בפורמט קריא
    const formatFileSize = (bytes: number | undefined) => {
        if (!bytes) return 'לא ידוע';

        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB`;
    };

    // פונקציה להצגת תאריך בפורמט קריא
    const formatDate = (date: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('he-IL');
    };

    // פונקציה להצגת אייקון מתאים לסוג הקובץ
    const getFileIcon = (fileType: string) => {
        switch (fileType.toLowerCase()) {
            case 'pdf': return '📄';
            case 'doc':
            case 'docx': return '📝';
            case 'jpg':
            case 'jpeg':
            case 'png': return '🖼️';
            case 'xls':
            case 'xlsx': return '📊';
            case 'ppt':
            case 'pptx': return '📑';
            default: return '📄';
        }
    };

return (
    <div className="files-panel">
        <div className="files-header">
            <h3>{currentFolder ? `קבצים בתיקייה "${currentFolder.name}"` : 'בחרי תיקייה'}</h3>
            <button
                className="upload-btn"
                onClick={() => setShowUploadModal(true)}
                disabled={!currentFolder}
            >
                + העלאת קובץ
            </button>
        </div>

        {!currentFolder ? (
            <div className="empty-state">
                <p>בחרי תיקייה כדי לצפות בקבצים</p>
            </div>
        ) : (currentFolder.materials && currentFolder.materials.length === 0 ? (
            <div className="empty-folder">
                <p>אין קבצים בתיקייה זו</p>
                <button
                    className="upload-btn-secondary"
                    onClick={() => setShowUploadModal(true)}
                >
                    העלאת קובץ ראשון
                </button>
            </div>
        ) : (
            <div className="files-grid">
                {currentFolder.materials?.map(file => (
                    <div key={file.id} className="file-card">
                        <div className="file-type-icon">
                            {getFileIcon(file.type)}
                        </div>
                        <div className="file-info">
                            <h4 className="file-name">{file.name}</h4>
                            <div className="file-meta">
                                <span>{file.type.toUpperCase()}</span>
                                <span>{formatFileSize(file.size)}</span>
                                <span>{formatDate(file.createdDate)}</span>
                            </div>
                        </div>
                        <div className="file-actions">
                            <button className="file-action-btn">הורדה</button>
                            <button className="file-action-btn share-btn">שיתוף</button>
                        </div>
                    </div>
                ))}
            </div>
        ))}

        {/* מודל להעלאת קובץ */}
        {showUploadModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h3>העלאת קובץ ל{currentFolder?.name}</h3>
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowUploadModal(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={uploadFile} className="upload-form">
                        <div className="form-group">
                            <label htmlFor="file">בחרי קובץ להעלאה</label>
                            <input type="file" id="file" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fileName">שם הקובץ (אופציונלי)</label>
                            <input type="text" id="fileName" placeholder="השאירי ריק כדי להשתמש בשם המקורי" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">תיאור קצר (אופציונלי)</label>
                            <textarea id="description" rows={3}></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={() => setShowUploadModal(false)}>ביטול</button>
                            <button type="submit" className="submit-btn">העלאה</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
  
}
export default FilesPanel;