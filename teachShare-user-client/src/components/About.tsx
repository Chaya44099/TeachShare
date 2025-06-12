"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  Zap,
  BookOpen,
  Users,
  Award,
  Rocket,
  Crown,
  Gift,
  Target,
  Lightbulb,
  Globe,
  Shield,
  Smile,
} from "lucide-react"

const About: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("user") !== null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* רקע מטורף עם גרדיאנטים */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-cyan-400/30 to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-400/20 via-fuchsia-500/20 to-violet-600/20" />
      </div>

      {/* חלקיקים עפים מטורפים */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, -150, -30],
              x: [-20, 20, -20],
              rotate: [0, 360, 720],
              scale: [0.3, 1.2, 0.3],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {i % 8 === 0 && <Star className="w-4 h-4 text-yellow-300" />}
            {i % 8 === 1 && <Sparkles className="w-3 h-3 text-pink-300" />}
            {i % 8 === 2 && <Heart className="w-3 h-3 text-red-300" />}
            {i % 8 === 3 && <Zap className="w-4 h-4 text-cyan-300" />}
            {i % 8 === 4 && <Crown className="w-3 h-3 text-yellow-400" />}
            {i % 8 === 5 && <Gift className="w-3 h-3 text-purple-300" />}
            {i % 8 === 6 && <Rocket className="w-4 h-4 text-orange-300" />}
            {i % 8 === 7 && <Smile className="w-3 h-3 text-green-300" />}
          </motion.div>
        ))}
      </div>

      {/* תוכן העמוד */}
      <div className="relative z-20 pt-24">
        {/* Hero Section מטורף */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                className="flex justify-center mb-8"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl">
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <BookOpen className="w-16 h-16 text-white" />
                    </motion.div>
                  </div>
                  {/* אלמנטים מסביב */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6 rounded-full bg-white/30 flex items-center justify-center"
                      style={{
                        top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: i * 0.2 },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 },
                      }}
                    >
                      {i % 4 === 0 && <Star className="w-3 h-3 text-yellow-400" />}
                      {i % 4 === 1 && <Heart className="w-3 h-3 text-pink-400" />}
                      {i % 4 === 2 && <Sparkles className="w-3 h-3 text-cyan-400" />}
                      {i % 4 === 3 && <Zap className="w-3 h-3 text-purple-400" />}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-7xl font-bold mb-8 text-white"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,182,193,0.8)",
                    "0 0 60px rgba(147,197,253,0.6)",
                    "0 0 40px rgba(255,182,193,0.8)",
                    "0 0 20px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                אודות TEACH SHARE ✨
              </motion.h1>
              <motion.p
                className="text-2xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                הפלטפורמה השיתופית הכי מדהימה שמחברת בין מורות מכל רחבי הארץ! 🌟
                <br />
                <span className="text-xl text-white/80">כאן הקסם של החינוך מתחיל! 🎭</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="p-8 md:p-12">
                {/* Vision Section */}
                <motion.div
                  className="mb-20"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Target className="w-12 h-12 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-5xl font-bold text-white">החזון הקסום שלנו</h2>
                    <motion.div
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Lightbulb className="w-10 h-10 text-cyan-400" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <motion.p
                        className="text-white/90 text-xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        🌟 TEACH SHARE נוצרה מתוך אמונה שחינוך טוב יותר מתחיל בשיתוף פעולה קסום! המטרה שלנו היא ליצור את
                        הפלטפורמה הכי מדהימה עבור מורות, שתאפשר להן לשתף חומרי לימוד איכותיים, רעיונות חדשניים וידע
                        מקצועי בצורה הכי יפה ומהנה! ✨
                      </motion.p>
                      <motion.p
                        className="text-white/90 text-xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        🚀 אנו מאמינים שכאשר מורות משתפות את המשאבים והניסיון שלהן, כולן יכולות להשתפר, לחסוך זמן יקר
                        ולהתמקד במה שחשוב באמת - החינוך הקסום של הדור הבא! 🌈
                      </motion.p>
                    </div>

                    <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <div className="relative h-80 rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 to-purple-500/40 backdrop-blur-sm z-10 rounded-3xl" />
                        <img
                          src="/placeholder.svg?height=320&width=480"
                          alt="החזון הקסום שלנו"
                          className="w-full h-full object-cover rounded-3xl"
                        />

                        {/* אלמנטים עפים מסביב לתמונה */}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{
                              top: `${10 + Math.random() * 80}%`,
                              left: `${10 + Math.random() * 80}%`,
                            }}
                            animate={{
                              y: [-10, 10, -10],
                              x: [-5, 5, -5],
                              rotate: [0, 360],
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                              duration: 4 + Math.random() * 2,
                              delay: Math.random() * 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
                              {i % 6 === 0 && <Heart className="w-4 h-4 text-pink-400" />}
                              {i % 6 === 1 && <Star className="w-4 h-4 text-yellow-400" />}
                              {i % 6 === 2 && <Sparkles className="w-4 h-4 text-cyan-400" />}
                              {i % 6 === 3 && <Crown className="w-4 h-4 text-purple-400" />}
                              {i % 6 === 4 && <Gift className="w-4 h-4 text-green-400" />}
                              {i % 6 === 5 && <Smile className="w-4 h-4 text-orange-400" />}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* How It Works */}
                <motion.div
                  className="mb-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center gap-4 mb-12">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Rocket className="w-12 h-12 text-orange-400" />
                    </motion.div>
                    <h2 className="text-5xl font-bold text-white text-center">איך הקסם עובד?</h2>
                    <motion.div
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Globe className="w-10 h-10 text-green-400" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        step: "1",
                        title: "הרשמה קסומה ✨",
                        description:
                          "הצטרפי לקהילה הכי מדהימה של מורות בישראל בתהליך פשוט ומהיר! רק כמה קליקים ואת חלק מהקסם!",
                        icon: Users,
                        color: "from-pink-400 to-rose-400",
                        bgColor: "from-pink-500/20 to-rose-500/20",
                      },
                      {
                        step: "2",
                        title: "שיתוף וגילוי 🎭",
                        description: "שתפי את החומרים הקסומים שלך וגלי אוצרות של מורות אחרות! כל יום הפתעות חדשות!",
                        icon: BookOpen,
                        color: "from-cyan-400 to-blue-400",
                        bgColor: "from-cyan-500/20 to-blue-500/20",
                      },
                      {
                        step: "3",
                        title: "הצלחה מדהימה 🏆",
                        description: "חסכי זמן, השתפרי מקצועית והפכי את ההוראה לחוויה מדהימה! התוצאות יפתיעו אותך!",
                        icon: Award,
                        color: "from-yellow-400 to-orange-400",
                        bgColor: "from-yellow-500/20 to-orange-500/20",
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={step.step}
                        className="relative group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -10 }}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${step.bgColor} rounded-3xl backdrop-blur-sm border border-white/30`}
                        />
                        <div className="relative p-8 text-center">
                          {/* Step Number מטורף */}
                          <motion.div
                            className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${step.color} mb-6 shadow-2xl relative`}
                            animate={{
                              rotate: 360,
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                            }}
                          >
                            <span className="text-3xl font-bold text-white">{step.step}</span>

                            {/* אייקונים מסביב */}
                            {Array.from({ length: 6 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                  top: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                                  left: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                                  transform: "translate(-50%, -50%)",
                                }}
                                animate={{
                                  rotate: [0, 360],
                                  scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  rotate: {
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                    delay: i * 0.2,
                                  },
                                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 },
                                }}
                              >
                                <step.icon className="w-4 h-4 text-white" />
                              </motion.div>
                            ))}
                          </motion.div>

                          <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                          <p className="text-white/80 leading-relaxed text-lg">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Features מטורף */}
                <motion.div
                  className="mb-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center gap-4 mb-12">
                    <motion.div
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.4, 1],
                      }}
                      transition={{
                        rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Crown className="w-12 h-12 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-5xl font-bold text-white text-center">הפיצ'רים הקסומים שלנו</h2>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        rotate: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Shield className="w-10 h-10 text-green-400" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "🎨 שיתוף חומרי לימוד איכותיים ומקצועיים",
                      "⚡ מנוע חיפוש מתקדם ומהיר כמו הברק",
                      "👥 קהילה תומכת ומעודדת של מורות מדהימות",
                      "🎭 ממשק משתמש יפה ואינטואיטיבי",
                      "🔒 אבטחת מידע ברמה הגבוהה ביותר",
                      "💝 תמיכה טכנית מקצועית ואדיבה",
                      "🚀 עדכונים שוטפים ופיצ'רים חדשים",
                      "📱 גישה נוחה ממכשירים שונים",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 360],
                          }}
                          transition={{
                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 },
                            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                          }}
                        >
                          <CheckCircle className="h-8 w-8 text-green-400 flex-shrink-0" />
                        </motion.div>
                        <span className="text-white/90 font-medium text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Section מטורף */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative max-w-4xl mx-auto">
                    {/* זוהר מטורף */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-3xl opacity-50" />

                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/30">
                      <motion.div
                        className="flex justify-center mb-8"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                          scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                        }}
                      >
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl">
                            <Rocket className="w-12 h-12 text-white" />
                          </div>
                          {/* כוכבים מסביב */}
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-4 h-4"
                              style={{
                                top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                                left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                                transform: "translate(-50%, -50%)",
                              }}
                              animate={{
                                rotate: [0, 360],
                                scale: [0.5, 1.2, 0.5],
                              }}
                              transition={{
                                rotate: {
                                  duration: 6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                  delay: i * 0.2,
                                },
                                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 },
                              }}
                            >
                              <Star className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.h3
                        className="text-4xl font-bold text-white mb-6"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 40px rgba(255,182,193,0.8)",
                            "0 0 60px rgba(147,197,253,0.6)",
                            "0 0 40px rgba(255,182,193,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        מוכנה להצטרף לקסם? ✨🎭
                      </motion.h3>
                      <p className="text-white/90 mb-8 text-xl leading-relaxed">
                        הצטרפי לאלפי המורות שכבר חיות את החלום עם הקהילה הכי מדהימה!
                        <br />
                        <span className="text-lg text-white/80">הרפתקה חינוכית מחכה לך! 🌟</span>
                      </p>

                      {!isAuthenticated ? (
                        <motion.button
                          onClick={() => navigate("/auth")}
                          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-500 hover:to-yellow-400 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl transition-all duration-500 flex items-center gap-4 mx-auto"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 30px rgba(255,182,193,0.6)",
                              "0 0 50px rgba(255,255,0,0.8)",
                              "0 0 70px rgba(147,197,253,0.6)",
                              "0 0 50px rgba(255,255,0,0.8)",
                              "0 0 30px rgba(255,182,193,0.6)",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Sparkles className="w-6 h-6" />
                          </motion.div>
                          <span>התחילי את המסע הקסום!</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowLeft className="w-6 h-6" />
                          </motion.div>
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => navigate("/dashboard")}
                          className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl transition-all duration-500 flex items-center gap-4 mx-auto"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 30px rgba(34,211,238,0.6)",
                              "0 0 50px rgba(59,130,246,0.8)",
                              "0 0 70px rgba(147,51,234,0.6)",
                              "0 0 50px rgba(59,130,246,0.8)",
                              "0 0 30px rgba(34,211,238,0.6)",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <BookOpen className="w-6 h-6" />
                          </motion.div>
                          <span>המשיכי לאזור הקסום שלך!</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowLeft className="w-6 h-6" />
                          </motion.div>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
