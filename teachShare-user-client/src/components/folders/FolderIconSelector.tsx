// src/components/folders/FolderIconSelector.tsx
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { cn } from "../../lib/utils"
import { folderIcons } from "./constants"

interface FolderIconSelectorProps {
  selectedIcon: number
  setSelectedIcon: (index: number) => void
}

const FolderIconSelector: React.FC<FolderIconSelectorProps> = ({ selectedIcon, setSelectedIcon }) => {
  return (
    <div className="grid grid-cols-6 gap-2 mt-2">
      <AnimatePresence>
        {folderIcons.map((folderIcon, index) => {
          const Icon = folderIcon.icon
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn("h-12 w-12 relative", selectedIcon === index ? "border-2 border-emerald-500 bg-emerald-50" : "")}
                      onClick={() => setSelectedIcon(index)}
                    >
                      <Icon className={cn("h-6 w-6", selectedIcon === index ? "text-emerald-500" : "text-gray-600")} />
                      {selectedIcon === index && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p>{folderIcon.name}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default FolderIconSelector