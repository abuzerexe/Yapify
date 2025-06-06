
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [location.pathname]) 

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Click outside handler for user menu
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
    if (!isAuthenticated) {
      toast("Please sign in to create a new blog post", "info")
      navigate("/signin")
      return
    }

    setIsNewBlogLoading(true)
    // Simulate loading for demonstration
    setTimeout(() => {
      navigate(`/blog/publish?email=${email}&name=${name}`)
      setIsNewBlogLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("token")
    toast("Logged out successfully", "success")
    setIsAuthenticated(false)
    navigate("/signin")
    // Close dialogs
    setShowLogoutConfirm(false)
    setShowUserMenu(false)
  }

  // Render authenticated user actions
  const renderAuthenticatedActions = () => (
    <>
      <button
        onClick={handleNewBlogClick}
        disabled={isNewBlogLoading}
        type="button"
        className={`flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 ${
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
          <Avatar size="big" name={name as string} />
        </div>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{email}</p>
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
    </>
  )

  // Render unauthenticated user actions
  const renderUnauthenticatedActions = () => (
    <div className="flex items-center gap-3">
      <Link to="/signin">
        <button className="px-4 py-2 text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-400 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
          Sign In
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors">
          Sign Up
        </button>
      </Link>
    </div>
  )

  // Render mobile menu for authenticated users
  const renderAuthenticatedMobileMenu = () => (
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
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
            <Avatar size="big" name={name as string} />
            <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
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
  )

  // Render mobile menu for unauthenticated users
  const renderUnauthenticatedMobileMenu = () => (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-emerald-100 dark:border-emerald-900/30 py-2">
      <div className="max-w-7xl mx-auto px-4 py-2 space-y-2">
        <Link to="/signin" className="block w-full">
          <button className="w-full px-4 py-2 text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-400 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
            Sign In
          </button>
        </Link>
        <Link to="/signup" className="block w-full">
          <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <header className="border-b border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={`/blogs?email=${email}&name=${name}`} className="flex items-center">
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
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                )}

                {isAuthenticated ? renderAuthenticatedActions() : renderUnauthenticatedActions()}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile &&
          isMenuOpen &&
          (isAuthenticated ? renderAuthenticatedMobileMenu() : renderUnauthenticatedMobileMenu())}
      </header>

      {/* Logout confirmation dialog */}
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
