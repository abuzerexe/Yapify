interface AvatarProps {
    name: string
    size?: "small" | "big"
  }
  
  export const Avatar = ({ name, size = "small" }: AvatarProps) => {
    // Generate a consistent color based on the name
    const getColorClass = (name: string) => {
      const colors = [
        "bg-emerald-100 text-emerald-800",
        "bg-teal-100 text-teal-800",
        "bg-cyan-100 text-cyan-800",
        "bg-green-100 text-green-800",
      ]
  
      // Simple hash function to get a consistent index
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
  
      const index = Math.abs(hash) % colors.length
      return colors[index]
    }
  
    const sizeClass = size === "big" ? "h-10 w-10 text-lg" : "h-8 w-8 text-sm"
    const colorClass = getColorClass(name)
    const initials = name.charAt(0).toUpperCase()
  
    return (
      <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-medium`}>
        {initials}
      </div>
    )
  }
  