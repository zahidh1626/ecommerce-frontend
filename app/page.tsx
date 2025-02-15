"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Product } from "@/types/Product"
import ProductCard from "@/components/ProductCard"
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider"
import LoadingSpinner from "@/components/LoadingSpinner"

// Hardcoded API URL
const API_URL = "/api/products"

async function getProducts(): Promise<{ products: Product[]; error: string | null }> {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const products = await res.json()
    return { products, error: null }
  } catch (error) {
    console.error("Error in getProducts:", error)
    return {
      products: [],
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const { products, error } = await getProducts()
      setProducts(products)
      setError(error)
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Welcome to Our Cool eCommerce Store</h1>

      {isLoading ? (
        <div className="flex flex-col items-center my-12">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-muted-foreground">Loading featured products...</p>
        </div>
      ) : error ? (
        <p className="text-xl text-destructive text-center mb-8">Error: {error}</p>
      ) : products.length > 0 ? (
        <>
          <FeaturedProductsSlider products={products} />

        </>
      ) : (
        <p className="text-xl text-muted-foreground text-center mb-8">No products available at the moment.</p>
      )}

      <div className="text-center mt-8">
        <Link
          href="/products"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors inline-block"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}

