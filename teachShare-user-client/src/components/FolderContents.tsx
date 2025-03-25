import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRootFolders,
    fetchSubFolders,
    createFolder,
    navigateToFolder,
    navigateBack,
    navigateToRoot,
    selectRootFolders,
    selectCurrentFolder,
    selectBreadcrumbs,
    selectLoading,
    selectFolderCache
} from '../slices/CollectionSlice';
import { Collection, CreateCollectionDto } from '../Models/Collection';
import './styles/FoldersPanel.css';
import { AppDispatch } from '../store';

const FoldersPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const rootFolders = useSelector(selectRootFolders);
    const currentFolder = useSelector(selectCurrentFolder);
    const breadcrumbs = useSelector(selectBreadcrumbs);
    const loading = useSelector(selectLoading);
    const folderCache = useSelector(selectFolderCache);
    
    // שם התיקייה החדשה
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderDescription, setNewFolderDescription] = useState('');
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);

    // טעינת תיקיות שורש בעת טעינת הקומפוננטה
    useEffect(() => {
        const userString = sessionStorage.getItem('user');

        // בדוק אם המידע קיים
        if (userString) {
            const user = JSON.parse(userString);
            let userId = user.id;

            dispatch(fetchRootFolders(userId));
        } else {
            console.log("User not found in sessionStorage.");
        }

    }, [dispatch]);

    // מציג את התיקיות המתאימות (שורש או תת-תיקיות של תיקייה נוכחית)
    const foldersToDisplay = currentFolder ?
        (currentFolder.subCollections || []) :
        (rootFolders || []);

    // יצירת תיקייה חדשה
    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            const userString = sessionStorage.getItem('user');
            let userId = null;

            // בדוק אם המידע קיים
            if (userString) {
                const user = JSON.parse(userString);
                userId = user.id;
            }

            const newFolder: CreateCollectionDto = {
                name: newFolderName,
                description: newFolderDescription || undefined,
                parentCollectionId: currentFolder?.id || null,
                userId: userId, // ה-userId שנשלף מ-sessionStorage
                isPublic: false
            };

            dispatch(createFolder(newFolder));
            setNewFolderName('');
            setNewFolderDescription('');
            setShowNewFolderModal(false);
        }
    };

    // מעבר לתיקייה וטעינת תתי-התיקיות שלה
    const handleFolderClick = (folder: Collection) => {
        dispatch(navigateToFolder(folder));

        if (!folderCache[folder.id] && !folder.subCollections?.length) {
            dispatch(fetchSubFolders(folder.id));
        }
    };

    // חזרה לתיקיית האב
    const handleBackClick = () => {
        dispatch(navigateBack());
    };

    // חזרה לשורש
    const handleRootClick = () => {
        dispatch(navigateToRoot());
    };

    // ניווט בפירורי לחם
    const handleBreadcrumbClick = (index: number) => {
        dispatch(navigateToRoot());
        for (let i = 0; i <= index; i++) {
            dispatch(navigateToFolder(breadcrumbs[i]));
        }
    };

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
                <div className="breadcrumbs">
                    <button className="breadcrumb-btn" onClick={handleRootClick}>
                        דף הבית
                    </button>
                    {breadcrumbs.map((folder, index) => (
                        <React.Fragment key={folder.id}>
                            <span className="breadcrumb-separator">{'>'}</span>
                            <button
                                className="breadcrumb-btn"
                                onClick={() => handleBreadcrumbClick(index)}
                                disabled={index === breadcrumbs.length - 1}
                            >
                                {folder.name}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {currentFolder && (
                <button
                    className="back-btn"
                    onClick={handleBackClick}
                >
                    חזרה לתיקייה הקודמת
                </button>
            )}

            {loading ? (
                <div className="loading">טוען תיקיות...</div>
            ) : (
                <>
                    {foldersToDisplay.length === 0 ? (
                        <div className="empty-state">
                            <p>אין תיקיות {currentFolder ? 'בתיקייה זו' : ''}</p>
                            <p>לחצי על "תיקייה חדשה" כדי ליצור תיקייה</p>
                        </div>
                    ) : (
                        <ul className="folders-list">
                            {foldersToDisplay.map(folder => (
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
            )}

            {showNewFolderModal && (
                <div className="modal-overlay">
                    <div className="modal small-modal">
                        <div className="modal-header">
                            <h3>יצירת תיקייה חדשה</h3>
                            <button
                                className="close-modal-btn"
                                onClick={() => setShowNewFolderModal(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="folderName">שם התיקייה</label>
                            <input
                                type="text"
                                id="folderName"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="הזיני שם לתיקייה החדשה"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="folderDescription">תיאור (אופציונלי)</label>
                            <textarea
                                id="folderDescription"
                                value={newFolderDescription}
                                onChange={(e) => setNewFolderDescription(e.target.value)}
                                placeholder="תיאור התיקייה"
                                rows={3}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => setShowNewFolderModal(false)}>ביטול</button>
                            <button
                                className="submit-btn"
                                onClick={handleCreateFolder}
                                disabled={!newFolderName.trim()}
                            >
                                יצירת תיקייה
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoldersPanel;
