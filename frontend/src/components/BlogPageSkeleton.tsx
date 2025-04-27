const BlogPageSkeleton = () => {
    return (
        <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
                    <div className="col-span-8 animate-pulse">
                        {/* Title skeleton */}
                        <div className="text-5xl font-extrabold">
                            <div className="h-14 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                        </div>
                        
                        {/* Date skeleton */}
                        <div className="text-slate-500 pt-2">
                            <div className="h-4 bg-gray-200 rounded-full w-48 mb-6"></div>
                        </div>
                        
                        {/* Blog content skeleton */}
                        <div className="pt-4">
                            <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-4"></div>
                            <div className="h-24 bg-gray-200 rounded-lg w-full mb-6"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                            <div className="h-24 bg-gray-200 rounded-lg w-full mb-4"></div>
                        </div>
                    </div>
                    
                    <div className="col-span-4 animate-pulse">
                        {/* Author section title */}
                        <div className="text-slate-600 text-lg">
                            <div className="h-6 bg-gray-200 rounded-full w-20 mb-4"></div>
                        </div>
                        
                        {/* Author info */}
                        <div className="flex w-full">
                            {/* Avatar skeleton */}
                            <div className="pr-4 flex flex-col justify-center">
                                <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                            </div>
                            
                            {/* Author details */}
                            <div className="flex-1">
                                <div className="text-xl font-bold">
                                    <div className="h-6 bg-gray-200 rounded-full w-36 mb-2"></div>
                                </div>
                                <div className="pt-2 text-slate-500">
                                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded-full w-4/5 mb-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default BlogPageSkeleton;