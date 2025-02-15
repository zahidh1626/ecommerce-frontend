"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/Product"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import FilterBar from "@/components/FilterBar"
import LoadingSpinner from "@/components/LoadingSpinner"
import LoadingProductCard from "@/components/LoadingProductCard"

const PRODUCTS_PER_PAGE = 6

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
    console.error("Error fetching products:", error)
    return { products: [], error: error instanceof Error ? error.message : "An unknown error occurred" }
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<
    "newest" | "price-low-high" | "price-high-low" | "name-a-z" | "name-z-a"
  >("newest")
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

  const sortProducts = (products: Product[]) => {
    switch (sortOption) {
      case "newest":
        return [...products].sort((a, b) => b.id - a.id)
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price)
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price)
      case "name-a-z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      case "name-z-a":
        return [...products].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return products
    }
  }

  const sortedProducts = sortProducts(products)
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handleSort = (option: "newest" | "price-low-high" | "price-high-low" | "name-a-z" | "name-z-a") => {
    setSortOption(option)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Our Products</h1>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      ) : error ? (
        <p className="text-xl text-destructive text-center mb-8">Error: {error}</p>
      ) : products.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
              products
            </p>
            <FilterBar onSort={handleSort} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => <LoadingProductCard key={index} />)
              : currentProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <Pagination
            currentPage={currentPage}
            totalProducts={products.length}
            productsPerPage={PRODUCTS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-xl text-muted-foreground text-center">No products available at the moment.</p>
      )}
    </div>
  )
}

