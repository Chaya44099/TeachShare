import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSubFolders,
    navigateToFolder,
    navigateBack,
    selectFolderCache
} from '../../slices/CollectionSlice';
import { setCurrentFiles } from '../../slices/MaterialSlice';
import { Collection } from '../../Models/Collection';
import { AppDispatch } from '../../store';

interface FoldersListProps {
    folders: Collection[];
    currentFolder: Collection | null;
}

/**
 * FoldersList - Displays a list of folders and handles folder navigation.
 */
const FoldersList: React.FC<FoldersListProps> = ({ folders, currentFolder }) => {
    const dispatch = useDispatch<AppDispatch>();
    const folderCache = useSelector(selectFolderCache);
    
    // Handle folder click - navigate to folder and load its contents
    const handleFolderClick = (folder: Collection) => {
        dispatch(navigateToFolder(folder));

        if (!folderCache[folder.id] && !folder.subCollections?.length) {
            dispatch(fetchSubFolders(folder.id));
        }
        
        // Update current files if folder has materials
        if (folder.materials && folder.materials.length > 0) {
            dispatch(setCurrentFiles(folder.materials));
        } else {
            dispatch(setCurrentFiles([]));
        }
    };

    // Go back to parent folder
    const handleBackClick = () => {
        dispatch(navigateBack());
    };

    return (
        <>
            {currentFolder && (
                <button
                    className="back-btn"
                    onClick={handleBackClick}
                >
                    חזרה לתיקייה הקודמת
                </button>
            )}

            {folders.length === 0 ? (
                <div className="empty-state">
                    <p>אין תיקיות {currentFolder ? 'בתיקייה זו' : ''}</p>
                    <p>לחצי על "תיקייה חדשה" כדי ליצור תיקייה</p>
                </div>
            ) : (
                <ul className="folders-list">
                    {folders.map(folder => (
                        <li
                            key={folder.id}
                            className="folder-item"
                            onClick={() => handleFolderClick(folder)}
                        >
                            <span className="folder-icon">📁</span>
                            <span className="folder-name">{folder.name}</span>
                            <span className="folder-meta">
                                <span className="subfolder-count">
                                    {folder.subCollections ? folder.subCollections.length : 0} תיקיות
                                </span>
                                <span className="file-count">
                                    {folder.materials ? folder.materials.length : 0} קבצים
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default FoldersList;