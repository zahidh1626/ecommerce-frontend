import { NextResponse } from "next/server"

const BACKEND_URI: string = `${process.env.BACKEND_URI}/products/active-products`

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

type ProductResponse = {
  activeProducts: (Product & { _id: string })[]
}

export async function GET() {
  console.log("API route hit: GET /api/products")
  try {
    const response: Response = await fetch(BACKEND_URI)
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const products: ProductResponse = await response.json()
    const productVisits: Record<number, number> = {}

    // Apply dynamic pricing logic
    const today: Date = new Date()
    const isFriday: boolean = today.getDay() === 5

    // Filter out invalid product entries
    const validProducts = products.activeProducts.filter((product) => product.id !== undefined && product.price !== undefined)

    const discountedProducts: Product[] = validProducts.map((product) => {
      let discountedPrice: number = product.price

      if (productVisits[product.id] && productVisits[product.id] > 1) {
        discountedPrice *= 0.9 // 10% discount for repeat visits
      }
      if (isFriday) {
        discountedPrice *= 0.95 // Additional 5% discount on Fridays
      }

      productVisits[product.id] = (productVisits[product.id] || 0) + 1

      return {
        ...product,
        price: Number(discountedPrice.toFixed(2)),
      }
    })

    console.log("Products fetched and processed successfully:", discountedProducts.length)
    return NextResponse.json(discountedProducts, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching products from backend:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
