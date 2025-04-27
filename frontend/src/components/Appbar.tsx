"use client"

import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useTheme } from "../context/ThemeContext"
import { useState, useEffect } from "react"
import { Menu, PenLine, Moon, Sun } from "./Icons"

export const Appbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mark component as mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if mobile on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <header className="border-b border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/blogs" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Yap
            </span>
            <span className=" text-2xl font-light text-gray-700 dark:text-gray-300">ify</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              <Link to="/blog/publish">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200"
                >
                  <PenLine className="h-4 w-4" />
                  New Blog
                </button>
              </Link>

              <Avatar size="big" name="Abuzer" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-emerald-100 dark:border-emerald-900/30 py-2">
          <div className="max-w-7xl mx-auto px-4 py-2 space-y-2">
            <Link
              to="/blog/publish"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <PenLine className="h-4 w-4" />
              New Blog
            </Link>

            <div className="flex items-center gap-3 px-2 py-3">
              <Avatar size="big" name="Abuzer" />
              <span className="font-medium text-gray-900 dark:text-gray-100">Abuzer</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
