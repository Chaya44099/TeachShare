"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../store"
import {
  ArrowLeft,
  Users,
  Star,
  Sparkles,
  BookOpen,
  Heart,
  Zap,
  Rocket,
  GraduationCap,
  PenTool,
  Award,
  Globe,
} from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // חלקיקים מטורפים
  const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* רקע מטורף עם גרדיאנטים */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-cyan-400/30 to-yellow-400/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,182,193,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,197,253,0.4),transparent_50%)]" />

        {/* חלקיקים צפים */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-white/60 to-pink-300/60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [-30, -150, -30],
              x: [-20, 20, -20],
              rotate: [0, 360, 720],
              scale: [0.3, 1.2, 0.3],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section מטורף */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* לוגו מטורף עם אנימציות */}
            <motion.div
              className="relative mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            >
              <div className="relative mx-auto w-40 h-40">
                {/* זוהר מאחורי הלוגו */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-full blur-2xl opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* הלוגו עצמו */}
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <motion.div
                    className="text-5xl font-black text-white"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    TS
                  </motion.div>
                </motion.div>

                {/* אייקונים מסביב */}
                <motion.div
                  className="absolute -top-6 -right-6"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, -360],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                    rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-10"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-10"
                  animate={{
                    x: [-5, 5, -5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    x: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg">
                    <PenTool className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* כותרת מטורפת */}
            <div className="mb-8">
              <motion.h1
                className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  textShadow: "0 0 30px rgba(255,255,255,0.5)",
                }}
              >
                TEACH SHARE
              </motion.h1>

              <motion.div
                className="text-2xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <motion.span
                  className="inline-block mr-3"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  ✨
                </motion.span>
                <span className="mx-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                  הפלטפורמה הכי מדהימה למורות!
                </span>
                <motion.span
                  className="inline-block ml-3"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🚀
                </motion.span>
              </motion.div>
            </div>

            {/* תיאור מטורף */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              שתפי, גלי וצרי חומרי לימוד עם הקהילה הכי חמה של מורות בישראל!
              <span className="font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                {" "}
                הצטרפי למהפכה החינוכית{" "}
              </span>
              ותחווי חוויית הוראה שלא הכרת! ✨
            </motion.p>

            {/* כפתורים מטורפים */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                className="group relative overflow-hidden px-10 py-5 rounded-full font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(236, 72, 153, 0.3)",
                    "0 10px 40px rgba(236, 72, 153, 0.5)",
                    "0 10px 30px rgba(236, 72, 153, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <div className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Rocket className="w-6 h-6" />
                  </motion.div>
                  <span>{isAuthenticated ? "המשיכי למסע!" : "הצטרפי למהפכה!"}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => navigate("/about")}
                className="group relative overflow-hidden px-10 py-5 rounded-full font-bold text-xl border-3 border-white/50 text-white hover:bg-white hover:text-purple-900 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  <span>גלי את הקסם</span>
                </div>
              </motion.button>
            </motion.div>

            {/* סטטיסטיקות מטורפות */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              {[
                {
                  icon: Users,
                  number: "12,000+",
                  label: "מורות מדהימות",
                  color: "from-pink-400 to-rose-400",
                  bgColor: "bg-white/10",
                },
                {
                  icon: BookOpen,
                  number: "50,000+",
                  label: "חומרים איכותיים",
                  color: "from-cyan-400 to-blue-400",
                  bgColor: "bg-white/10",
                },
                {
                  icon: Award,
                  number: "98%",
                  label: "שביעות רצון",
                  color: "from-yellow-400 to-orange-400",
                  bgColor: "bg-white/10",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div
                    className={`${stat.bgColor} backdrop-blur-xl rounded-3xl p-8 text-center border border-white/30 shadow-2xl`}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} mb-6 shadow-2xl`}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <stat.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.div
                      className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.number}
                    </motion.div>

                    <div className="text-white font-bold text-lg">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section מטורף */}
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,182,193,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              למה אנחנו הכי מדהימות? 🌟
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              גלי את הפיצ'רים הכי חדשניים שיהפכו את ההוראה שלך לחוויה מדהימה!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "קהילה תומכת",
                description: "הצטרפי לקהילה הכי חמה של מורות שתמיד כאן לעזור ולהשתף",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "חומרים איכותיים",
                description: "מאגר עצום של חומרי לימוד מקצועיים שנוצרו על ידי מורות מנוסות",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Globe,
                title: "חיסכון בזמן",
                description: "מצאי בקלות את מה שאת מחפשת וחסכי שעות של הכנה",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* זוהר מאחורי הכרטיס */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-30 group-hover:opacity-75 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />

                {/* הכרטיס */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 h-full shadow-2xl">
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-2xl`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed mb-6">{feature.description}</p>

                  <motion.div
                    className="flex items-center text-cyan-300 font-medium group-hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>גלי עוד</span>
                    <ArrowLeft className="w-4 h-4 ml-2" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section מטורף */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* זוהר מטורף */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-40"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
              <motion.h2
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                מוכנה להצטרף לקסם? ✨
              </motion.h2>

              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {isAuthenticated
                  ? `שלום ${user?.firstName+" "+user?.lastName || "משתמשת יקרה"}, מוכנה להמשיך את ההרפתקה?`
                  : "הצטרפי לאלפי המורות שכבר חיות את החלום עם הקהילה הכי מדהימה!"}
              </p>

              <motion.button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                className="group relative overflow-hidden px-12 py-6 rounded-full font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 20px 40px rgba(236, 72, 153, 0.3)",
                    "0 20px 60px rgba(236, 72, 153, 0.5)",
                    "0 20px 40px rgba(236, 72, 153, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <div className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Star className="w-6 h-6" />
                  </motion.div>
                  <span>{isAuthenticated ? "המשיכי לאזור הקסום!" : "התחילי את המסע המדהים!"}</span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Rocket className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
