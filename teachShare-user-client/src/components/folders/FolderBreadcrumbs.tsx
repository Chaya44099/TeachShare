import React from "react"
import { useDispatch } from "react-redux"
import { navigateToRoot, navigateToFolder } from "../../slices/CollectionSlice"
import { setCurrentFiles } from "../../slices/MaterialSlice"
import type { Collection } from "../../Models/Collection"
import type { AppDispatch } from "../../store"
import { ChevronLeft, Home, FolderOpen } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { motion } from "framer-motion"

interface FolderBreadcrumbsProps {
  breadcrumbs: Collection[]
}

/**
 * FolderBreadcrumbs - נתיב ניווט מודרני להיררכיית תיקיות
 */
const FolderBreadcrumbs: React.FC<FolderBreadcrumbsProps> = ({ breadcrumbs }) => {
  const dispatch = useDispatch<AppDispatch>()

  // ניווט לתיקיית השורש
  const handleRootClick = () => {
    dispatch(navigateToRoot())
    dispatch(setCurrentFiles([]))
  }

  // ניווט לתיקייה ספציפית בנתיב
  const handleBreadcrumbClick = (index: number) => {
    const targetFolder = breadcrumbs[index]

    dispatch(navigateToRoot())

    for (let i = 0; i <= index; i++) {
      dispatch(navigateToFolder(breadcrumbs[i]))
    }

    // עדכון הקבצים הנוכחיים
    if (targetFolder.materials) {
      dispatch(setCurrentFiles(targetFolder.materials))
    } else {
      dispatch(setCurrentFiles([]))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 backdrop-blur-sm rounded-lg p-2 mb-4 border border-gray-100 shadow-sm"
    >
      <Breadcrumb dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={handleRootClick}
              >
                <Home className="h-3.5 w-3.5 ml-1" />
                <span>ראשי</span>
              </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <BreadcrumbSeparator>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="flex items-center gap-1 font-medium">
                    <FolderOpen className="h-3.5 w-3.5 ml-1 text-emerald-500" />
                    <span>{folder.name}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 hover:bg-emerald-50"
                      onClick={() => handleBreadcrumbClick(index)}
                    >
                      <FolderOpen className="h-3.5 w-3.5 ml-1 text-emerald-500" />
                      <span>{folder.name}</span>
                    </Button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  )
}

export default FolderBreadcrumbs
