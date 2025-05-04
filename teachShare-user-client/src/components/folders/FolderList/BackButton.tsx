import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "../../../components/ui/button"

interface BackButtonProps {
  onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start gap-2 text-gray-600"
        onClick={onClick}
      >
        <ArrowRight className="h-4 w-4" />
        חזרה לתיקייה הקודמת
      </Button>
    </motion.div>
  )
}