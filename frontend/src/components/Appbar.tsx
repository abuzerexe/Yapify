"use client"

import { Link, useNavigate } from "react-router-dom" 
import { Avatar } from "./Avatar"
import { useTheme } from "../context/ThemeContext"
import { useState, useEffect, useRef } from "react" 
import { Menu, PenLine, Moon, Sun, LogOut, User, Settings } from "./Icons" 
import { useToast } from "../context/ToastContext" 
import { ConfirmDialog } from "./ConfirmDialog" 

export const Appbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isNewBlogLoading, setIsNewBlogLoading] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [userMenuRef])

  const handleNewBlogClick = () => {
    setIsNewBlogLoading(true)
    // Simulate loading for demonstration
    setTimeout(() => {
      navigate("/blog/publish")
      setIsNewBlogLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token")
    // Show success toast
    toast("Logged out successfully", "success")
    // Navigate to signin page
    navigate("/signin")
    // Close dialogs
    setShowLogoutConfirm(false)
    setShowUserMenu(false)
  }

  return (
    <>
      <header className="border-b border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/blogs" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Yap
              </span>
              <span className="text-2xl font-light text-gray-700 dark:text-gray-300">ify</span>
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
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                )}

                <button
                  onClick={handleNewBlogClick}
                  disabled={isNewBlogLoading}
                  type="button"
                  className={` cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 ${
                    isNewBlogLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isNewBlogLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <>
                      <PenLine className="h-4 w-4" />
                      New Blog
                    </>
                  )}
                </button>

                <div className="relative" ref={userMenuRef}>
                  <div
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={showUserMenu}
                  >
                    <Avatar size="big" name="Abuzer" />
                  </div>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Abuzer</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">user@example.com</p>
                      </div>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {isMobile && isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-emerald-100 dark:border-emerald-900/30 py-2">
            <div className="max-w-7xl mx-auto px-4 py-2 space-y-2">
              <button
                onClick={handleNewBlogClick}
                disabled={isNewBlogLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 w-full ${
                  isNewBlogLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isNewBlogLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <PenLine className="h-4 w-4" />
                    New Blog
                  </>
                )}
              </button>

              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center gap-3">
                  <Avatar size="big" name="Abuzer" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Abuzer</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {showLogoutConfirm && (
        <ConfirmDialog
          title="Logout Confirmation"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  )
}

