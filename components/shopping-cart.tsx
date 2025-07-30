// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { X, Minus, Plus, Leaf, Award, Truck } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Image from "next/image"
// import { mockDatabase } from "@/lib/database"

// interface CartItem {
//   id: string
//   name: string
//   price: number
//   quantity: number
//   imageUrl: string
//   carbonFootprint: number
//   category: string
//   brand: string
// }

// interface EcoAlternative {
//   id: string
//   name: string
//   price: number
//   imageUrl: string
//   carbonFootprint: number
//   carbonSaving: number
//   greenPointsReward: number
// }

// interface ShoppingCartProps {
//   isOpen: boolean
//   onClose: () => void
//   items: CartItem[]
//   onUpdateQuantity: (id: string, quantity: number) => void
//   onRemoveItem: (id: string) => void
//   onSwapProduct: (originalId: string, alternativeId: string) => void
//   onAddGreenPoints: (points: number) => void
// }

// export function ShoppingCart({
//   isOpen,
//   onClose,
//   items,
//   onUpdateQuantity,
//   onRemoveItem,
//   onSwapProduct,
//   onAddGreenPoints,
// }: ShoppingCartProps) {
//   const [showEcoSwap, setShowEcoSwap] = useState<string | null>(null)
//   const [selectedDelivery, setSelectedDelivery] = useState("standard")
//   // Track which products have been swapped
//   const [swappedProductIds, setSwappedProductIds] = useState<string[]>([])
//   const router = useRouter();

//   if (!isOpen) return null

//   function getProductImage(name: string) {
//     const lower = name.toLowerCase();
//     if (lower.includes("banana")) return "/banana.png";
//     if (lower.includes("milk")) return "/milk.png";
//     if (lower.includes("led") || lower.includes("bulb")) return "/led.png";
//     if (lower.includes("spinach")) return "/spinach.png";
//     if (lower.includes("bread")) return "/bread.png";
//     if (lower.includes("detergent") || lower.includes("cleaner")) return "/cleaner.png";
//     if (lower.includes("t-shirt") || lower.includes("shirt")) return "/shirt.png";
//     if (lower.includes("earbuds") || lower.includes("headphones")) return "/headphones.png";
//     if (lower.includes("quinoa")) return "/quinoa.png";
//     // fallback image
//     return "/placeholder.svg";
//   }

//   // Helper to get product name from database
//   function getProductNameFromDatabase(id: string) {
//     const product = mockDatabase.find((p: any) => p.id === id);
//     return product ? product.name : undefined;
//   }

//   // Helper to get product from database
//   function getProductFromDatabase(id: string) {
//     return mockDatabase.find((p: any) => p.id === id);
//   }

//   // Mock eco alternatives with better data
//   const getEcoAlternative = (item: CartItem): EcoAlternative | null => {
//     const alternatives: { [key: string]: EcoAlternative } = {
//       "1": {
//         id: "eco-1",
//         name: "Organic Bananas, 2 lb (Local Farm)",
//         price: 3.48,
//         imageUrl: "/banana.png",
//         carbonFootprint: 1.2,
//         carbonSaving: 0.9,
//         greenPointsReward: 15,
//       },
//       "2": {
//         id: "eco-2",
//         name: "Energy Star LED Bulb, 60W",
//         price: 4.97,
//         imageUrl: "/led.png",
//         carbonFootprint: 4.2,
//         carbonSaving: 4.3,
//         greenPointsReward: 25,
//       },
//       "3": {
//         id: "eco-3",
//         name: "Organic Whole Milk, 1 Gallon (Local Dairy)",
//         price: 4.29,
//         imageUrl: "/milk.png",
//         carbonFootprint: 8.5,
//         carbonSaving: 3.8,
//         greenPointsReward: 20,
//       },
//       "4": {
//         id: "eco-4",
//         name: "Organic Baby Spinach, 5 oz (Locally Grown)",
//         price: 3.29,
//         imageUrl: "/spinach.png",
//         carbonFootprint: 1.0,
//         carbonSaving: 0.8,
//         greenPointsReward: 12,
//       },
//       "5": {
//         id: "eco-5",
//         name: "100% Whole Wheat Bread, 20 oz (Organic)",
//         price: 2.79,
//         imageUrl: "/bread.png",
//         carbonFootprint: 2.1,
//         carbonSaving: 1.1,
//         greenPointsReward: 15,
//       },
//     }

//     // Extract main keyword from original product name
//     const keywords = [
//       "banana", "milk", "bread", "detergent", "spinach", "bulb", "t-shirt", "earbuds", "quinoa", "cleaner"
//     ];
//     const lowerName = item.name.toLowerCase();
//     const matchedKeyword = keywords.find((kw) => lowerName.includes(kw));

//     // Find eco-friendly product in database that matches both category and keyword
//     const ecoProduct = mockDatabase.find(
//       (p) =>
//         p.category === item.category &&
//         p.brand !== item.brand &&
//         matchedKeyword && p.name.toLowerCase().includes(matchedKeyword) &&
//         (p.name.toLowerCase().includes("organic") || p.name.toLowerCase().includes("eco") || p.name.toLowerCase().includes("green") || p.name.toLowerCase().includes("plant-based") || p.name.toLowerCase().includes("recycled") || p.name.toLowerCase().includes("sustainable"))
//     );

//     if (ecoProduct && ecoProduct.carbonFootprint !== undefined) {
//       return {
//         id: ecoProduct.id,
//         name: ecoProduct.name,
//         price: ecoProduct.price,
//         imageUrl: ecoProduct.imageUrl || getProductImage(ecoProduct.name),
//         carbonFootprint: ecoProduct.carbonFootprint,
//         carbonSaving: item.carbonFootprint - ecoProduct.carbonFootprint,
//         greenPointsReward: Math.max(10, Math.floor((item.carbonFootprint - ecoProduct.carbonFootprint) * 3)),
//       }
//     }

//     // If no valid eco product, do not suggest swap
//     return null;
//   }

//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const totalCarbonFootprint = items.reduce((sum, item) => sum + item.carbonFootprint * item.quantity, 0)

//   const deliveryOptions = [
//     {
//       id: "standard",
//       name: "Standard Delivery",
//       time: "3-5 days",
//       price: 0,
//       carbonImpact: 2.1,
//       vehicle: "Standard truck",
//     },
//     {
//       id: "eco-local",
//       name: "Eco-Local Delivery",
//       time: "2-3 days",
//       price: 0,
//       carbonImpact: 1.2,
//       vehicle: "Electric vehicle",
//       greenPoints: 10,
//     },
//     {
//       id: "eco-delay",
//       name: "Eco-Delay Delivery",
//       time: "5-7 days",
//       price: -2.0,
//       carbonImpact: 0.8,
//       vehicle: "Batch delivery",
//       greenPoints: 20,
//       discount: true,
//     },
//   ]

//   const handleSwapProduct = (originalId: string, alternative: EcoAlternative) => {
//     const originalItem = items.find((item) => item.id === originalId)
//     if (!originalItem) return

//     // Extract main keyword from original product name
//     const keywords = [
//       "banana", "milk", "bread", "detergent", "spinach", "bulb", "t-shirt", "earbuds", "quinoa", "cleaner"
//     ];
//     const lowerName = originalItem.name.toLowerCase();
//     const matchedKeyword = keywords.find((kw) => lowerName.includes(kw));

//     // Find eco-friendly product in database that matches both category and keyword
//     const ecoProduct = mockDatabase.find(
//       (p) =>
//         p.category === originalItem.category &&
//         p.brand !== originalItem.brand &&
//         matchedKeyword && p.name.toLowerCase().includes(matchedKeyword) &&
//         (p.name.toLowerCase().includes("organic") || p.name.toLowerCase().includes("eco") || p.name.toLowerCase().includes("green") || p.name.toLowerCase().includes("plant-based") || p.name.toLowerCase().includes("recycled") || p.name.toLowerCase().includes("sustainable"))
//     )

//     // If no match, fallback to a custom eco alternative using original product's name and image
//     const fallbackEcoAlt: CartItem = {
//       id: `eco-${originalItem.id}`,
//       name: `Eco-Friendly ${originalItem.name}`,
//       price: originalItem.price + 0.5,
//       quantity: originalItem.quantity,
//       imageUrl: originalItem.imageUrl || getProductImage(originalItem.name),
//       carbonFootprint: Math.max(0.5, originalItem.carbonFootprint * 0.6),
//       category: originalItem.category,
//       brand: "Eco-Friendly",
//     }

//     const newCartItem: CartItem = ecoProduct && ecoProduct.carbonFootprint !== undefined
//       ? {
//           id: ecoProduct.id,
//           name: ecoProduct.name,
//           price: ecoProduct.price,
//           quantity: originalItem.quantity,
//           imageUrl: ecoProduct.imageUrl || getProductImage(ecoProduct.name),
//           carbonFootprint: ecoProduct.carbonFootprint,
//           category: ecoProduct.category,
//           brand: ecoProduct.brand,
//         }
//       : fallbackEcoAlt

//     onRemoveItem(originalId)
//     onSwapProduct(originalId, newCartItem.id)
//     setSwappedProductIds((prev) => [...prev, originalId])
//     setShowEcoSwap(null)
//     console.log(`Swapped ${originalItem.name} for ${newCartItem.name}!`)
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div className="bg-white w-full max-w-md h-full overflow-y-auto">
//         <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
//           <h2 className="text-xl font-bold">Cart ({items.length})</h2>
//           <Button variant="ghost" size="sm" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
//         <div className="p-4 space-y-4">
//           {items.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             <>
//               {/* Cart Items */}
//               {items.map((item) => {
//                 const ecoAlternative = getEcoAlternative(item)
//                 const canSwap = item.brand !== "Eco-Friendly"
//                 function getEcoImage(ecoAlt: EcoAlternative) {
//                   const dbProduct = mockDatabase.find((p: any) => p.name === ecoAlt.name && p.brand === ecoAlt.name.split(' ')[0]);
//                   return dbProduct?.imageUrl || ecoAlt.imageUrl || getProductImage(ecoAlt.name) || "/placeholder.svg";
//                 }
//                 function getSwappedImage(item: CartItem) {
//                   let dbProduct = mockDatabase.find((p: any) => p.id === item.id || (p.name === item.name && p.brand === item.brand));
//                   if (!dbProduct) {
//                     // Try matching scraped Target products by name and brand
//                     if (typeof window !== 'undefined' && window.TARGET_PRODUCT_DATA) {
//                       const targetProduct = window.TARGET_PRODUCT_DATA.find((p: { name: string; brand: string; imageUrl?: string }) => p.name === item.name && p.brand === item.brand);
//                       if (targetProduct && targetProduct.imageUrl) {
//                         return targetProduct.imageUrl;
//                       }
//                     }
//                   }
//                   return dbProduct?.imageUrl || item.imageUrl || getProductImage(item.name) || "/placeholder.svg";
//                 }
//                 return (
//                   <div key={item.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
//                     <div className="flex space-x-3">
//                       <Image
//                         src={item.brand === "Eco-Friendly"
//                           ? getSwappedImage(item)
//                           : getProductImage(item.name)}
//                         alt={item.brand === "Eco-Friendly"
//                           ? getProductFromDatabase(item.id)?.name || item.name || "Eco-Friendly Product"
//                           : item.name}
//                         width={80}
//                         height={80}
//                         className="rounded-lg object-cover flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-semibold text-sm line-clamp-2">
//                           {item.brand === "Eco-Friendly"
//                             ? getProductFromDatabase(item.id)?.name || item.name
//                             : item.name}
//                         </h3>
//                         <p className="text-gray-600 text-xs">{item.brand}</p>
//                         <div className="flex items-center space-x-2 mt-1">
//                           <Badge
//                             className={`text-xs ${
//                               item.carbonFootprint < 3
//                                 ? "carbon-low"
//                                 : item.carbonFootprint < 8
//                                   ? "carbon-medium"
//                                   : "carbon-high"
//                             }`}
//                           >
//                             {item.carbonFootprint.toFixed(1)} kg CO₂e
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between mt-2">
//                           <span className="font-bold">${item.price.toFixed(2)}</span>
//                           <div className="flex items-center space-x-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
//                               className="h-8 w-8 p-0"
//                             >
//                               <Minus className="h-3 w-3" />
//                             </Button>
//                             <span className="w-8 text-center text-sm">{item.quantity}</span>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
//                               className="h-8 w-8 p-0"
//                             >
//                               <Plus className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* Eco Alternative Suggestion */}
//                     {ecoAlternative && showEcoSwap !== item.id && canSwap && (
//                       <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <Leaf className="h-4 w-4 text-green-600" />
//                           <span className="text-sm font-semibold text-green-800">Greener Alternative Available!</span>
//                         </div>
//                         <div className="flex items-center mb-2">
//                           <Image
//                             src={getEcoImage(ecoAlternative)}
//                             alt={ecoAlternative.name}
//                             width={60}
//                             height={60}
//                             className="rounded-lg object-cover flex-shrink-0 mr-3"
//                           />
//                           <div>
//                             <h4 className="font-semibold text-sm text-green-800 line-clamp-2">{ecoAlternative.name}</h4>
//                             <div className="flex items-center space-x-2 mt-1 flex-wrap">
//                               <Badge className="carbon-low text-xs">
//                                 {ecoAlternative.carbonFootprint.toFixed(1)} kg CO₂e
//                               </Badge>
//                               <Badge className="bg-green-100 text-green-800 text-xs">
//                                 <Award className="h-3 w-3 mr-1" />+{ecoAlternative.greenPointsReward} points
//                               </Badge>
//                             </div>
//                             <span className="font-bold text-green-800">${ecoAlternative.price.toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <p className="text-xs text-green-700 mb-2">
//                           Save {ecoAlternative.carbonSaving.toFixed(1)} kg CO₂e and earn {ecoAlternative.greenPointsReward} GreenPoints
//                         </p>
//                         <Button
//                           size="sm"
//                           className="bg-green-600 hover:bg-green-700 text-white"
//                           onClick={() => setShowEcoSwap(item.id)}
//                         >
//                           View Alternative
//                         </Button>
//                       </div>
//                     )}
//                     {/* Eco Alternative Details */}
//                     {showEcoSwap === item.id && ecoAlternative && canSwap && (
//                       <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <div className="flex items-center justify-between mb-3">
//                           <h4 className="font-semibold text-sm text-green-800">Eco-Friendly Alternative</h4>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => setShowEcoSwap(null)}
//                             className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <div className="flex space-x-3">
//                           <Image
//                             src={getEcoImage(ecoAlternative)}
//                             alt={ecoAlternative.name}
//                             width={60}
//                             height={60}
//                             className="rounded-lg object-cover flex-shrink-0"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-sm text-green-800 line-clamp-2">{ecoAlternative.name}</h4>
//                             <div className="flex items-center space-x-2 mt-1 flex-wrap">
//                               <Badge className="carbon-low text-xs">
//                                 {ecoAlternative.carbonFootprint.toFixed(1)} kg CO₂e
//                               </Badge>
//                               <Badge className="bg-green-100 text-green-800 text-xs">
//                                 <Award className="h-3 w-3 mr-1" />+{ecoAlternative.greenPointsReward} points
//                               </Badge>
//                             </div>
//                             <div className="flex items-center justify-between mt-2">
//                               <span className="font-bold text-green-800">${ecoAlternative.price.toFixed(2)}</span>
//                               <div className="space-x-2">
//                                 <Button
//                                   size="sm"
//                                   className="bg-green-600 hover:bg-green-700 text-white"
//                                   onClick={() => handleSwapProduct(item.id, ecoAlternative)}
//                                 >
//                                   Swap Now
//                                 </Button>
//                               </div>
//                             </div>
//                             {/* Benefits Summary */}
//                             <div className="mt-2 p-2 bg-white rounded border border-green-200">
//                               <div className="text-xs text-green-700 space-y-1">
//                                 <div className="flex justify-between">
//                                   <span>Carbon Savings:</span>
//                                   <span className="font-semibold">
//                                     -{ecoAlternative.carbonSaving.toFixed(1)} kg CO₂e
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>GreenPoints Earned:</span>
//                                   <span className="font-semibold">+{ecoAlternative.greenPointsReward}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Price Difference:</span>
//                                   <span
//                                     className={`font-semibold ${ecoAlternative.price > item.price ? "text-orange-600" : "text-green-600"}`}
//                                   >
//                                     {ecoAlternative.price > item.price ? "+" : ""}${(ecoAlternative.price - item.price).toFixed(2)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//               {/* Delivery Options */}
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center space-x-2 text-base">
//                     <Truck className="h-5 w-5" />
//                     <span>Delivery Options</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {deliveryOptions.map((option) => (
//                     <div
//                       key={option.id}
//                       className={`p-3 border rounded-lg cursor-pointer transition-all ${
//                         selectedDelivery === option.id
//                           ? "border-walmart-blue bg-blue-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => setSelectedDelivery(option.id)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center space-x-2 flex-wrap">
//                             <span className="font-semibold text-sm">{option.name}</span>
//                             {option.greenPoints && (
//                               <Badge className="eco-badge text-xs">+{option.greenPoints} points</Badge>
//                             )}
//                             {option.discount && <Badge className="bg-red-100 text-red-800 text-xs">Save $2.00</Badge>}
//                           </div>
//                           <p className="text-xs text-gray-600 mt-1">
//                             {option.time} • {option.vehicle}
//                           </p>
//                           <p className="text-xs text-gray-500">{option.carbonImpact.toFixed(1)} kg CO₂e</p>
//                         </div>
//                         <div className="text-right">
//                           <span className="font-bold text-sm">
//                             {option.price === 0
//                               ? "FREE"
//                               : option.price > 0
//                                 ? `$${option.price.toFixed(2)}`
//                                 : `-$${Math.abs(option.price || 0).toFixed(2)}`}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               {/* Cart Summary */}
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal:</span>
//                       <span>${totalPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Delivery:</span>
//                       <span>
//                         {deliveryOptions.find((o) => o.id === selectedDelivery)?.price === 0
//                           ? "FREE"
//                           : deliveryOptions.find((o) => o.id === selectedDelivery)?.price! > 0
//                             ? `$${deliveryOptions.find((o) => o.id === selectedDelivery)?.price?.toFixed(2)}`
//                             : `-$${Math.abs(deliveryOptions.find((o) => o.id === selectedDelivery)?.price || 0).toFixed(2)}`}
//                       </span>
//                     </div>
//                     <div className="border-t pt-2 flex justify-between font-bold">
//                       <span>Total:</span>
//                       <span>
//                         $
//                         {(totalPrice + (deliveryOptions.find((o) => o.id === selectedDelivery)?.price || 0)).toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm text-gray-600">
//                       <span>Total Carbon Impact:</span>
//                       <span>
//                         {(
//                           totalCarbonFootprint +
//                           (deliveryOptions.find((o) => o.id === selectedDelivery)?.carbonImpact || 0)
//                         ).toFixed(1)}{" "}
//                         kg CO₂e
//                       </span>
//                     </div>
//                   </div>
//                   <Button
//                    className="w-full mt-4 walmart-blue hover:bg-blue-700"
//                    onClick={() => {
//                     let totalGreenPoints = 0;

//                     // Add GreenPoints for eco-friendly products (based on carbon savings)
//                     items.forEach((item) => {
//                       if (item.brand === "Eco-Friendly") {
//                         // Assuming Eco-Friendly products have a carbonFootprint that's 60% of their original,
//                         // we can estimate the original to calculate savings. This is a simplification.
//                         // A more robust solution would store original carbon footprint before swap.
//                         const estimatedOriginalCarbon = item.carbonFootprint / 0.6;
//                         const carbonSaved = estimatedOriginalCarbon - item.carbonFootprint;
//                         const greenPoints = Math.max(10, Math.floor(carbonSaved * 3)); // Recalculate green points based on savings
//                         totalGreenPoints += greenPoints;
//                       }
//                     });

//                     // Add GreenPoints for selected delivery option
//                     const selectedOption = deliveryOptions.find((o) => o.id === selectedDelivery);
//                     if (selectedOption?.greenPoints) {
//                       totalGreenPoints += selectedOption.greenPoints;
//                     }

//                     onAddGreenPoints(totalGreenPoints); // Final point update
//                     onClose();                          // Close the cart
//                     router.push("/");                   // Redirect to homepage
//                   }}
//                 >
//                   Proceed to Checkout
//                 </Button>

//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Fix for TARGET_PRODUCT_DATA property on window

// declare global {
//   interface Window {
//     TARGET_PRODUCT_DATA?: Array<{
//       id: string;
//       name: string;
//       brand: string;
//       imageUrl?: string;
//       price?: number;
//       carbonFootprint?: number;
//       category?: string;
//     }>;
//   }
// }


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Minus, Plus, Leaf, Award, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { mockDatabase } from "@/lib/database"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  carbonFootprint: number
  category: string
  brand: string
}

interface EcoAlternative {
  id: string
  name: string
  price: number
  imageUrl: string
  carbonFootprint: number // Corrected typo here (footfootprint -> footprint)
  carbonSaving: number
  greenPointsReward: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onSwapProduct: (originalId: string, alternativeId: string) => void
  onAddGreenPoints: (points: number) => void
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSwapProduct,
  onAddGreenPoints,
}: ShoppingCartProps) {
  const [showEcoSwap, setShowEcoSwap] = useState<string | null>(null)
  const [selectedDelivery, setSelectedDelivery] = useState("standard")
  // Track which products have been swapped
  // We'll store the original item ID mapped to its eco-alternative ID for accurate point calculation
  const [swappedProductMap, setSwappedProductMap] = useState<Map<string, string>>(new Map());
  const router = useRouter();

  if (!isOpen) return null

  function getProductImage(name: string) {
    const lower = name.toLowerCase();
    if (lower.includes("banana")) return "/banana.png";
    if (lower.includes("milk")) return "/milk.png";
    if (lower.includes("led") || lower.includes("bulb")) return "/led.png";
    if (lower.includes("spinach")) return "/spinach.png";
    if (lower.includes("bread")) return "/bread.png";
    if (lower.includes("detergent") || lower.includes("cleaner")) return "/cleaner.png";
    if (lower.includes("t-shirt") || lower.includes("shirt")) return "/shirt.png";
    if (lower.includes("earbuds") || lower.includes("headphones")) return "/headphones.png";
    if (lower.includes("quinoa")) return "/quinoa.png";
    // fallback image
    return "/placeholder.svg";
  }

  // Helper to get product name from database
  function getProductNameFromDatabase(id: string) {
    const product = mockDatabase.find((p: any) => p.id === id);
    return product ? product.name : undefined;
  }

  // Helper to get product from database
  function getProductFromDatabase(id: string) {
    return mockDatabase.find((p: any) => p.id === id);
  }

  // Mock eco alternatives with better data
  const getEcoAlternative = (item: CartItem): EcoAlternative | null => {
    // This is where you might dynamically generate alternatives or fetch them.
    // For now, we'll continue using your mock data structure and logic.
    // Note: The `alternatives` object is static, so the dynamic search in mockDatabase is more relevant.
    // We'll prioritize the dynamic search.

    // Extract main keyword from original product name
    const keywords = [
      "banana", "milk", "bread", "detergent", "spinach", "bulb", "t-shirt", "earbuds", "quinoa", "cleaner"
    ];
    const lowerName = item.name.toLowerCase();
    const matchedKeyword = keywords.find((kw) => lowerName.includes(kw));

    // Find eco-friendly product in database that matches both category and keyword
    const ecoProduct = mockDatabase.find(
      (p) =>
        p.category === item.category &&
        p.brand !== item.brand && // Ensure it's a different brand for an alternative
        matchedKeyword && p.name.toLowerCase().includes(matchedKeyword) &&
        (p.name.toLowerCase().includes("organic") || p.name.toLowerCase().includes("eco") || p.name.toLowerCase().includes("green") || p.name.toLowerCase().includes("plant-based") || p.name.toLowerCase().includes("recycled") || p.name.toLowerCase().includes("sustainable"))
    );

    if (ecoProduct && ecoProduct.carbonFootprint !== undefined) {
      // Calculate green points based on carbon saving, ensuring a minimum reward
      const carbonSaving = item.carbonFootprint - ecoProduct.carbonFootprint;
      const greenPointsReward = Math.max(10, Math.floor(carbonSaving * 3)); // Adjust multiplier as needed

      return {
        id: ecoProduct.id,
        name: ecoProduct.name,
        price: ecoProduct.price,
        imageUrl: ecoProduct.imageUrl || getProductImage(ecoProduct.name),
        carbonFootprint: ecoProduct.carbonFootprint,
        carbonSaving: carbonSaving,
        greenPointsReward: greenPointsReward,
      }
    }

    // If no valid eco product from mockDatabase, check the hardcoded alternatives for a match
    // This part is less dynamic but could serve as a fallback or specific curated alternatives.
    const hardcodedAlternatives: { [key: string]: EcoAlternative } = {
      "banana": { id: "eco-1", name: "Organic Bananas, 2 lb (Local Farm)", price: 3.48, imageUrl: "/banana.png", carbonFootprint: 1.2, carbonSaving: item.carbonFootprint - 1.2, greenPointsReward: 15, },
      "milk": { id: "eco-3", name: "Organic Whole Milk, 1 Gallon (Local Dairy)", price: 4.29, imageUrl: "/milk.png", carbonFootprint: 8.5, carbonSaving: item.carbonFootprint - 8.5, greenPointsReward: 20, },
      "bulb": { id: "eco-2", name: "Energy Star LED Bulb, 60W", price: 4.97, imageUrl: "/led.png", carbonFootprint: 4.2, carbonSaving: item.carbonFootprint - 4.2, greenPointsReward: 25, },
      "spinach": { id: "eco-4", name: "Organic Baby Spinach, 5 oz (Locally Grown)", price: 3.29, imageUrl: "/spinach.png", carbonFootprint: 1.0, carbonSaving: item.carbonFootprint - 1.0, greenPointsReward: 12, },
      "bread": { id: "eco-5", name: "100% Whole Wheat Bread, 20 oz (Organic)", price: 2.79, imageUrl: "/bread.png", carbonFootprint: 2.1, carbonSaving: item.carbonFootprint - 2.1, greenPointsReward: 15, },
      // Add more as needed
    };

    if (matchedKeyword && hardcodedAlternatives[matchedKeyword]) {
        const alt = hardcodedAlternatives[matchedKeyword];
        return {
            ...alt,
            carbonSaving: item.carbonFootprint - alt.carbonFootprint,
            greenPointsReward: Math.max(10, Math.floor((item.carbonFootprint - alt.carbonFootprint) * 3)),
        };
    }

    // If no valid eco product, do not suggest swap
    return null;
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCarbonFootprint = items.reduce((sum, item) => sum + item.carbonFootprint * item.quantity, 0)

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "3-5 days",
      price: 0,
      carbonImpact: 2.1,
      vehicle: "Standard truck",
    },
    {
      id: "eco-local",
      name: "Eco-Local Delivery",
      time: "2-3 days",
      price: 0,
      carbonImpact: 1.2,
      vehicle: "Electric vehicle",
      greenPoints: 10,
    },
    {
      id: "eco-delay",
      name: "Eco-Delay Delivery",
      time: "5-7 days",
      price: -2.0,
      carbonImpact: 0.8,
      vehicle: "Batch delivery",
      greenPoints: 20,
      discount: true,
    },
  ]

  const handleSwapProduct = (originalId: string, alternative: EcoAlternative) => {
    const originalItem = items.find((item) => item.id === originalId)
    if (!originalItem) return

    // Create the new CartItem based on the EcoAlternative
    const newCartItem: CartItem = {
      id: alternative.id,
      name: alternative.name,
      price: alternative.price,
      quantity: originalItem.quantity,
      imageUrl: alternative.imageUrl,
      carbonFootprint: alternative.carbonFootprint,
      category: originalItem.category, // Keep original category for consistency
      brand: alternative.name.split(' ')[0], // Infer brand from the alternative's name, or set a generic 'Eco'
    }

    onRemoveItem(originalId)
    onSwapProduct(originalId, newCartItem.id) // This updates the global cart state
    setSwappedProductMap((prevMap) => new Map(prevMap).set(originalId, newCartItem.id)); // Track the swap
    setShowEcoSwap(null)
    console.log(`Swapped ${originalItem.name} for ${newCartItem.name}!`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Cart ({items.length})</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {items.map((item) => {
                // Determine if this item was originally swapped
                const wasSwapped = Array.from(swappedProductMap.values()).includes(item.id);
                const originalItemForSwapped = wasSwapped ? items.find(i => swappedProductMap.get(i.id) === item.id) : null;

                // Get the eco alternative based on the item (if it's not already an eco-friendly item by brand)
                // If it was already swapped, get the alternative based on its *original* form
                const ecoAlternative = item.brand !== "Eco-Friendly" ? getEcoAlternative(item) : null;
                const canSwap = item.brand !== "Eco-Friendly";

                function getEcoImage(ecoAlt: EcoAlternative) {
                  const dbProduct = mockDatabase.find((p: any) => p.id === ecoAlt.id); // Look up by ID for consistency
                  return dbProduct?.imageUrl || ecoAlt.imageUrl || getProductImage(ecoAlt.name) || "/placeholder.svg";
                }
                
                // Adjusted image logic to correctly display swapped product images
                function getCurrentItemImage(item: CartItem) {
                    const dbProduct = mockDatabase.find((p: any) => p.id === item.id);
                    if (dbProduct && dbProduct.imageUrl) {
                        return dbProduct.imageUrl;
                    }
                    if (typeof window !== 'undefined' && window.TARGET_PRODUCT_DATA) {
                        const targetProduct = window.TARGET_PRODUCT_DATA.find(p => p.id === item.id);
                        if (targetProduct && targetProduct.imageUrl) {
                            return targetProduct.imageUrl;
                        }
                    }
                    return item.imageUrl || getProductImage(item.name) || "/placeholder.svg";
                }


                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex space-x-3">
                      <Image
                        src={getCurrentItemImage(item)}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs">{item.brand}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={`text-xs ${
                              item.carbonFootprint < 3
                                ? "carbon-low"
                                : item.carbonFootprint < 8
                                  ? "carbon-medium"
                                  : "carbon-high"
                            }`}
                          >
                            {item.carbonFootprint.toFixed(1)} kg CO₂e
                          </Badge>
                          {item.brand === "Eco-Friendly" && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Leaf className="h-3 w-3 mr-1" /> Eco-Friendly
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Eco Alternative Suggestion */}
                    {ecoAlternative && showEcoSwap !== item.id && canSwap && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-800">Greener Alternative Available!</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <Image
                            src={getEcoImage(ecoAlternative)}
                            alt={ecoAlternative.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover flex-shrink-0 mr-3"
                          />
                          <div>
                            <h4 className="font-semibold text-sm text-green-800 line-clamp-2">{ecoAlternative.name}</h4>
                            <div className="flex items-center space-x-2 mt-1 flex-wrap">
                              <Badge className="carbon-low text-xs">
                                {ecoAlternative.carbonFootprint.toFixed(1)} kg CO₂e
                              </Badge>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Award className="h-3 w-3 mr-1" />+{ecoAlternative.greenPointsReward} points
                              </Badge>
                            </div>
                            <span className="font-bold text-green-800">${ecoAlternative.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-green-700 mb-2">
                          Save {ecoAlternative.carbonSaving.toFixed(1)} kg CO₂e and earn {ecoAlternative.greenPointsReward} GreenPoints
                        </p>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => setShowEcoSwap(item.id)}
                        >
                          View Alternative
                        </Button>
                      </div>
                    )}
                    {/* Eco Alternative Details */}
                    {showEcoSwap === item.id && ecoAlternative && canSwap && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-sm text-green-800">Eco-Friendly Alternative</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowEcoSwap(null)}
                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex space-x-3">
                          <Image
                            src={getEcoImage(ecoAlternative)}
                            alt={ecoAlternative.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-green-800 line-clamp-2">{ecoAlternative.name}</h4>
                            <div className="flex items-center space-x-2 mt-1 flex-wrap">
                              <Badge className="carbon-low text-xs">
                                {ecoAlternative.carbonFootprint.toFixed(1)} kg CO₂e
                              </Badge>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Award className="h-3 w-3 mr-1" />+{ecoAlternative.greenPointsReward} points
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-green-800">${ecoAlternative.price.toFixed(2)}</span>
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleSwapProduct(item.id, ecoAlternative)}
                                >
                                  Swap Now
                                </Button>
                              </div>
                            </div>
                            {/* Benefits Summary */}
                            <div className="mt-2 p-2 bg-white rounded border border-green-200">
                              <div className="text-xs text-green-700 space-y-1">
                                <div className="flex justify-between">
                                  <span>Carbon Savings:</span>
                                  <span className="font-semibold">
                                    -{ecoAlternative.carbonSaving.toFixed(1)} kg CO₂e
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>GreenPoints Earned:</span>
                                  <span className="font-semibold">+{ecoAlternative.greenPointsReward}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Price Difference:</span>
                                  <span
                                    className={`font-semibold ${ecoAlternative.price > item.price ? "text-orange-600" : "text-green-600"}`}
                                  >
                                    {ecoAlternative.price > item.price ? "+" : ""}${(ecoAlternative.price - item.price).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              {/* Delivery Options */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Truck className="h-5 w-5" />
                    <span>Delivery Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedDelivery === option.id
                          ? "border-walmart-blue bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDelivery(option.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="font-semibold text-sm">{option.name}</span>
                            {option.greenPoints && (
                              <Badge className="eco-badge text-xs">+{option.greenPoints} points</Badge>
                            )}
                            {option.discount && <Badge className="bg-red-100 text-red-800 text-xs">Save $2.00</Badge>}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {option.time} • {option.vehicle}
                          </p>
                          <p className="text-xs text-gray-500">{option.carbonImpact.toFixed(1)} kg CO₂e</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm">
                            {option.price === 0
                              ? "FREE"
                              : option.price > 0
                                ? `$${option.price.toFixed(2)}`
                                : `-$${Math.abs(option.price || 0).toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {/* Cart Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span>
                        {deliveryOptions.find((o) => o.id === selectedDelivery)?.price === 0
                          ? "FREE"
                          : deliveryOptions.find((o) => o.id === selectedDelivery)?.price! > 0
                            ? `$${deliveryOptions.find((o) => o.id === selectedDelivery)?.price?.toFixed(2)}`
                            : `-$${Math.abs(deliveryOptions.find((o) => o.id === selectedDelivery)?.price || 0).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>
                        $
                        {(totalPrice + (deliveryOptions.find((o) => o.id === selectedDelivery)?.price || 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Total Carbon Impact:</span>
                      <span>
                        {(
                          totalCarbonFootprint +
                          (deliveryOptions.find((o) => o.id === selectedDelivery)?.carbonImpact || 0)
                        ).toFixed(1)}{" "}
                        kg CO₂e
                      </span>
                    </div>
                  </div>
                  <Button
                   className="w-full mt-4 walmart-blue hover:bg-blue-700"
                   onClick={() => {
                    let totalGreenPoints = 0;

                    // Add GreenPoints for eco-friendly products that are currently in the cart
                    items.forEach((item) => {
                      // Check if the current item ID is a value in the swappedProductMap
                      // This means it's an eco-alternative that was swapped into the cart
                      if (Array.from(swappedProductMap.values()).includes(item.id)) {
                        // Find the original item that this eco-item replaced
                        const originalId = Array.from(swappedProductMap.keys()).find(key => swappedProductMap.get(key) === item.id);
                        if (originalId) {
                          // Find the original item object from the mockDatabase
                          const originalItem = mockDatabase.find(p => p.id === originalId);
                          if (originalItem) {
                            // Get the eco alternative details based on the original item's properties
                            const ecoAlternative = getEcoAlternative(originalItem as CartItem);
                            if (ecoAlternative) {
                                totalGreenPoints += ecoAlternative.greenPointsReward * item.quantity; // Multiply by quantity
                            }
                          }
                        }
                      }
                    });

                    // Add GreenPoints for selected delivery option
                    const selectedOption = deliveryOptions.find((o) => o.id === selectedDelivery);
                    if (selectedOption?.greenPoints) {
                      totalGreenPoints += selectedOption.greenPoints;
                    }

                    onAddGreenPoints(totalGreenPoints); // Final point update
                    onClose();                          // Close the cart
                    router.push("/");                   // Redirect to homepage
                  }}
                >
                  Proceed to Checkout
                </Button>

                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Fix for TARGET_PRODUCT_DATA property on window

declare global {
  interface Window {
    TARGET_PRODUCT_DATA?: Array<{
      id: string;
      name: string;
      brand: string;
      imageUrl?: string;
      price?: number;
      carbonFootprint?: number;
      category?: string;
    }>;
  }
}