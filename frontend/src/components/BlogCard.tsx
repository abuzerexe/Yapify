import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import DOMPurify from 'dompurify';

export interface BlogCardProps {
    authorName : string,
    author?:{name?:string},
    createdAt?: string,
    publishedDate : String,
    title : string,
    content : string,
    id : number
}

const BlogContent = ({ content }: { content: string }) => {
    // Sanitize content to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(content);
  
    // Truncate content for preview (first 100 characters) of raw text
    const previewContent = content.slice(0, 100) + (content.length > 100 ? '...' : '');
  
    // Calculate the read time based on word count (rough estimate: 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);
  
    return (
      <div>
        {/* Content Preview (HTML rendered version) */}
        <div className="text-md font-thin pt-4">
          {/* Render HTML preview of the first part of content */}
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent.slice(0, 100) }} />
          {content.length > 100 && <span>...</span>}
        </div>
  
        {/* Estimated Read Time */}
        <div className="text-slate-500 text-sm font-thin pt-4">
          {readTime} min read
        </div>
  
        {/* Render Full Content */}
        {/* <div className="pt-4" dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> */}
      </div>
    );
  };

export const BlogCard = ({authorName,publishedDate,title,content,id}:BlogCardProps) =>{
return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar name={authorName}/>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className="flex justify-center flex-col pl-2 ">
            <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
                {title}
        </div>

        <BlogContent content={content} />
    </div>
    </Link>
)
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

