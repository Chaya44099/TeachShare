// src/components/files/UploadFileModal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    uploadFile,
    selectUploadProgress,
    clearUploadProgress
} from '../../slices/MaterialSlice';
import { AppDispatch } from '../../store';
import { Folder } from '../../Models/Collection';

interface UploadFileModalProps {
    currentFolder: Folder;
    onClose: () => void;
}

/**
 * UploadFileModal - Modal for uploading files to a folder
 */
const UploadFileModal: React.FC<UploadFileModalProps> = ({ currentFolder, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const uploadProgress = useSelector(selectUploadProgress);
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

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
            onClose();
        } catch (error) {
            console.error('שגיאה בהעלאת קובץ:', error);
            setUploadError('שגיאה בהעלאת הקובץ. אנא נסי שנית.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="upload-modal">
                <div className="modal-header">
                    <h3>העלאת קובץ ל{currentFolder.name}</h3>
                    <button 
                        className="close-btn"
                        onClick={onClose}
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
                            onClick={onClose}
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
    );
};

export default UploadFileModal;