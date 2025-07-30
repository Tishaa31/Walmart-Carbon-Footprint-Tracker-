"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Leaf,
  Factory,
  Truck,
  Award,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface Supplier {
  id: string
  name: string
  sustainabilityScore: number
  carbonFootprint: number
  productsCount: number
  trend: "up" | "down" | "stable"
  certifications: string[]
  location: string
}

interface CategoryData {
  name: string
  averageCarbonFootprint: number
  totalProducts: number
  topSupplier: string
  improvement: number
}

export function ManagerDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "GreenTech Manufacturing",
      sustainabilityScore: 92,
      carbonFootprint: 2.1,
      productsCount: 156,
      trend: "up",
      certifications: ["Carbon Neutral", "Fair Trade", "Organic"],
      location: "California, USA",
    },
    {
      id: "2",
      name: "EcoFriendly Foods Co.",
      sustainabilityScore: 88,
      carbonFootprint: 1.8,
      productsCount: 234,
      trend: "up",
      certifications: ["Organic", "Local Sourcing"],
      location: "Oregon, USA",
    },
    {
      id: "3",
      name: "Traditional Industries Ltd.",
      sustainabilityScore: 45,
      carbonFootprint: 12.5,
      productsCount: 89,
      trend: "down",
      certifications: [],
      location: "China",
    },
    {
      id: "4",
      name: "Sustainable Solutions Inc.",
      sustainabilityScore: 85,
      carbonFootprint: 3.2,
      productsCount: 178,
      trend: "stable",
      certifications: ["Renewable Energy", "Waste Reduction"],
      location: "Texas, USA",
    },
  ]

  const categoryData: CategoryData[] = [
    {
      name: "Fresh Produce",
      averageCarbonFootprint: 1.2,
      totalProducts: 450,
      topSupplier: "EcoFriendly Foods Co.",
      improvement: 15,
    },
    {
      name: "Electronics",
      averageCarbonFootprint: 18.5,
      totalProducts: 230,
      topSupplier: "GreenTech Manufacturing",
      improvement: -8,
    },
    {
      name: "Home & Garden",
      averageCarbonFootprint: 5.8,
      totalProducts: 340,
      topSupplier: "Sustainable Solutions Inc.",
      improvement: 22,
    },
    {
      name: "Clothing",
      averageCarbonFootprint: 8.2,
      totalProducts: 180,
      topSupplier: "GreenTech Manufacturing",
      improvement: 12,
    },
  ]

  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getCarbonColor = (footprint: number) => {
    if (footprint < 5) return "text-green-600"
    if (footprint < 10) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Dashboard</h1>
          <p className="text-gray-600">Monitor and optimize supplier sustainability performance</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total CO₂e Emissions</p>
                      <p className="text-2xl font-bold">2,847 kg</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -12% from last month
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Green Suppliers</p>
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8% from last month
                      </p>
                    </div>
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Waste Diverted</p>
                      <p className="text-2xl font-bold">1,234 kg</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +25% from last month
                      </p>
                    </div>
                    <Factory className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Green Deliveries</p>
                      <p className="text-2xl font-bold">42%</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15% from last month
                      </p>
                    </div>
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sustainability Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">New sustainable supplier onboarded</p>
                      <p className="text-sm text-gray-600">GreenTech Manufacturing achieved 92% sustainability score</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Carbon reduction milestone reached</p>
                      <p className="text-sm text-gray-600">Electronics category reduced emissions by 8% this quarter</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Supplier review required</p>
                      <p className="text-sm text-gray-600">
                        Traditional Industries Ltd. sustainability score dropped to 45%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-gray-600">{supplier.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSustainabilityColor(supplier.sustainabilityScore)}>
                          {supplier.sustainabilityScore}% Sustainable
                        </Badge>
                        {supplier.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {supplier.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Carbon Footprint</p>
                        <p className={`text-lg font-bold ${getCarbonColor(supplier.carbonFootprint)}`}>
                          {supplier.carbonFootprint} kg CO₂e
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Products</p>
                        <p className="text-lg font-bold">{supplier.productsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Certifications</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {supplier.certifications.length > 0 ? (
                            supplier.certifications.map((cert) => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">None</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Supplier
                      </Button>
                      {supplier.sustainabilityScore < 60 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-orange-600 border-orange-600 bg-transparent"
                        >
                          Request Improvement Plan
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6">
              {categoryData.map((category) => (
                <Card key={category.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <Badge
                        className={category.improvement > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {category.improvement > 0 ? "+" : ""}
                        {category.improvement}% improvement
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Avg Carbon Footprint</p>
                        <p className={`text-lg font-bold ${getCarbonColor(category.averageCarbonFootprint)}`}>
                          {category.averageCarbonFootprint} kg CO₂e
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-lg font-bold">{category.totalProducts}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Top Sustainable Supplier</p>
                        <p className="text-lg font-bold">{category.topSupplier}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Priority Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800">High Carbon Footprint Alert</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Traditional Industries Ltd. has a carbon footprint 3x higher than category average. Consider
                      sourcing alternatives or requesting improvement plan.
                    </p>
                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                      Take Action
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Certification Opportunity</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      5 suppliers are close to achieving carbon neutral certification. Provide support to help them
                      reach this milestone.
                    </p>
                    <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                      View Suppliers
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800">Success Story</h4>
                    <p className="text-sm text-green-700 mt-1">
                      GreenTech Manufacturing reduced their carbon footprint by 25% this quarter. Consider expanding
                      partnership and sharing best practices.
                    </p>
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
