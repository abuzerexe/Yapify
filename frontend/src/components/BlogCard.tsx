import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { CalendarIcon, Clock } from "./Icons"
import DOMPurify from "dompurify"

export interface BlogCardProps {
  authorName: string
  author?: { name?: string }
  createdAt?: string
  publishedDate: string
  title: string
  content: string
  id: number
}

const BlogContent = ({ content }: { content: string }) => {
  // Sanitize content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content)

  // Calculate the read time based on word count (rough estimate: 200 words per minute)
  const wordCount = content.split(" ").length
  const readTime = Math.ceil(wordCount / 200)

  return (
    <div className="space-y-2 ">
      <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedContent.slice(0, 150),
          }}
        />
        {content.length > 150 && <span>...</span>}
      </div>
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        {readTime} min read
      </div>
    </div>
  )
}

export const BlogCard = ({ authorName, publishedDate, title, content, id }: BlogCardProps) => {
  const date = `${publishedDate.substring(0,10)} ${publishedDate.substring(12,19)}`
  return (
    <Link to={`/blog/${id}`}>
      <div className=" mb-4 overflow-hidden hover:shadow-md transition-all duration-300 border-2 border-emerald-100 dark:border-emerald-900/30 rounded-lg bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar name={authorName} />
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-gray-800 dark:text-gray-200">{authorName}</span>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700 px-2 py-0.5">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {date}
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
            {title}
          </h2>
          <BlogContent content={content} />
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-4  text-sm text-emerald-700 dark:text-emerald-300">
          Click to read more
        </div>
      </div>
    </Link>
  )
}
