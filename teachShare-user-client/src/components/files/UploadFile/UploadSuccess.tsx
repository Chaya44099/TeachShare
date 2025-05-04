import React from "react"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export const UploadSuccess: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-emerald-50 text-emerald-700 p-3 rounded-md flex items-center gap-2"
    >
      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
      <span>הקובץ הועלה בהצלחה!</span>
    </motion.div>
  )
}