// מודל לתיקייה
export interface Collection {
  id: number;
  name: string;
  description?: string;
  createdDate: string;
  lastUpdatedDate?: string;
  parentCollectionId?: number | null;
  userId: number;
  subCollections?: Collection[];
  materials?: Material[];
  iconType?: number;  
}

// מודל לקובץ
// עדכון ממשק Material להוספת שדה isDeleted
export interface Material {
  id: number
  name: string
  type: string
  size: number
  createdDate: string
  lastUpdatedDate?: string
  collectionID: number
  userId: number
  s3Key: string
  isPublic: boolean
  categoryId?: number
  isDeleted?: boolean // שדה חדש לציון האם הקובץ נמחק (מחיקה רכה)
}


// DTO ליצירת תיקייה
export interface CreateCollectionDto {
  name: string;
  description?: string;
  iconType?: number;
  parentCollectionId?: number | null;
  userId: number | null;
  isPublic: boolean;
 
}

// DTO ליצירת קובץ
export interface MaterialDTO {
  name: string;
  type: string;
  size: number;
  collectionID: number;
  userId: number;
  s3Key: string;
  createdDate: string;
  isPublic?: boolean;
  categoryId?: number;
}