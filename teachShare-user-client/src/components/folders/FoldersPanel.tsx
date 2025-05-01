import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRootFolders,
    selectRootFolders,
    selectCurrentFolder,
    selectBreadcrumbs,
    selectLoading
} from '../../slices/CollectionSlice';
import { AppDispatch } from '../../store';
import FoldersList from './FoldersList';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import NewFolderModal from './NewFolderModal';
import '../styles/FoldersPanel.css';

/**
 * FoldersPanel - Container for folder navigation and management.
 */
const FoldersPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const rootFolders = useSelector(selectRootFolders);
    const currentFolder = useSelector(selectCurrentFolder);
    const breadcrumbs = useSelector(selectBreadcrumbs);
    const loading = useSelector(selectLoading);
    
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);

    // Load root folders on component mount
    useEffect(() => {
        const userString = sessionStorage.getItem('user');

        if (userString) {
            const user = JSON.parse(userString);
            let userId = user.id;
            dispatch(fetchRootFolders(userId));
        } else {
            console.log("User not found in sessionStorage.");
        }
    }, [dispatch]);

    // Determine which folders to display
    const foldersToDisplay = currentFolder ?
        (currentFolder.subCollections || []) :
        (rootFolders || []);

    return (
        <div className="folders-panel">
            <div className="folders-header">
                <h3>התיקיות שלי</h3>
                <button
                    className="new-folder-btn"
                    onClick={() => setShowNewFolderModal(true)}
                >
                    + תיקייה חדשה
                </button>
            </div>

            {breadcrumbs.length > 0 && (
                <FolderBreadcrumbs breadcrumbs={breadcrumbs} />
            )}

            {loading ? (
                <div className="loading">טוען תיקיות...</div>
            ) : (
                <FoldersList 
                    folders={foldersToDisplay} 
                    currentFolder={currentFolder}
                />
            )}

            {showNewFolderModal && (
                <NewFolderModal 
                    currentFolder={currentFolder}
                    onClose={() => setShowNewFolderModal(false)}
                />
            )}
        </div>
    );
};

export default FoldersPanel;