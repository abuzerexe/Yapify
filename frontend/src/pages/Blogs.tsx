"use client"

import { useEffect, useState } from "react" 
import { Appbar } from "../components/Appbar"
import { BlogCard, type BlogCardProps } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { useToast } from "../context/ToastContext"
import { useLocation } from "react-router-dom" 

export const BlogSkeleton = () => {
  return (
    <div className="border border-emerald-100 dark:border-emerald-900/30 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}

export const Blogs = () => {
  const { isPending, isError, blogs, error } = useBlogs()
  const { toast } = useToast()
  const location = useLocation()
  const [forceLoading, setForceLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) 


    // Check authentication status
    useEffect(() => {
      const token = localStorage.getItem("token")
      setIsAuthenticated(!!token)
    }, [])
    
  useEffect(() => {
    // If we're coming from another page, show skeleton briefly
    if (location.key) {
      setForceLoading(true)
      const timer = setTimeout(() => {
        setForceLoading(false)
      }, 800) // Show skeleton for 800ms
      return () => clearTimeout(timer)
    }
  }, [location.key])

  useEffect(() => {
    if (isError && error) {
      toast(error.message || "Failed to load blog posts. Please try again later.", "error")
    }
  }, [isError, error, toast])

  const isLoading = isPending || forceLoading

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Discover
            </span>{" "}
            Latest Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl md:mx-0 mx-auto">
            Explore thoughtful insights, stories, and ideas shared by our community
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Error Loading Blogs</h2>
            <p className="text-red-600 dark:text-red-400">{error?.message || "Something went wrong"}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs &&
              blogs.map((blog: BlogCardProps) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author?.name || blog.authorName}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.createdAt || blog.publishedDate}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
