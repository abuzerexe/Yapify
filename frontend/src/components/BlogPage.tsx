import DOMPurify from "dompurify"
import { Avatar } from "./Avatar"
import { CalendarIcon } from "./Icons"
import type { BlogCardProps } from "./BlogCard"

const BlogContent = ({ blogContent }: { blogContent: string }) => {
  // Sanitize content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(blogContent)

  return (
    <div className="prose prose-emerald dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  )
}

export const BlogPageSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="h-12 w-3/4 mb-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
      <div className="h-6 w-1/4 mb-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
      <div className="space-y-4">
        <div className="h-40 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
        <div className="h-40 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
        <div className="h-40 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
      </div>
    </div>
  )
}

export const BlogPage = ({ blog }: { blog: BlogCardProps }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{blog.title}</h1>
            <div className="flex items-center mt-4 text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <time dateTime={blog.createdAt || blog.publishedDate}>{blog.createdAt || blog.publishedDate}</time>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-0.5 rounded-lg">
            <div className="bg-white dark:bg-gray-900 rounded-md p-8">
              <BlogContent blogContent={blog.content} />
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-0.5 rounded-lg">
            <div className="bg-white dark:bg-gray-900 rounded-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Author</h2>
              <div className="flex items-start gap-4">
                <Avatar size="big" name={blog.author?.name || blog.authorName} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.author?.name || blog.authorName || "Anonymous"}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    Passionate writer sharing insights and stories that inspire and engage readers around the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
