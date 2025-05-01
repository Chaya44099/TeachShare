// src/utils/fileUtils.ts
/**
 * Utility functions for handling files
 */

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * Get appropriate icon for file type
 */
export const getFileIcon = (fileType: string): string => {
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