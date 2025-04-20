

import { Appbar } from "../components/Appbar";
import { BlogPage } from "../components/BlogPage";
// import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/useBlog";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();

    const {isPending, isError, blog, error} = useBlog({ id: id as string });
    console.log(blog)

    if (isPending || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    {/* <Spinner /> */}
                </div>
            </div>
        </div>
    }
    return <div>
        <BlogPage blog={blog.data} />
    </div>
}