export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string; // Date as ISO string
    lastLogin?: string | null;
    profileImage?: string | null;
  }
  