// מודל לתיקייה
export interface Collection {
  id: number;
  name: string;
  description?: string;
  createdDate: string;
  lastUpdatedDate?: string;
  parentCollectionId?: number | null;
  userId: number;
  isPublic: boolean;
  subCollections?: Collection[];
  materials?: Material[];
}

// מודל לקובץ
export interface Material {
  id: number;
  name: string;
  type: string;
  size: number;
  createdDate: string;
  lastUpdatedDate?: string;
  collectionID: number;
  userId: number;
  awsUrl: string;
  s3Key: string;
}

// DTO ליצירת תיקייה
export interface CreateCollectionDto {
  name: string;
  description?: string;
  parentCollectionId?: number | null;
  userId: number | null;
  isPublic: boolean;
}

// DTO ליצירת קובץ
export interface MaterialDTO {
  id?: number;
  name: string;
  type: string;
  size: number;
  createdDate?: string;
  lastUpdatedDate?: string;
  collectionID: number;
  userId: number;
  awsUrl: string;
  s3Key: string;
}