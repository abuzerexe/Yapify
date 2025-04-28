
import type React from "react"

interface ButtonProps {
  label?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  status?: boolean
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  width?:string
}

export const Button = ({
  label,
  onClick,
  status,
  children,
  variant = "primary",
  size = "md",
  className = "",
  width
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200"

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const variantClasses = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100",
    outline:
      "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/30",
  }

  const disabledClasses = "opacity-50 cursor-not-allowed"

  return (
    <button
      onClick={onClick}
      disabled={status}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${status ? disabledClasses : "cursor-pointer"}
        ${className}
        ${width}

      `}
    >
      {children || label}
    </button>
  )
}
