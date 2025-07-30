"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingCart } from "lucide-react"
import Image from "next/image"

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

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getCarbonFootprintColor = (footprint?: number) => {
    if (!footprint) return "bg-gray-100 text-gray-600"
    if (footprint < 5) return "carbon-low"
    if (footprint < 10) return "carbon-medium"
    return "carbon-high"
  }

  const getCarbonFootprintLabel = (footprint?: number) => {
    if (!footprint) return "Not calculated"
    if (footprint < 5) return "Low Impact"
    if (footprint < 10) return "Medium Impact"
    return "High Impact"
  }

  // Better product images based on category and name
  const getProductImage = (imageUrl: string, category: string, name: string) => {



    //CHANGE 
    // If we have a specific image URL, use it
    // if (imageUrl && !imageUrl.includes("placeholder.svg")) {
    //   return imageUrl
    // }\




    // Fallback to category-based placeholder images
    if (name.toLowerCase().includes("banana")) {
      return "/banana.png"
    }
    if (name.toLowerCase().includes("milk")) {
      return "/milk.png"
    }
    if (name.toLowerCase().includes("led") || name.toLowerCase().includes("bulb")) {
      return "/led.png"
    }
    if (name.toLowerCase().includes("spinach")) {
      return "/spinach.png"
    }
    if (name.toLowerCase().includes("bread")) {
      return "/bread.png"
    }
    if (name.toLowerCase().includes("detergent") || name.toLowerCase().includes("cleaner")) {
      return "/cleaner.png"
    }
    if (name.toLowerCase().includes("t-shirt") || name.toLowerCase().includes("shirt")) {
      return "/shirt.png"
    }
    if (name.toLowerCase().includes("earbuds") || name.toLowerCase().includes("headphones")) {
      return "/headphones.png"
    }
    if (name.toLowerCase().includes("quinoa")) {
      return "/quinoa.png"
    }

    // Category-based fallbacks
    const categoryImages = {
      "Fresh Produce": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center",
      Dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop&crop=center",
      "Home & Garden": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      Bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center",
      Electronics: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center",
      Clothing: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
      Pantry: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    }

    return (
      categoryImages[category as keyof typeof categoryImages] ||
      `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(category)}`
    )
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="p-3 sm:p-4">
        <div className="aspect-square relative mb-2 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={getProductImage(product.imageUrl, product.category, product.name) || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-600">{product.brand}</p>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 pt-0 flex-1">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <Badge className={`text-xs ${getCarbonFootprintColor(product.carbonFootprint)}`}>
              {product.carbonFootprint
                ? `${product.carbonFootprint.toFixed(1)} kg CO₂e`
                : getCarbonFootprintLabel(product.carbonFootprint)}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button className="w-full walmart-blue hover:bg-blue-700 text-white" onClick={() => onAddToCart?.(product)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}