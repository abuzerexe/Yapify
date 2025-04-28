"use client"

import { useState, useRef, useCallback, useEffect } from "react" 
import { useNavigate, useSearchParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Button } from "../components/Button"
import { Save, Loader } from "../components/Icons"
import axios from "axios"
import Editor from "../components/Editor"
import { useToast } from "../context/ToastContext"

export const PublishSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-emerald-100 dark:border-emerald-900/30">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4 flex justify-end">
          <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const contentRef = useRef("")
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast("Please sign in to create a blog post", "warning")
      navigate("/signin")
      return
    }
    setIsAuthenticated(true)
  }, [navigate])

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");

  // Simulate loading time for the editor
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const handleContentChange = useCallback((newContent: string) => {
    contentRef.current = newContent
  }, [])

  const addBlog = async () => {
    if (!title.trim()) {
      toast("Please enter a title for your blog post", "warning")
      return
    }

    if (!contentRef.current.trim()) {
      toast("Please add some content to your blog post", "warning")
      return
    }

    setIsPublishing(true)
    try {
      const d = new Date()
      const time = d.toISOString();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog`,
        {
          title,
          content: contentRef.current,
          createdAt: time,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      toast("Blog post published successfully!", "success")
      navigate(`/blog/${response.data.id}?email=${email}&name=${name}`)
    } catch (error: any) {
      toast(error.response?.data?.message || "Failed to publish blog post. Please try again.", "error")
      console.error("Error publishing blog:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  if (isLoading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Appbar />
        <PublishSkeleton />
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-emerald-100 dark:border-emerald-900/30">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog Post</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full px-4 py-2 text-lg border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter your blog title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden min-h-[200px]">
                <Editor content={contentRef.current} setContent={handleContentChange} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4 flex justify-end">
            <Button onClick={addBlog} status={isPublishing} className="px-6">
              {isPublishing ? (
                <>
                  <Loader className="mr-2 h-4 w-4" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
