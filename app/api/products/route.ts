import { NextResponse } from "next/server"
import { getProducts } from "@/lib/database"
import { fetchTargetProductsByCategory } from "@/lib/scraper"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"

    // Get products from database
    let products = await getProducts()

    // If no products in database, fetch from Target API
    if (products.length === 0) {
      console.log("No products in database, fetching from Target...")
      const targetProducts = await fetchTargetProductsByCategory(category)

      // Convert to our product format
      products = targetProducts.map((product, index) => ({
        id: `target-${index + 1}`,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        walmartUrl: product.walmartUrl,
        category: product.category,
        brand: product.brand,
        carbonFootprint: Math.random() * 15 + 1, // Random carbon footprint for demo
        createdAt: new Date().toISOString(),
      }))
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
