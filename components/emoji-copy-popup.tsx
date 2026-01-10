"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface EmojiCopyPopupProps {
  emoji: string
  name: string
  position: { x: number; y: number }
}

export function EmojiCopyPopup({ emoji, name, position }: EmojiCopyPopupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`
          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          rounded-3xl shadow-2xl p-8 
          transition-all duration-300 ease-out
          ${mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
        style={{
          minWidth: "280px",
          maxWidth: "320px",
        }}
      >
        {/* Decorative hearts */}
        <div className="absolute -top-8 left-4 flex gap-2">
          <span className="text-4xl animate-bounce" style={{ animationDelay: "0ms" }}>
            💖
          </span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: "100ms" }}>
            💗
          </span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: "200ms" }}>
            💕
          </span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: "300ms" }}>
            💓
          </span>
        </div>

        <div className="absolute -top-6 -left-6">
          <span className="text-3xl animate-pulse">💜</span>
        </div>

        {/* Card content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-4 border-indigo-400 dark:border-indigo-600 relative">
          <div className="text-center">
            <div className="text-7xl mb-4">{emoji}</div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wide">Copied</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 capitalize">
              {name.replace(/-/g, " ")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">emoji power at your fingertips!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
