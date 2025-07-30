// Carbon footprint calculation utilities

interface CarbonFactors {
  [category: string]: {
    baseFactor: number // kg CO2 per kg of product
    transportFactor: number // additional CO2 for transport
    packagingFactor: number // additional CO2 for packaging
  }
}

// Carbon emission factors by product category (kg CO2 per kg of product)
const CARBON_FACTORS: CarbonFactors = {
  "Fresh Produce": {
    baseFactor: 0.5,
    transportFactor: 0.2,
    packagingFactor: 0.1,
  },
  Dairy: {
    baseFactor: 3.2,
    transportFactor: 0.3,
    packagingFactor: 0.2,
  },
  "Meat & Seafood": {
    baseFactor: 15.0,
    transportFactor: 0.5,
    packagingFactor: 0.3,
  },
  Pantry: {
    baseFactor: 1.8,
    transportFactor: 0.4,
    packagingFactor: 0.3,
  },
  Bakery: {
    baseFactor: 2.1,
    transportFactor: 0.2,
    packagingFactor: 0.2,
  },
  "Home & Garden": {
    baseFactor: 5.0,
    transportFactor: 0.8,
    packagingFactor: 0.5,
  },
  Electronics: {
    baseFactor: 25.0,
    transportFactor: 1.0,
    packagingFactor: 1.5,
  },
  Clothing: {
    baseFactor: 8.0,
    transportFactor: 0.6,
    packagingFactor: 0.4,
  },
}

interface Product {
  name: string
  category: string
  weight?: number // in kg
  price: number
  brand?: string
}

interface CarbonFootprintResult {
  totalFootprint: number
  breakdown: {
    production: number
    transport: number
    packaging: number
  }
  category: string
  confidence: "high" | "medium" | "low"
}

export function calculateCarbonFootprint(product: Product): CarbonFootprintResult {
  const factors = CARBON_FACTORS[product.category] || CARBON_FACTORS["Pantry"]

  // Estimate weight if not provided (based on price and category)
  const estimatedWeight = product.weight || estimateWeightFromPrice(product.price, product.category)

  // Calculate carbon footprint components
  const production = estimatedWeight * factors.baseFactor
  const transport = estimatedWeight * factors.transportFactor
  const packaging = estimatedWeight * factors.packagingFactor

  const totalFootprint = production + transport + packaging

  // Determine confidence level
  const confidence = product.weight ? "high" : "medium"

  return {
    totalFootprint: Math.round(totalFootprint * 100) / 100,
    breakdown: {
      production: Math.round(production * 100) / 100,
      transport: Math.round(transport * 100) / 100,
      packaging: Math.round(packaging * 100) / 100,
    },
    category: product.category,
    confidence,
  }
}

function estimateWeightFromPrice(price: number, category: string): number {
  // Rough estimates based on typical price-to-weight ratios by category
  const priceToWeightRatios: { [key: string]: number } = {
    "Fresh Produce": 0.5, // $2 per kg
    Dairy: 0.3, // $3.33 per kg
    "Meat & Seafood": 0.1, // $10 per kg
    Pantry: 0.4, // $2.50 per kg
    Bakery: 0.2, // $5 per kg
    "Home & Garden": 0.05, // $20 per kg
    Electronics: 0.01, // $100 per kg
    Clothing: 0.02, // $50 per kg
  }

  const ratio = priceToWeightRatios[category] || 0.3
  return price * ratio
}

export function getCarbonFootprintRating(footprint: number): {
  rating: "A" | "B" | "C" | "D" | "F"
  label: string
  color: string
} {
  if (footprint < 1) {
    return { rating: "A", label: "Excellent", color: "green" }
  } else if (footprint < 3) {
    return { rating: "B", label: "Good", color: "lime" }
  } else if (footprint < 7) {
    return { rating: "C", label: "Fair", color: "yellow" }
  } else if (footprint < 15) {
    return { rating: "D", label: "Poor", color: "orange" }
  } else {
    return { rating: "F", label: "Very Poor", color: "red" }
  }
}

export function compareCarbonFootprints(products: Product[]): {
  bestProduct: Product & { footprint: number }
  worstProduct: Product & { footprint: number }
  averageFootprint: number
} {
  const productsWithFootprints = products.map((product) => ({
    ...product,
    footprint: calculateCarbonFootprint(product).totalFootprint,
  }))

  const sortedProducts = productsWithFootprints.sort((a, b) => a.footprint - b.footprint)

  const averageFootprint =
    productsWithFootprints.reduce((sum, p) => sum + p.footprint, 0) / productsWithFootprints.length

  return {
    bestProduct: sortedProducts[0],
    worstProduct: sortedProducts[sortedProducts.length - 1],
    averageFootprint: Math.round(averageFootprint * 100) / 100,
  }
}

// Utility function to suggest lower-carbon alternatives
export function suggestAlternatives(product: Product): string[] {
  const suggestions: string[] = []

  const footprint = calculateCarbonFootprint(product)

  if (footprint.totalFootprint > 10) {
    suggestions.push("Consider buying local or organic alternatives")
    suggestions.push("Look for products with minimal packaging")
  }

  if (product.category === "Meat & Seafood") {
    suggestions.push("Try plant-based protein alternatives")
    suggestions.push("Choose sustainably sourced options")
  }

  if (product.category === "Electronics") {
    suggestions.push("Buy refurbished or second-hand when possible")
    suggestions.push("Look for energy-efficient models")
  }

  if (footprint.breakdown.packaging > 1) {
    suggestions.push("Choose products with recyclable packaging")
    suggestions.push("Buy in bulk to reduce packaging per unit")
  }

  return suggestions
}
