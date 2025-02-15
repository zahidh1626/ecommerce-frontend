"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Product } from "@/types/Product"

interface SavedProductsContextType {
  savedProducts: Product[]
  addSavedProduct: (product: Product) => void
  removeSavedProduct: (productId: number) => void
}

const SavedProductsContext = createContext<SavedProductsContextType | undefined>(undefined)

export const useSavedProducts = () => {
  const context = useContext(SavedProductsContext)
  if (!context) {
    throw new Error("useSavedProducts must be used within a SavedProductsProvider")
  }
  return context
}

export const SavedProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedProducts, setSavedProducts] = useState<Product[]>([])

  useEffect(() => {
    const savedProductIds = JSON.parse(localStorage.getItem("savedProducts") || "[]")
    // In a real application, you would fetch the product details from an API
    // For this example, we'll use some dummy data
    const dummyProducts: Product[] = savedProductIds.map((id: number) => ({
      id,
      name: `Product ${id}`,
      price: 19.99,
      description: "A great product",
      image: `/placeholder.svg?height=200&width=200&text=Product+${id}`,
    }))
    setSavedProducts(dummyProducts)
  }, [])

  const addSavedProduct = (product: Product) => {
    setSavedProducts((prevProducts) => {
      if (!prevProducts.some((p) => p.id === product.id)) {
        const newProducts = [...prevProducts, product]
        localStorage.setItem("savedProducts", JSON.stringify(newProducts.map((p) => p.id)))
        return newProducts
      }
      return prevProducts
    })
  }

  const removeSavedProduct = (productId: number) => {
    setSavedProducts((prevProducts) => {
      const newProducts = prevProducts.filter((p) => p.id !== productId)
      localStorage.setItem("savedProducts", JSON.stringify(newProducts.map((p) => p.id)))
      return newProducts
    })
  }

  return (
    <SavedProductsContext.Provider value={{ savedProducts, addSavedProduct, removeSavedProduct }}>
      {children}
    </SavedProductsContext.Provider>
  )
}

