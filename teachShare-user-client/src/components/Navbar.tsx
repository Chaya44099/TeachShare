"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import type { RootState, AppDispatch } from "../store"
import { useNavigate } from "react-router-dom"
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  BookOpen,
  Home,
  Info,
  FolderOpen,
  Settings,
  Bell,
  Heart,
  Share2,
  Award,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    navigate("/")
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }

  return (
    <>
      {/* חלקיקים עפים ברקע */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [-10, 10, -10],
              rotate: [0, 360, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {i % 4 === 0 && <Star className="w-3 h-3 text-yellow-400" />}
            {i % 4 === 1 && <Sparkles className="w-2 h-2 text-pink-400" />}
            {i % 4 === 2 && <Heart className="w-2 h-2 text-red-400" />}
            {i % 4 === 3 && <Zap className="w-3 h-3 text-cyan-400" />}
          </motion.div>
        ))}
      </div>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-pink-500/95 via-purple-600/95 to-cyan-500/95 backdrop-blur-xl shadow-2xl border-b border-white/30"
            : "bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-cyan-500/90 backdrop-blur-lg"
        }`}
        dir="rtl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        {/* אנימציות ברקע הנאב */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo מטורף */}
            <motion.button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-2xl border-2 border-white/50"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <div className="text-xl font-bold">
                    <span className="text-white">T</span>
                    <span className="text-yellow-300">S</span>
                  </div>
                </motion.div>

                {/* אלמנטים מסביב ללוגו */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                    rotate: [360, 180, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-3 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </div>
              <div>
                <motion.h1
                  className="text-xl font-extrabold text-white"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.8)",
                      "0 0 10px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  TEACH SHARE
                </motion.h1>
                <p className="text-xs text-white/90 font-medium">מורות מלמדות מורות ✨</p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { path: "/", label: "דף הבית", icon: Home },
                { path: "/about", label: "אודות", icon: Info },
                { path: "/materials", label: "חומרים", icon: BookOpen },
                ...(isAuthenticated ? [{ path: "/dashboard", label: "האזור האישי", icon: FolderOpen }] : []),
              ].map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="nav-link group relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <item.icon className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 group-hover:w-full transition-all duration-300 rounded-full"
                    whileHover={{ width: "100%" }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Auth/Profile Section */}
            <div className="hidden md:block">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <motion.button
                    className="relative p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bell className="h-5 w-5 text-white/80" />
                    <motion.span
                      className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      3
                    </motion.span>
                  </motion.button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-2xl py-2 px-4 transition-all duration-300 shadow-lg border border-white/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ChevronDown className="w-4 h-4 text-white/60" />
                      <div className="text-left">
                        <p className="font-semibold text-white text-sm">שלום, {user.firstName || "מורה"} ✨</p>
                        <p className="text-xs text-white/70">מורה מדהימה</p>
                      </div>
                      <div className="relative">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 text-white flex items-center justify-center font-bold text-lg border-2 border-white/30"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(255,182,193,0.5)",
                              "0 0 30px rgba(255,255,0,0.7)",
                              "0 0 20px rgba(255,182,193,0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {user.firstName?.charAt(0) }
                          {user.lastName?.charAt(0)}
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                    </motion.button>

                    {isProfileOpen && (
                      <motion.div
                        className="absolute left-0 mt-3 w-80 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 p-6 text-white border-b border-white/20">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <motion.div
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 text-white flex items-center justify-center font-bold text-xl border-3 border-white/50"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                {user.firstName?.charAt(0) }
                                {user.lastName?.charAt(0)}
                              </motion.div>
                              <motion.div
                                className="absolute -bottom-1 -left-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">
                                {user.firstName } {user.lastName}
                              </h3>
                              <p className="text-white/80 text-sm">מורה מדהימה</p>
                              <p className="text-white/60 text-xs">חברה מאז {new Date().toLocaleDateString("he-IL")}</p>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="p-4 bg-white/5">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                              { icon: Share2, value: 25, label: "העלאות", color: "text-pink-400" },
                              { icon: FolderOpen, value: 150, label: "הורדות", color: "text-cyan-400" },
                              { icon: Heart, value: 89, label: "לייקים", color: "text-red-400" },
                            ].map((stat, index) => (
                              <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className={`flex items-center justify-center gap-1 ${stat.color}`}>
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  >
                                    <stat.icon className="w-4 h-4" />
                                  </motion.div>
                                  <motion.span
                                    className="font-bold text-lg"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                                  >
                                    {stat.value}
                                  </motion.span>
                                </div>
                                <p className="text-xs text-white/60">{stat.label}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {[
                            { path: "/dashboard", icon: FolderOpen, label: "האזור האישי", color: "text-pink-400" },
                            { path: "/profile", icon: User, label: "עריכת פרופיל", color: "text-cyan-400" },
                            { path: "/settings", icon: Settings, label: "הגדרות", color: "text-purple-400" },
                            { path: "/achievements", icon: Award, label: "הישגים", color: "text-yellow-400" },
                          ].map((item, index) => (
                            <motion.button
                              key={item.path}
                              onClick={() => handleNavigate(item.path)}
                              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors w-full text-right"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                            >
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 8,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                  delay: index * 0.5,
                                }}
                              >
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                              </motion.div>
                              <span className="font-medium">{item.label}</span>
                            </motion.button>
                          ))}

                          <hr className="my-2 border-white/20" />

                          <motion.button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors w-full text-right"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">התנתקות</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={() => handleNavigate("/auth")}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255,182,193,0.5)",
                      "0 0 30px rgba(255,255,0,0.7)",
                      "0 0 20px rgba(255,182,193,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    <span>התחברות / הרשמה</span>
                  </div>
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 py-4 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="container mx-auto space-y-3">
              {[
                { path: "/", icon: Home, label: "דף הבית" },
                { path: "/about", icon: Info, label: "אודות" },
                { path: "/materials", icon: BookOpen, label: "חומרים" },
                ...(isAuthenticated ? [{ path: "/dashboard", icon: FolderOpen, label: "האזור האישי" }] : []),
              ].map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl w-full text-right transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 0.5 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <span>{item.label}</span>
                </motion.button>
              ))}

              <hr className="my-2 border-white/20" />

              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2">
                    <motion.div
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 text-white flex items-center justify-center font-bold border-2 border-white/30"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        {user.firstName?.charAt(0) }
                        {user.lastName?.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-white/70">מורה מדהימה</p>
                        <div className="flex gap-4 mt-2 text-xs">
                          <span className="text-pink-400">25 העלאות</span>
                          <span className="text-cyan-400">150 הורדות</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full text-right rounded-xl transition-colors"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>התנתקות</span>
                  </motion.button>
                </>
              ) : (
                <div className="px-4">
                  <motion.button
                    onClick={() => handleNavigate("/auth")}
                    className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white w-full py-3 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>התחברות / הרשמה</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

export default Navbar
