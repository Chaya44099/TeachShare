// src/components/files/FileList.tsx
import React from 'react';
import { Material } from '../../Models/Collection';
import FileListItem from './FileListItem';

interface FileListProps {
    files: Material[];
    onViewFile: (file: Material) => void;
}

/**
 * FileList - Displays a grid of files in the current folder.
 */
const FileList: React.FC<FileListProps> = ({ files, onViewFile }) => {
    return (
        <div className="files-grid">
            {files.map((file) => (
                <FileListItem 
                    key={file.id} 
                    file={file} 
                    onViewFile={onViewFile}
                />
            ))}
        </div>
    );
};

export default FileList;