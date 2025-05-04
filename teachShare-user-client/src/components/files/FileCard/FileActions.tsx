import React from "react"
import {
  Eye,
  Download,
  Trash2,
  MoreVertical,
} from "lucide-react"
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
  isDeleting 
}) => {
  return (
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
  )
}