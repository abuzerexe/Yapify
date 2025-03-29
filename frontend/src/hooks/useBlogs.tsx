import { useQuery } from '@tanstack/react-query'

export const useBlogs = ()=>{
    const { isPending, isError, data, error } = useQuery({
        queryKey = ['blogs'],
        queryFn = axios.g
    })
}