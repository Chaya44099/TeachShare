import React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Trash2 } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { cn } from "../../../lib/utils"
import { getFolderIcon } from "./FolderIcon"
import type { Collection } from "../../../Models/Collection"

interface FolderItemProps {
  folder: Collection
  index: number
  onClick: () => void
  onDeleteClick: (e: React.MouseEvent) => void
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder, index, onClick, onDeleteClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Card
        className={cn(
          "overflow-hidden cursor-pointer border-gray-200 hover:border-emerald-200 transition-colors",
          "hover:shadow-sm hover:bg-emerald-50/30",
        )}
        onClick={onClick}
      >
        <CardContent className="p-3 flex items-center justify-between">
          {/* צד ימין: חץ ופח */}
          <div className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5 text-gray-400" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={onDeleteClick}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>מחיקת תיקייה</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* שם התיקייה במרכז */}
          <div className="flex-1 text-center">
            <span className="font-medium text-gray-800">{folder.name}</span>
          </div>

          {/* צד שמאל: אייקון התיקייה */}
          <div className="flex items-center">{getFolderIcon(folder)}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}