import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectCurrentFolder 
} from '../../slices/CollectionSlice';
import { 
    fetchMaterialsByFolder, 
    selectCurrentFiles,
    selectMaterialLoading
} from '../../slices/MaterialSlice';
import { AppDispatch } from '../../store';
import { Material } from '../../Models/Collection';
import FileList from './FileList';
import UploadFileModal from './UploadFileModal';
import ViewFileModal from './ViewFileModal';
import '../styles/FilesPanel.css';

/**
 * FilesPanel - Main container for file management functionality.
 */
const FilesPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentFolder = useSelector(selectCurrentFolder);
    const currentFiles = useSelector(selectCurrentFiles);
    const isLoading = useSelector(selectMaterialLoading);
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [viewFile, setViewFile] = useState<Material | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Load files when current folder changes
    useEffect(() => {
        if (currentFolder?.id) {
            dispatch(fetchMaterialsByFolder(currentFolder.id));
        }
    }, [currentFolder?.id, dispatch]);

    // Open file viewer modal
    const handleViewFile = (file: Material) => {
        setViewFile(file);
        setShowViewModal(true);
    };

    // Close file viewer modal
    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setViewFile(null);
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
                <FileList 
                    files={currentFiles}
                    onViewFile={handleViewFile}
                />
            ) : (
                <div className="empty-state">
                    <p>אין קבצים בתיקייה זו</p>
                    <p>העלי קובץ ראשון כדי להתחיל</p>
                </div>
            )}

            {showUploadModal && currentFolder && (
                <UploadFileModal 
                    currentFolder={currentFolder}
                    onClose={() => setShowUploadModal(false)}
                />
            )}

            {showViewModal && viewFile && (
                <ViewFileModal 
                    file={viewFile}
                    onClose={handleCloseViewModal}
                />
            )}
        </div>
    );
};

export default FilesPanel;