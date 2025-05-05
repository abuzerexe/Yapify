import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useBlog = ({id}:{id:string}) =>{
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['blog',id],
        queryFn : async ()=>{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
            return response.data;
        }
    })

    return {
        isPending,
        isError,
        blog : data,
        error
    }
}