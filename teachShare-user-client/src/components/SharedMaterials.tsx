"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Book, FileText, Search, ChevronRight, Download, Eye } from "lucide-react"
import { fetchCategories, selectCategories, selectCategoriesLoading } from "../slices/CategoriesSlice"
import type { AppDispatch } from "../store"
import {
  selectMaterialLoading,
  selectCurrentFiles,
  setCurrentFiles,
  downloadFile,
  getViewFileUrl,
} from "../slices/MaterialSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { Material } from "../Models/Collection"

export const fetchMaterialsByCategory = createAsyncThunk("material/fetchByCategory", async (categoryId: number) => {
  const response = await axios.get(`http://localhost:5103/api/material/by-category/${categoryId}`)
  return response.data as Material[]
})

const SharedMaterials: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector(selectCategories)
  const categoriesLoading = useSelector(selectCategoriesLoading)
  const materials = useSelector(selectCurrentFiles)
  const materialsLoading = useSelector(selectMaterialLoading)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingFile, setViewingFile] = useState<{ url: string; name: string } | null>(null)

  // סטייט לסיכום
  const [summary, setSummary] = useState<string | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsError, setQuestionsError] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchMaterialsByCategory(selectedCategory))
        .unwrap()
        .then((materials) => {
          dispatch(setCurrentFiles(materials))
          // איפוס סיכום כשמשנים קטגוריה
          setSummary(null)
          setSummaryError(null)
          setQuestions(null)
          setQuestionsError(null)
        })
    }
  }, [dispatch, selectedCategory])

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDownload = async (s3Key: string, fileName: string) => {
    try {
      const downloadUrl = await dispatch(downloadFile(s3Key)).unwrap()
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("שגיאה בהורדת הקובץ:", error)
    }
  }
  const handleGenerateQuestions = async (s3Key: string) => {
    setQuestions(null)
    setQuestionsError(null)
    setQuestionsLoading(true)
    try {
      const presignedUrl = await dispatch(getViewFileUrl(s3Key)).unwrap()
      const response = await axios.post("http://localhost:5000/generate-questions", {
        presigned_url: presignedUrl,
      })
      console.log("response", response);
      
      setQuestions(response.data.questions || [])
      console.log("questions", questions);
      
    } catch (error) {
      console.error("שגיאה בשליפת שאלות:", error)
      setQuestionsError("התרחשה שגיאה בשליפת שאלות")
    } finally {
      setQuestionsLoading(false)
    }
  }

  const handleViewFile = async (s3Key: string, fileName: string) => {
    try {
      const viewUrl = await dispatch(getViewFileUrl(s3Key)).unwrap()
      setViewingFile({ url: viewUrl, name: fileName })
    } catch (error) {
      console.error("שגיאה בצפייה בקובץ:", error)
    }
  }

  const closeFileViewer = () => {
    setViewingFile(null)
  }

  // פונקציה לסיכום קובץ
  const handleSummarize = async (s3Key: string) => {
    setSummary(null)
    setSummaryError(null)
    setSummaryLoading(true)
    try {
      const presignedUrl = await dispatch(getViewFileUrl(s3Key)).unwrap()
      const response = await axios.post("http://localhost:5000/summarize-file", {
        presigned_url: presignedUrl,
      })
      setSummary(response.data.summary)
    } catch (error) {
      console.error("שגיאה בסיכום הקובץ:", error)
      setSummaryError("התרחשה שגיאה בסיכום הקובץ")
    } finally {
      setSummaryLoading(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5F9] to-[#E8EAF2] p-6">
      <div className="container mx-auto">
        <header className="mb-12 text-center">
          <motion.h1
            className="text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            פורום חומרי לימוד משותפים
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            מאגר חומרי לימוד שיתופי למורות ואנשי חינוך
          </motion.p>
        </header>

        {!selectedCategory ? (
          <>
            <motion.h2
              className="text-2xl font-semibold text-center mb-8 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              בחרי קטגוריה
            </motion.h2>

            {categoriesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={item}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="h-32 bg-gradient-to-r from-primary to-tertiary flex items-center justify-center">
                      <Book className="text-white h-16 w-16" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                      <div className="flex items-center justify-center text-primary">
                        <span className="mr-1">לצפייה בקבצים</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
                onClick={() => setSelectedCategory(null)}
              >
                <ChevronRight className="h-5 w-5 ml-1 rotate-180" />
                <span>חזרה לקטגוריות</span>
              </motion.button>

              <motion.div
                className="relative max-w-md w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש קבצים..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
            </div>

            <motion.h2
              className="text-2xl font-semibold mb-6 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {categories.find((c) => c.id === selectedCategory)?.name || "קבצים"}
            </motion.h2>

            {materialsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 rounded-xl bg-gray-200 animate-pulse"></div>
                ))}
              </div>
            ) : filteredMaterials.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredMaterials.map((material) => (
                  <motion.div
                    key={material.id}
                    variants={item}
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
                  >
                    <div className="flex items-center mb-4">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-lg font-semibold text-gray-800">{material.name}</h3>
                    </div>
                    <div className="flex justify-between mt-auto">
                      <button
                        onClick={() => handleDownload(material.s3Key, material.name)}
                        className="flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                        <span>הורדה</span>
                      </button>

                      <button
                        onClick={() => handleViewFile(material.s3Key, material.name)}
                        className="flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                        <span>צפייה</span>
                      </button>
                      <button
                        onClick={() => handleGenerateQuestions(material.s3Key)}
                        className="flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                        disabled={questionsLoading}
                      >
                        <Book className="h-5 w-5" />
                        <span>{questionsLoading ? "טוען שאלות..." : "שאלות"}</span>
                      </button>

                      <button
                        onClick={() => handleSummarize(material.s3Key)}
                        className="flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                        disabled={summaryLoading}
                      >
                        <Book className="h-5 w-5" />
                        <span>{summaryLoading ? "מסכם..." : "סיכום קובץ"}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-600">לא נמצאו קבצים מתאימים.</p>
            )}

            {/* הצגת הצופה בקובץ */}
            {viewingFile && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-full p-4 overflow-auto relative">
                  <button
                    onClick={closeFileViewer}
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
                    aria-label="סגור"
                  >
                    &times;
                  </button>
                  <iframe
                    src={viewingFile.url}
                    title={viewingFile.name}
                    className="w-full h-[80vh]"
                  />
                </div>
              </div>
            )}

            {/* הצגת סיכום */}
            {summaryLoading && (
              <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-3xl mx-auto text-center">
                טוען סיכום...
              </div>
            )}

            {summaryError && (
              <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg max-w-3xl mx-auto text-center">
                {summaryError}
              </div>
            )}

            {summary && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow max-w-3xl mx-auto whitespace-pre-wrap text-gray-800">
                <h3 className="text-xl font-bold mb-4 text-primary">סיכום הקובץ:</h3>
                <p>{summary}</p>
              </div>
            )}
            {/* הצגת שאלות */}
            {questionsLoading && (
              <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg max-w-3xl mx-auto text-center">
                טוען שאלות...
              </div>
            )}

            {questionsError && (
              <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg max-w-3xl mx-auto text-center">
                {questionsError}
              </div>
            )}

{Array.isArray(questions) && (
  <div className="mt-6 p-6 bg-white rounded-lg shadow max-w-3xl mx-auto text-gray-800">
    <h3 className="text-xl font-bold mb-4 text-primary">שאלות על הקובץ:</h3>
    <ul className="list-disc pl-6 space-y-2">
      {questions.map((q, index) => (
        <li key={index}>{q}</li>
      ))}
    </ul>
  </div>
)}


          </>
        )}
      </div>
    </div>
  )
}

export default SharedMaterials
