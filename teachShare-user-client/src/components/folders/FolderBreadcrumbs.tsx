import React from 'react';
import { useDispatch } from 'react-redux';
import {
    navigateToRoot,
    navigateToFolder
} from '../../slices/CollectionSlice';
import { setCurrentFiles } from '../../slices/MaterialSlice';
import { Collection } from '../../Models/Collection';
import { AppDispatch } from '../../store';

interface FolderBreadcrumbsProps {
    breadcrumbs: Collection[];
}

/**
 * FolderBreadcrumbs - Navigation breadcrumbs for folder hierarchy.
 */
const FolderBreadcrumbs: React.FC<FolderBreadcrumbsProps> = ({ breadcrumbs }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Navigate to root folder
    const handleRootClick = () => {
        dispatch(navigateToRoot());
        dispatch(setCurrentFiles([]));
    };

    // Navigate to specific folder in breadcrumb trail
    const handleBreadcrumbClick = (index: number) => {
        const targetFolder = breadcrumbs[index];
        
        dispatch(navigateToRoot());
        
        for (let i = 0; i <= index; i++) {
            dispatch(navigateToFolder(breadcrumbs[i]));
        }
        
        // Update current files
        if (targetFolder.materials) {
            dispatch(setCurrentFiles(targetFolder.materials));
        } else {
            dispatch(setCurrentFiles([]));
        }
    };

    return (
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
    );
};

export default FolderBreadcrumbs;