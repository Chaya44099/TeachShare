"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Heart, Star, BookOpen, GraduationCap, Wand2 } from "lucide-react"

import { loginUser, registerUser } from "../slices/authSlice"
import type { AppDispatch, RootState } from "../store"

const AuthForm: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // אנימציה של חלקיקים צפים
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  // מעבר לדשבורד אם המשתמש כבר מחובר
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isLogin) {
        // התחברות
        const resultAction = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        )

        if (loginUser.fulfilled.match(resultAction)) {
          // הצלחה - המשתמש יועבר אוטומטית לדשבורד דרך useEffect
        } else {
          setError("שגיאה בהתחברות. אנא בדק את הפרטים ונסה שוב.")
        }
      } else {
        // בדיקת תאימות סיסמאות
        if (formData.password !== formData.confirmPassword) {
          setError("הסיסמאות אינן תואמות")
          setIsLoading(false)
          return
        }

        // בדיקה שכל השדות הנדרשים מלאים
        if (!formData.firstName || !formData.lastName) {
          setError("אנא מלא את כל השדות הנדרשים")
          setIsLoading(false)
          return
        }

        // הרשמה
        const resultAction = await dispatch(
          registerUser({
            // username: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        )

        if (registerUser.fulfilled.match(resultAction)) {
          // הצלחה - המשתמש יועבר אוטומטית לדשבורד דרך useEffect
        } else {
          setError("שגיאה בהרשמה. אנא נסה שוב.")
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setError("שגיאה בחיבור לשרת. אנא נסה שוב מאוחר יותר.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // ניקוי שגיאות כשהמשתמש מתחיל להקליד
    if (error) {
      setError("")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* רקע גרדיאנט מדהים */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-cyan-400/30 to-yellow-400/30"></div>
      </div>

      {/* חלקיקים צפים */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 bg-white/40 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* אלמנטים גרפיים צפים */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* תוכן ראשי */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* כרטיס הטופס */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            {/* זוהר מאחורי הכרטיס */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-3xl blur opacity-75 animate-pulse"></div>

            {/* הכרטיס עצמו */}
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              {/* Header מדהים */}
              <div className="relative p-8 text-center">
                {/* אייקון מרכזי עם אנימציה */}
                <motion.div
                  className="relative mx-auto mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.6 }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center shadow-2xl relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <GraduationCap className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* כוכבים מסביב */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Star className="w-6 h-6 text-yellow-300" />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-1 -left-2"
                      animate={{
                        y: [-5, 5, -5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Heart className="w-5 h-5 text-pink-300" />
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 -left-6"
                      animate={{
                        x: [-5, 5, -5],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <BookOpen className="w-5 h-5 text-emerald-300" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isLogin ? "ברוכה הבאה חזרה! ✨" : "הצטרפי לקהילה! 🌟"}
                </motion.h1>
                <motion.p
                  className="text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {isLogin ? "התחברי לאזור הקסום שלך" : "צרי חשבון ותתחילי את המסע"}
                </motion.p>
              </div>

              {/* הצגת שגיאות */}
              {error && (
                <motion.div
                  className="mx-8 mb-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-200 text-center text-sm">{error}</p>
                </motion.div>
              )}

              {/* הטופס */}
              <div className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="group">
                        <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-yellow-300 transition-colors">
                          שם פרטי
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-yellow-300 transition-colors" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                            placeholder="שם פרטי"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-pink-300 transition-colors">
                          שם משפחה
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-pink-300 transition-colors" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                            placeholder="שם משפחה"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* {!isLogin && (
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-cyan-300 transition-colors">
                        שם משתמש
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-cyan-300 transition-colors" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                          placeholder="שם משתמש"
                          required
                        />
                      </div>
                    </motion.div>
                  )} */}

                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-emerald-300 transition-colors">
                      כתובת אימייל
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-emerald-300 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-purple-300 transition-colors">
                      סיסמה
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-purple-300 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </motion.div>

                  {!isLogin && (
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label className="block text-sm font-medium text-white/90 mb-2 text-right group-hover:text-orange-300 transition-colors">
                        אישור סיסמה
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-hover:text-orange-300 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right transition-all duration-300 hover:bg-white/20"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {isLogin && (
                    <motion.div
                      className="flex justify-between items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <button type="button" className="text-sm text-white/80 hover:text-yellow-300 transition-colors">
                        שכחת סיסמה?
                      </button>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/10 text-emerald-400 focus:ring-emerald-400 focus:ring-offset-0 ml-2"
                        />
                        <span className="text-sm text-white/80">זכור אותי</span>
                      </label>
                    </motion.div>
                  )}

                  {/* כפתור מדהים */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative px-6 py-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 group-hover:bg-black/10 transition-all duration-300">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <span className="text-white font-bold">מעבד קסמים...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3 text-white font-bold text-lg">
                          <Wand2 className="h-5 w-5" />
                          <span>{isLogin ? "התחברות קסומה ✨" : "הצטרפות לקהילה 🌟"}</span>
                          <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                </form>

                {/* החלפה בין התחברות להרשמה */}
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <p className="text-white/80">
                    {isLogin ? "עדיין אין לך חשבון?" : "כבר יש לך חשבון?"}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                        setFormData({
                          firstName: "",
                          lastName: "",
                          // username: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        })
                      }}
                      className="text-yellow-300 font-medium hover:text-yellow-200 transition-colors mr-1 hover:underline"
                    >
                      {isLogin ? "הרשמי כאן 🌟" : "התחברי כאן ✨"}
                    </button>
                  </p>
                </motion.div>

                {/* חזרה לדף הבית */}
                <motion.div
                  className="mt-6 pt-6 border-t border-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors w-full group"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>חזרה לדף הבית</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
