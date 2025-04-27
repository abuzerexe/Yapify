import {  MouseEventHandler } from "react"

interface ButtonInterface {
    label ?: string,
    onClick : MouseEventHandler<HTMLButtonElement>,
    status ?: boolean
}

export const Button = ({label,onClick,status}:ButtonInterface)=>{
    return <button  onClick={onClick} type="button" className={`mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700   ${status?"cursor-not-allowed opacity-50":"cursor-pointer"}} `} disabled={status}> {label}</button>

}