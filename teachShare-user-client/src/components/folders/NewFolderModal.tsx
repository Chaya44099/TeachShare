import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFolder } from '../../slices/CollectionSlice';
import { CreateCollectionDto } from '../../Models/Collection';
import { AppDispatch } from '../../store';

interface NewFolderModalProps {
    currentFolder: any;
    onClose: () => void;
}

/**
 * NewFolderModal - Modal for creating a new folder.
 */
const NewFolderModal: React.FC<NewFolderModalProps> = ({ currentFolder, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderDescription, setNewFolderDescription] = useState('');

    // Create a new folder
    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            const userString = sessionStorage.getItem('user');
            let userId = null;

            if (userString) {
                const user = JSON.parse(userString);
                userId = user.id;
            }

            const newFolder: CreateCollectionDto = {
                name: newFolderName,
                description: newFolderDescription || undefined,
                parentCollectionId: currentFolder?.id || null,
                userId: userId,
                isPublic: false
            };

            dispatch(createFolder(newFolder));
            setNewFolderName('');
            setNewFolderDescription('');
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal small-modal">
                <div className="modal-header">
                    <h3>יצירת תיקייה חדשה</h3>
                    <button
                        className="close-modal-btn"
                        onClick={onClose}
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
                    <button type="button" onClick={onClose}>ביטול</button>
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
    );
};

export default NewFolderModal;