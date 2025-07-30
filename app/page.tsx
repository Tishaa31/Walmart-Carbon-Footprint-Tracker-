"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { CustomerHeader } from "@/components/customer-header"
import { AdminHeader } from "@/components/admin-header"
import { ShoppingCart } from "@/components/shopping-cart"
import { ManagerDashboard } from "@/components/manager-dashboard"
import { LoginModal } from "@/components/login-modal"

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

interface CartItem extends Product {
  quantity: number
}

interface User {
  id: string
  name: string
  email?: string
  employeeId?: string
  type: "admin" | "customer"
  department?: string
}

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsOpen] = useState(false)
  const [greenPoints, setGreenPoints] = useState(140)
  const [currentPage, setCurrentPage] = useState("home")
  const [user, setUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(true)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const swapProduct = (originalId: string, alternativeId: string) => {
    const originalItem = cartItems.find((item) => item.id === originalId)
    if (!originalItem) return

    const alternativeProduct: Product = {
      id: alternativeId,
      name: `Eco-Friendly Alternative Product`,
      description: "Sustainable alternative with lower carbon footprint",
      price: originalItem.price + 0.5,
      imageUrl: originalItem.imageUrl,
      walmartUrl: originalItem.walmartUrl,
      category: originalItem.category,
      brand: "Eco-Friendly",
      carbonFootprint: Math.max(0.5, originalItem.carbonFootprint! * 0.6),
      createdAt: new Date().toISOString(),
    }

    setCartItems((prev) => {
      const filtered = prev.filter((item) => item.id !== originalId)
      return [...filtered, { ...alternativeProduct, quantity: originalItem.quantity }]
    })

    console.log(`Successfully swapped ${originalItem.name} for eco-friendly alternative!`)
  }

  const addGreenPoints = (points: number) => {
    setGreenPoints((prev) => prev + points)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleLogin = (userType: "admin" | "customer", userData: any) => {
    setUser(userData)
    setShowLoginModal(false)
    if (userType === "admin") {
      setCurrentPage("dashboard")
    } else {
      setCurrentPage("home")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setShowLoginModal(true)
    setCurrentPage("home")
    setCartItems([])
  }

  // Show login modal if no user is logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoginModal isOpen={showLoginModal} onClose={() => {}} onLogin={handleLogin} />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Walmart</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
      </div>
    )
  }

  // Admin view - only dashboard
  if (user.type === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader user={user} onLogout={handleLogout} />
        <ManagerDashboard />
      </div>
    )
  }

  // Customer view - full shopping experience
  return (
    <div className="min-h-screen bg-white">
      <CustomerHeader
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        greenPoints={greenPoints}
        onCartClick={() => setIsOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <ProductGrid onAddToCart={addToCart} category={currentPage} />
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onSwapProduct={swapProduct}
        onAddGreenPoints={addGreenPoints}
      />
    </div>
  )
}
