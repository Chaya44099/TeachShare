export interface Material {
  id: number;
  name: string;
  type: string;
  size?: number;
  createdDate: Date;
  updatedDate: Date;
  // שדות נוספים לפי הצורך
}

export interface Collection {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  createdDate: Date;
  lastUpdateDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  parentCollectionId?: number | null;
  subCollections: Collection[];
  materials: Material[];
}

// ממשק לשליחת מידע ליצירת תיקייה חדשה
export interface CreateCollectionDto {
  name: string;
  description?: string;
  isPublic?: boolean;
  userId: number;
  parentCollectionId?: number | null;
}