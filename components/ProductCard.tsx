"use client"

import type { Product } from "@/types/Product"
import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import ProductModal from "./ProductModal"
import { useSavedProducts } from "@/contexts/SavedProductsContext"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { savedProducts, addSavedProduct, removeSavedProduct } = useSavedProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSaved = savedProducts.some((p) => p.id === product.id)

  const toggleSaveForLater = () => {
    if (isSaved) {
      removeSavedProduct(product.id)
      toast.info(`${product.name} removed from saved items`)
    } else {
      addSavedProduct(product)
      toast.success(`${product.name} saved for later`)
    }
  }

  return (
    <div>
      <div className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-48 cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
       
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-75"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              View Details
            </button>
          </div>
          <button
            onClick={toggleSaveForLater}
            className={`mt-4 w-full py-2 rounded-md transition-colors flex items-center justify-center ${
              isSaved ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/90"
            }`}
          >
            <Heart className={`w-5 h-5 mr-2 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save for Later"}
          </button>
        </div>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

