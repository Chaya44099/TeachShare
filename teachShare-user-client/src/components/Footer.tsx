import React from "react"
import { Link } from "react-router-dom"
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-white relative overflow-hidden">
      {/* רקע מטורף */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
        {/* חלקיקים קטנים */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* לוגו וחברה */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-black text-xl">TS</span>
              </div>
              <span className="text-2xl font-black">TEACH SHARE</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              הפלטפורמה המובילה בישראל לשיתוף חומרי לימוד בין מורות. הצטרפי לקהילה הכי תומכת ומעוררת השראה!
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* קישורים מהירים */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              קישורים מהירים
            </h3>
            <ul className="space-y-3">
              {[
                { name: "בית", path: "/" },
                { name: "אודות", path: "/about" },
                { name: "חומרים", path: "/materials" },
                { name: "דשבורד", path: "/dashboard" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* יצירת קשר */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              יצירת קשר
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <Mail className="w-5 h-5 text-pink-400" />
                <span>info@teachshare.co.il</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>03-1234567</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>תל אביב, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        {/* קו הפרדה */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">© 2024 TEACH SHARE. כל הזכויות שמורות.</p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-white/60 text-sm">
              <span>נוצר עם</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>למורות ישראל</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
