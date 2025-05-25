"use client"

import React from "react"
import { Eye, Download, Trash2, MoreVertical, Share2, RotateCcw, Edit2 } from "lucide-react"
import type { Material } from "../../../Models/Collection"
import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"

interface FileActionsProps {
  file: Material
  onViewFile: (file: Material) => void
  onDownloadFile: (e: React.MouseEvent) => void
  onDeleteFile: (e: React.MouseEvent) => void
  onRestoreFile?: (e: React.MouseEvent) => void // פונקציה לשחזור קובץ
  onShareFile: (e: React.MouseEvent) => void
  onRenameFile: (e: React.MouseEvent) => void // פונקציה חדשה לשינוי שם קובץ
  isDeleting: boolean
}

/**
 * FileActions - קומפוננטה לכפתורי פעולה על הקובץ
 */
export const FileActions: React.FC<FileActionsProps> = ({
  file,
  onViewFile,
  onDownloadFile,
  onDeleteFile,
  onRestoreFile,
  onShareFile,
  onRenameFile,
  isDeleting,
}) => {
  // בדיקה האם הקובץ נמחק (מחיקה רכה)
  const isDeleted = file.isDeleted === true

  return (
    <>
      {!isDeleted ? (
        // תצוגת כפתורים רגילה לקבצים פעילים
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewFile(file)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>צפייה</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                  onClick={onDownloadFile}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>הורדה</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* הוספת כפתור שינוי שם */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                  onClick={onRenameFile}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>שינוי שם</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${file.isPublic ? "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
                  onClick={onShareFile}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{file.isPublic ? "משותף" : "שיתוף"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onViewFile(file)
                }}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                <span>צפייה</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDownloadFile} className="gap-2">
                <Download className="h-4 w-4" />
                <span>הורדה</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShareFile} className="gap-2">
                <Share2 className="h-4 w-4" />
                <span>שיתוף</span>
              </DropdownMenuItem>
              {/* הוספת אפשרות שינוי שם בתפריט */}
              <DropdownMenuItem onClick={onRenameFile} className="gap-2">
                <Edit2 className="h-4 w-4" />
                <span>שינוי שם</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDeleteFile}
                className="text-red-600 focus:text-red-600 gap-2"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                <span>{isDeleting ? "מוחק..." : "מחיקה"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        // תצוגת כפתורים לקבצים שנמחקו (מחיקה רכה)
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewFile(file)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>צפייה</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                  onClick={onDownloadFile}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>הורדה</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {onRestoreFile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                    onClick={onRestoreFile}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>שחזור</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onViewFile(file)
                }}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                <span>צפייה</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDownloadFile} className="gap-2">
                <Download className="h-4 w-4" />
                <span>הורדה</span>
              </DropdownMenuItem>
              {onRestoreFile && (
                <DropdownMenuItem onClick={onRestoreFile} className="text-amber-600 focus:text-amber-600 gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>שחזור</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  )
}
