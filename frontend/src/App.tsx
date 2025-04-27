"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Blogs } from "./pages/Blogs"
import { Blog } from "./pages/Blog"
import { Publish } from "./pages/Publish"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./context/ToastContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { useTheme } from "./context/ThemeContext"

// Create a client
const queryClient = new QueryClient()

// Custom toaster component that respects theme
const ThemedToaster = () => {
  const { theme } = useTheme()

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
      }}
    />
  )
}

function AppContent() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/publish" element={<Publish />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <ThemedToaster />
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
