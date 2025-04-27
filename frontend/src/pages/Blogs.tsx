import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
// import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
    const { isPending, isError, blogs, error } = useBlogs();

    if (isPending) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    {/* <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton /> */}
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map((blog:any) => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name }
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                    key={blog.id}
                />)}
            </div>
        </div>
    </div>
}
