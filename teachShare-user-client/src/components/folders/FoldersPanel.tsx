"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchRootFolders,
  selectRootFolders,
  selectCurrentFolder,
  selectBreadcrumbs,
  selectLoading,
} from "../../slices/CollectionSlice"
import type { AppDispatch } from "../../store"
import FoldersList from "./FolderList/FoldersList"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import NewFolderModal from "./NewFolderModal"
import { FolderPlus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"
import { motion } from "framer-motion"

/**
 * FoldersPanel - מיכל מודרני לניווט וניהול תיקיות
 */
const FoldersPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const rootFolders = useSelector(selectRootFolders)
  const currentFolder = useSelector(selectCurrentFolder)
  const breadcrumbs = useSelector(selectBreadcrumbs)
  const loading = useSelector(selectLoading)

  const [showNewFolderModal, setShowNewFolderModal] = useState(false)

  // טעינת תיקיות שורש בעת טעינת הקומפוננט
  useEffect(() => {
    const userString = sessionStorage.getItem("user")

    if (userString) {
      const user = JSON.parse(userString)
      const userId = user.id
      dispatch(fetchRootFolders(userId))
    } else {
      console.log("User not found in sessionStorage.")
    }
  }, [dispatch])

  // קביעת התיקיות להצגה
  const foldersToDisplay = currentFolder ? currentFolder.subCollections || [] : rootFolders || []

  return (
    <div className="flex flex-col h-full">
      <Card className="h-full border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="px-4 py-3 border-b bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
              <motion.div
                animate={{ rotate: loading ? 360 : 0 }}
                transition={{ duration: 2, repeat: loading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                <FolderPlus className="h-5 w-5 text-emerald-600" />
              </motion.div>
              התיקיות שלי
            </CardTitle>
            <Button
              size="sm"
              onClick={() => setShowNewFolderModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              תיקייה חדשה
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-grow overflow-auto">
          {breadcrumbs.length > 0 && <FolderBreadcrumbs breadcrumbs={breadcrumbs} />}

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ) : (
            <FoldersList folders={foldersToDisplay} currentFolder={currentFolder} />
          )}
        </CardContent>
      </Card>

      <NewFolderModal currentFolder={currentFolder} open={showNewFolderModal} onOpenChange={setShowNewFolderModal} />
    </div>
  )
}

export default FoldersPanel
