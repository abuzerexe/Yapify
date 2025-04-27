"use client"

import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { BlogPage } from "../components/BlogPage"
import { BlogPageSkeleton } from "../components/BlogPage"
import { useBlog } from "../hooks/useBlog"
import { useToast } from "../context/ToastContext"
import { useEffect } from "react"

export const Blog = () => {
  const { id } = useParams()
  const { isPending, isError, blog, error } = useBlog({ id: id as string })
  const { toast } = useToast()

  useEffect(() => {
    if (isError && error) {
      toast(
        error.message || "Failed to load blog post. Please try again later.",
        "error"
      )
    }
  }, [isError, error, toast])

  if (isPending || !blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Appbar />
        <BlogPageSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Appbar />
      <BlogPage blog={blog.data} />
    </div>
  )
}

