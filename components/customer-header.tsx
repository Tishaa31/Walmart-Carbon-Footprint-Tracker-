"use client"

import type React from "react"

import {
  Search,
  ChevronDown,
  User,
  ShoppingCart,
  Grid3X3,
  Wrench,
  MapPin,
  Clock,
  Truck,
  Car,
  Package,
  X,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface CustomerHeaderProps {
  cartCount?: number
  greenPoints?: number
  onCartClick?: () => void
  currentPage?: string
  onNavigate?: (page: string) => void
  user?: any
  onLogout?: () => void
}

interface LocationOption {
  id: string
  name: string
  address: string
  distance: string
  type: "supercenter" | "neighborhood" | "pickup"
  hours: string
  services: string[]
}

interface ServiceOption {
  id: "shipping" | "pickup" | "delivery"
  name: string
  icon: React.ReactNode
  description: string
  url: string
}

export function CustomerHeader({
  cartCount = 0,
  greenPoints = 0,
  onCartClick,
  currentPage = "home",
  onNavigate,
  user,
  onLogout,
}: CustomerHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [showDepartmentsDropdown, setShowDepartmentsDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [selectedService, setSelectedService] = useState<"shipping" | "pickup" | "delivery" | null>(null)
  const [selectedLocation, setSelectedLocation] = useState({
    name: "South Gate Supercenter",
    address: "South Gate, 90280",
    shortAddress: "South Gate, 90280 • South Gate Super...",
  })
  const [locationSearch, setLocationSearch] = useState("")
  const locationDropdownRef = useRef<HTMLDivElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const departmentsDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Update the departments dropdown items with proper categories and subcategories
  const departmentsItems = [
    {
      category: "Rollbacks & more",
      items: ["Rollbacks", "Clearance", "Special Buys", "New Arrivals"],
    },
    {
      category: "Grocery",
      items: ["Fresh Food", "Pantry", "Beverages", "Snacks", "Organic", "Baby Food"],
    },
    {
      category: "Electronics",
      items: ["TVs", "Computers", "Cell Phones", "Video Games", "Audio", "Cameras", "Smart Home"],
    },
    {
      category: "Clothing, Shoes & Accessories",
      items: ["Women", "Men", "Kids", "Baby", "Shoes", "Jewelry", "Handbags", "Watches"],
    },
    {
      category: "Home, Garden & Tools",
      items: ["Furniture", "Home Decor", "Kitchen", "Bedding", "Bath", "Garden Center", "Tools", "Storage"],
    },
    {
      category: "Beauty",
      items: ["Makeup", "Skincare", "Hair Care", "Fragrance", "Personal Care", "Men's Grooming"],
    },
    {
      category: "Health & Wellness",
      items: ["Pharmacy", "Vitamins", "First Aid", "Vision Center", "Hearing Center"],
    },
    {
      category: "Baby & Kids",
      items: ["Baby Gear", "Diapers", "Baby Food", "Toys", "Kids Furniture", "School Supplies"],
    },
    {
      category: "Sports & Outdoors",
      items: ["Exercise", "Outdoor Recreation", "Sports", "Hunting & Fishing", "Team Sports"],
    },
    {
      category: "Auto & Tires",
      items: ["Tires", "Auto Parts", "Car Electronics", "Car Care", "Automotive Tools"],
    },
  ]

  // Update the services dropdown items with proper categories
  const servicesItems = [
    {
      category: "Money Services",
      items: ["Money Transfers", "Check Cashing", "Money Orders", "Bill Pay", "Tax Services"],
    },
    {
      category: "Health Services",
      items: ["Pharmacy", "Vision Center", "Hearing Center", "Health Screenings", "Immunizations"],
    },
    {
      category: "Photo Services",
      items: ["Photo Prints", "Photo Books", "Canvas Prints", "Photo Cards", "Same Day Pickup"],
    },
    {
      category: "Auto Services",
      items: ["Tire Installation", "Oil Changes", "Auto Care Center", "Battery Installation"],
    },
    {
      category: "Home Services",
      items: ["Installation Services", "Assembly Services", "TV Mounting", "Furniture Assembly"],
    },
    {
      category: "Business Services",
      items: ["Business Accounts", "Bulk Orders", "Corporate Services", "Gift Cards"],
    },
    {
      category: "Special Services",
      items: ["Custom Cakes", "Registry", "Gift Cards", "Protection Plans", "Extended Warranties"],
    },
  ]

  // Service options with Walmart-style icons and URLs
  const serviceOptions: ServiceOption[] = [
    {
      id: "shipping",
      name: "Shipping",
      icon: (
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="relative">
            <Truck className="h-6 w-6 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      description: "Items shipped to you",
      url: "https://walmart.com/shipping",
    },
    {
      id: "pickup",
      name: "Pickup",
      icon: (
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Car className="h-6 w-6 text-blue-600" />
        </div>
      ),
      description: "Curbside & in-store",
      url: "https://walmart.com/store/finder",
    },
    {
      id: "delivery",
      name: "Delivery",
      icon: (
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="relative">
            <Package className="h-6 w-6 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-2 h-4 bg-orange-500 rounded-sm"></div>
          </div>
        </div>
      ),
      description: "Items delivered to you",
      url: "https://walmart.com/grocery/delivery-pickup",
    },
  ]

  // Mock Walmart locations data
  const locationOptions: LocationOption[] = [
    {
      id: "1",
      name: "South Gate Supercenter",
      address: "8500 Garfield Ave, South Gate, CA 90280",
      distance: "0.5 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Auto Care"],
    },
    {
      id: "2",
      name: "Lynwood Supercenter",
      address: "10925 Atlantic Ave, Lynwood, CA 90262",
      distance: "2.1 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Vision Center"],
    },
    {
      id: "3",
      name: "Downey Supercenter",
      address: "9301 Apollo Way, Downey, CA 90242",
      distance: "3.4 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Auto Care", "Vision Center"],
    },
    {
      id: "4",
      name: "Pico Rivera Supercenter",
      address: "8500 Washington Blvd, Pico Rivera, CA 90660",
      distance: "4.2 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy"],
    },
    {
      id: "5",
      name: "Huntington Park Neighborhood Market",
      address: "6600 Pacific Blvd, Huntington Park, CA 90255",
      distance: "1.8 mi",
      type: "neighborhood",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy"],
    },
    {
      id: "6",
      name: "Bell Gardens Supercenter",
      address: "6701 Eastern Ave, Bell Gardens, CA 90201",
      distance: "2.9 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Auto Care"],
    },
    {
      id: "7",
      name: "Compton Supercenter",
      address: "301 W Compton Blvd, Compton, CA 90220",
      distance: "5.1 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Vision Center"],
    },
    {
      id: "8",
      name: "Montebello Supercenter",
      address: "2105 W Whittier Blvd, Montebello, CA 90640",
      distance: "6.3 mi",
      type: "supercenter",
      hours: "6am - 11pm",
      services: ["Grocery Pickup", "Delivery", "Pharmacy", "Auto Care"],
    },
  ]

  // Mock search suggestions based on our product data
  const mockSearchSuggestions = [
    "bananas",
    "organic bananas",
    "led light bulb",
    "whole milk",
    "baby spinach",
    "whole wheat bread",
    "laundry detergent",
    "organic cotton t-shirt",
    "wireless earbuds",
    "quinoa",
    "all-purpose cleaner",
    "fresh produce",
    "dairy products",
    "electronics",
    "home garden",
    "organic food",
    "energy efficient",
    "eco friendly",
    "sustainable products",
    "carbon neutral",
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleLocationSelect = (location: LocationOption) => {
    setSelectedLocation({
      name: location.name,
      address: location.address,
      shortAddress: `${location.address.split(",")[1]?.trim()}, ${location.address.split(",")[2]?.trim()} • ${location.name.split(" ")[0]} ${location.name.split(" ")[1]}...`,
    })
    setShowLocationDropdown(false)
    setLocationSearch("")
  }

  const handleServiceSelect = (serviceId: "shipping" | "pickup" | "delivery") => {
    setSelectedService(serviceId)
    const service = serviceOptions.find((s) => s.id === serviceId)
    if (service) {
      console.log(`Navigating to: ${service.url}`)
    }
  }

  const handleServiceClear = () => {
    setSelectedService(null)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value.length > 0) {
      const filtered = mockSearchSuggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8)
      setSearchSuggestions(filtered)
      setShowSearchSuggestions(true)
    } else {
      setShowSearchSuggestions(false)
      setSearchSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSearchSuggestions(false)
    console.log("Searching for:", suggestion)
  }

  const getHeaderText = () => {
    if (selectedService) {
      const service = serviceOptions.find((s) => s.id === selectedService)
      if (service) {
        return service.name
      }
    }
    return "Pickup or delivery?"
  }

  const filteredLocations = locationOptions.filter(
    (location) =>
      location.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      location.address.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navigationItems = [
    { id: "home", label: "Get it Fast" },
    { id: "grocery", label: "Grocery" },
    { id: "deals", label: "Deals" },
    { id: "pharmacy", label: "Pharmacy Delivery" },
    { id: "trending", label: "Trending" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "home-garden", label: "Home & Garden" },
    { id: "walmart-plus", label: "Walmart+" },
  ]

  return (
    <header className="bg-white">
      {/* Main blue header */}
      <div className="bg-[#0071CE] text-white">
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left section - Logo and Pickup/Delivery */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Walmart Logo */}
              <button onClick={() => onNavigate?.("home")} className="flex items-center">
                <Image
                  src="/walmart-logo-new.png"
                  alt="Walmart"
                  width={40}
                  height={40}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  priority
                />
              </button>

              {/* Pickup or delivery section */}
              <div className="hidden lg:flex items-center relative" ref={locationDropdownRef}>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-3 sm:px-4 py-2 hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-semibold">{getHeaderText()}</div>
                    <div className="text-xs opacity-90 max-w-[150px] truncate">{selectedLocation.shortAddress}</div>
                  </div>
                  <ChevronDown
                    className={`h-3 w-3 sm:h-4 sm:w-4 ml-2 transition-transform duration-200 ${
                      showLocationDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-[90vw] max-w-[420px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-900">
                    {/* Service Selection Section */}
                    <div className="bg-[#0071CE] p-4 sm:p-6 rounded-t-lg">
                      <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                        {serviceOptions.map((service) => (
                          <div key={service.id} className="relative">
                            <button
                              onClick={() => handleServiceSelect(service.id)}
                              className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 ${
                                selectedService === service.id ? "bg-white bg-opacity-10" : ""
                              }`}
                            >
                              <div className="relative">
                                {service.icon}
                                {selectedService === service.id && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleServiceClear()
                                      }}
                                      className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
                                    >
                                      <X className="h-2.5 w-2.5 text-gray-800" />
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div className="text-center">
                                <div className="text-xs sm:text-sm font-semibold text-white">{service.name}</div>
                                <div className="text-xs text-white opacity-80 hidden sm:block">
                                  {service.description}
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Store Selection Section */}
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-base sm:text-lg mb-2">Choose your store</h3>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter ZIP code or city, state"
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Location List */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{location.name}</h4>
                                <Badge
                                  className={`text-xs ${
                                    location.type === "supercenter"
                                      ? "bg-blue-100 text-blue-800"
                                      : location.type === "neighborhood"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-orange-100 text-orange-800"
                                  }`}
                                >
                                  {location.type === "supercenter"
                                    ? "Supercenter"
                                    : location.type === "neighborhood"
                                      ? "Neighborhood Market"
                                      : "Pickup Point"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{location.distance}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{location.hours}</span>
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {location.services.slice(0, 2).map((service) => (
                                  <Badge key={service} variant="outline" className="text-xs">
                                    {service}
                                  </Badge>
                                ))}
                                {location.services.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{location.services.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all stores in your area
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center - Search */}
          <div className="flex-1 max-w-3xl" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center rounded-full bg-white shadow-md px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 0 && setShowSearchSuggestions(true)}
                  placeholder="Search everything at Walmart online and in store"
                  className="flex-grow outline-none bg-transparent text-sm sm:text-base text-gray-800 placeholder-gray-500"
                />
                <button type="submit" className="text-white bg-blue-800 rounded-full p-2 hover:bg-blue-900">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-full max-h-80 overflow-y-auto">
                  {searchSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <Search className="inline h-4 w-4 mr-2 text-gray-400" /> {s}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

            {/* Right section */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* GreenPoints - replacing Reorder */}
              <Button
                variant="ghost"
                className="hidden md:flex flex-col items-center p-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="text-xs">{greenPoints} Points</div>
              </Button>

              {/* Sign In Account */}
              <div className="relative" ref={userDropdownRef}>
                <Button
                  variant="ghost"
                  className="hidden sm:flex flex-col items-center p-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="text-xs">{user ? user.name.split(" ")[0] : "Sign In"}</div>
                </Button>

                {/* User Dropdown */}
                {showUserDropdown && user && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-900">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                        My Account
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                        Order History
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                        GreenPoints History
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                        Settings
                      </button>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={onLogout}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150 text-red-600"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart*/}
              <Button
                variant="ghost"
                className="flex items-center space-x-1 sm:space-x-2 p-2 text-white hover:bg-white hover:bg-opacity-10 relative transition-colors duration-200"
                onClick={onCartClick}
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  {cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-[#FFC220] text-black text-xs min-w-[15px] h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </div>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-2 sm:px-4">
          <nav className="flex items-center space-x-2 sm:space-x-6 py-2 overflow-x-auto">
            {/* Departments */}
            <div
              className="relative"
              ref={departmentsDropdownRef}
              onMouseEnter={() => setShowDepartmentsDropdown(true)}
              onMouseLeave={() => setShowDepartmentsDropdown(false)}
            >
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-gray-700 hover:text-[#0071CE] whitespace-nowrap transition-colors duration-200 hover:bg-gray-50"
              >
                <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-semibold">Departments</span>
                <ChevronDown
                  className={`h-2 w-2 sm:h-3 sm:w-3 transition-transform duration-200 ${showDepartmentsDropdown ? "rotate-180" : ""}`}
                />
              </Button>

              {/* Departments Dropdown - Full Width Overlay */}
              {showDepartmentsDropdown && (
                <div
                  className="fixed left-0 right-0 top-[180px] bg-white shadow-2xl border-t border-gray-200 z-[9999]"
                  onMouseEnter={() => setShowDepartmentsDropdown(true)}
                  onMouseLeave={() => setShowDepartmentsDropdown(false)}
                >
                  <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-96 overflow-y-auto">
                      {departmentsItems.map((department, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-bold text-base text-gray-900 border-b border-gray-200 pb-2">
                            {department.category}
                          </h3>
                          <div className="space-y-1">
                            {department.items.map((item, itemIndex) => (
                              <button
                                key={itemIndex}
                                onClick={() => {
                                  console.log(`Navigate to: ${department.category} > ${item}`)
                                  onNavigate?.(item.toLowerCase().replace(/\s+/g, "-"))
                                  setShowDepartmentsDropdown(false)
                                }}
                                className="w-full text-left px-0 py-1.5 text-sm text-gray-700 hover:text-[#0071CE] hover:underline transition-colors duration-150 block"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          console.log("Navigate to: All Departments")
                          onNavigate?.("all-departments")
                          setShowDepartmentsDropdown(false)
                        }}
                        className="text-[#0071CE] hover:text-blue-800 font-semibold text-sm hover:underline"
                      >
                        View All Departments →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div
              className="relative"
              ref={servicesDropdownRef}
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-gray-700 hover:text-[#0071CE] whitespace-nowrap transition-colors duration-200 hover:bg-gray-50"
              >
                <Wrench className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-semibold">Services</span>
                <ChevronDown
                  className={`h-2 w-2 sm:h-3 sm:w-3 transition-transform duration-200 ${showServicesDropdown ? "rotate-180" : ""}`}
                />
              </Button>

              {/* Services Dropdown - Full Width Overlay */}
              {showServicesDropdown && (
                <div
                  className="fixed left-0 right-0 top-[180px] bg-white shadow-2xl border-t border-gray-200 z-[9999]"
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                >
                  <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
                      {servicesItems.map((service, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-bold text-base text-gray-900 border-b border-gray-200 pb-2">
                            {service.category}
                          </h3>
                          <div className="space-y-1">
                            {service.items.map((item, itemIndex) => (
                              <button
                                key={itemIndex}
                                onClick={() => {
                                  console.log(`Navigate to: ${service.category} > ${item}`)
                                  window.open(
                                    `https://walmart.com/services/${item.toLowerCase().replace(/\s+/g, "-")}`,
                                    "_blank",
                                  )
                                  setShowServicesDropdown(false)
                                }}
                                className="w-full text-left px-0 py-1.5 text-sm text-gray-700 hover:text-[#0071CE] hover:underline transition-colors duration-150 block"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          window.open("https://walmart.com/services", "_blank")
                          setShowServicesDropdown(false)
                        }}
                        className="text-[#0071CE] hover:text-blue-800 font-semibold text-sm hover:underline"
                      >
                        View All Services →
                      </button>
                      <button
                        onClick={() => {
                          window.open("https://walmart.com/store/finder", "_blank")
                          setShowServicesDropdown(false)
                        }}
                        className="text-[#0071CE] hover:text-blue-800 font-semibold text-sm hover:underline"
                      >
                        Find a Store →
                      </button>
                      <button
                        onClick={() => {
                          window.open("https://walmart.com/help", "_blank")
                          setShowServicesDropdown(false)
                        }}
                        className="text-[#0071CE] hover:text-blue-800 font-semibold text-sm hover:underline"
                      >
                        Customer Service →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-4 sm:h-6 w-px bg-gray-300"></div>

            {/* Navigation items */}
            <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`py-2 whitespace-nowrap transition-all duration-200 hover:underline text-xs sm:text-sm ${
                    currentPage === item.id
                      ? "text-[#0071CE] font-semibold border-b-2 border-[#0071CE]"
                      : "text-gray-700 hover:text-[#0071CE]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* More */}
            <Button
              variant="ghost"
              className="flex items-center space-x-1 text-gray-700 hover:text-[#0071CE] whitespace-nowrap transition-colors duration-200"
            >
              <span className="text-xs sm:text-sm font-semibold">More</span>
              <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
