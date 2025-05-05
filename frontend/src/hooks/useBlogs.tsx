import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useBlogs = ()=>{
    const { isPending, isError, data, error } = useQuery({
        queryKey : ['blogs'],
        queryFn : async ()=>{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`)
            return response.data.data
        },
        staleTime : 60 * 1000
    })
    return{
        isPending,
        isError,
        blogs : data,
        error
    }
}