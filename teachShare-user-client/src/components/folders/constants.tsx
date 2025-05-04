// src/components/folders/constants.ts
import {
    Folder,
    FolderArchive,
    FolderDot,
    FolderGit2,
    FolderHeart,
    FolderInput,
    FolderKanban,
    FolderOpen,
    FolderPlus,
    FolderRoot,
    FolderSync,
    FolderTree,
  } from "lucide-react"
  import { LucideIcon } from "lucide-react"
  
  interface FolderIcon {
    icon: LucideIcon
    name: string
  }
  
  export const folderIcons: FolderIcon[] = [
    { icon: Folder, name: "תיקייה רגילה" },
    { icon: FolderOpen, name: "תיקייה פתוחה" },
    { icon: FolderPlus, name: "תיקייה חדשה" },
    { icon: FolderHeart, name: "תיקייה מועדפת" },
    { icon: FolderArchive, name: "תיקיית ארכיון" },
    { icon: FolderKanban, name: "תיקיית פרויקטים" },
    { icon: FolderInput, name: "תיקיית קלט" },
    { icon: FolderSync, name: "תיקייה מסונכרנת" },
    { icon: FolderTree, name: "תיקיית מבנה" },
    { icon: FolderRoot, name: "תיקיית שורש" },
    { icon: FolderGit2, name: "תיקיית קוד" },
    { icon: FolderDot, name: "תיקייה מיוחדת" },
  ]