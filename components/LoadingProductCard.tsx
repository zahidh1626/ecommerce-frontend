import type React from "react"

const LoadingProductCard: React.FC = () => {
  return (
    <div className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  )
}

export default LoadingProductCard

