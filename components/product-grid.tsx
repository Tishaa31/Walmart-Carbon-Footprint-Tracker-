"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { RefreshCw } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  walmartUrl: string
  category: string
  brand: string
  carbonFootprint?: number
  createdAt: string
}

interface ProductGridProps {
  onAddToCart?: (product: Product) => void
  category?: string
}

export function ProductGrid({ onAddToCart, category = "all" }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?category=${category}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPageTitle = () => {
    switch (category) {
      case "grocery":
        return "Fresh Groceries"
      case "electronics":
        return "Electronics & Tech"
      case "clothing":
        return "Fashion & Clothing"
      case "home-garden":
        return "Home & Garden"
      case "deals":
        return "Today's Best Deals"
      case "pharmacy":
        return "Health & Pharmacy"
      case "trending":
        return "Trending Products"
      case "walmart-plus":
        return "Walmart+ Exclusive"
      default:
        return "All Products"
    }
  }

  const getPageDescription = () => {
    switch (category) {
      case "grocery":
        return "Fresh produce, pantry essentials, and organic options with carbon footprint tracking"
      case "electronics":
        return "Latest tech gadgets and electronics with energy efficiency ratings"
      case "clothing":
        return "Fashion and apparel from sustainable and eco-friendly brands"
      case "home-garden":
        return "Home improvement and garden supplies with environmental impact data"
      case "deals":
        return "Best deals on eco-friendly products with carbon savings"
      case "pharmacy":
        return "Health and wellness products with sustainable packaging"
      case "trending":
        return "Popular products with the lowest carbon footprints"
      case "walmart-plus":
        return "Exclusive sustainable products for Walmart+ members"
      default:
        return "Discover products with transparent carbon footprints and earn GreenPoints for eco-friendly choices"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-walmart-blue" />
      </div>
    )
  }

  // Filter products based on category
  const filteredProducts = products.filter((product) => {
    if (category === "all" || category === "home") return true
    if (category === "grocery") return ["Fresh Produce", "Dairy", "Pantry", "Bakery"].includes(product.category)
    if (category === "electronics") return product.category === "Electronics"
    if (category === "clothing") return product.category === "Clothing"
    if (category === "home-garden") return product.category === "Home & Garden"
    if (category === "deals") return product.price < 10 // Mock deals logic
    if (category === "pharmacy") return product.category === "Health & Wellness"
    if (category === "trending") return product.carbonFootprint && product.carbonFootprint < 5
    if (category === "walmart-plus") return product.brand === "Great Value"
    return true
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">{getPageDescription()}</p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Showing {filteredProducts.length} products</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found in this category</p>
          <p className="text-sm text-gray-400">Try browsing other categories or check back later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}
