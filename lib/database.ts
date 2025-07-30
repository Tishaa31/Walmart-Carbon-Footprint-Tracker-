// // Database connection and operations
// // Note: In production, use environment variables for database connection

// interface Product {
//   id: string
//   name: string
//   description: string
//   price: number
//   imageUrl: string
//   walmartUrl: string
//   category: string
//   brand: string
//   carbonFootprint?: number
//   createdAt: string
// }

// // Mock database with more realistic Walmart and Target products with proper images
// let mockDatabase: Product[] = [
//   {
//     id: "1",
//     name: "Great Value Organic Bananas, 2 lb",
//     description:
//       "Fresh organic bananas, perfect for snacking, smoothies, or baking. Sustainably grown and ethically sourced.",
//     price: 2.98,
//     imageUrl:
//       "https://i5.walmartimages.com/asr/c85c2f6b-3e8b-4e5b-9c5b-8b5c5e5c5e5c/1.256e3b5c5e5c5e5c5e5c5e5c5e5c5e5c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/1",
//     category: "Fresh Produce",
//     brand: "Great Value",
//     carbonFootprint: 2.1,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     name: "Philips LED Light Bulb, 60W Equivalent",
//     description:
//       "Energy efficient LED bulb with 10-year lifespan. Reduces energy consumption by 80% compared to traditional bulbs.",
//     price: 4.97,
//     imageUrl:
//       "https://i5.walmartimages.com/asr/8b5c5e5c-5e5c-5e5c-5e5c-5e5c5e5c5e5c/1.5e5c5e5c5e5c5e5c5e5c5e5c5e5c5e5c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/2",
//     category: "Home & Garden",
//     brand: "Philips",
//     carbonFootprint: 8.5,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "3",
//     name: "Great Value Whole Milk, 1 Gallon",
//     description: "Fresh whole milk from local dairy farms. Rich in calcium and protein for the whole family.",
//     price: 3.48,
//     imageUrl:
//       "https://i5.walmartimages.com/asr/5b5c5e5c-5e5c-5e5c-5e5c-5e5c5e5c5e5c/1.5e5c5e5c5e5c5e5c5e5c5e5c5e5c5e5c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/3",
//     category: "Dairy",
//     brand: "Great Value",
//     carbonFootprint: 12.3,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "4",
//     name: "Marketside Organic Baby Spinach, 5 oz",
//     description: "Fresh organic baby spinach leaves, pre-washed and ready to eat. Perfect for salads and cooking.",
//     price: 2.48,
//     imageUrl: "https://i5.walmartimages.com/asr/fresh-spinach-leaves/1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/4",
//     category: "Fresh Produce",
//     brand: "Marketside",
//     carbonFootprint: 1.8,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "5",
//     name: "Great Value Whole Wheat Bread, 20 oz",
//     description: "Soft and nutritious whole wheat bread made with quality ingredients. No artificial preservatives.",
//     price: 1.98,
//     imageUrl: "https://i5.walmartimages.com/asr/whole-wheat-bread/1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/5",
//     category: "Bakery",
//     brand: "Great Value",
//     carbonFootprint: 3.2,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "6",
//     name: "Tide Eco-Box Liquid Laundry Detergent, 105 fl oz",
//     description:
//       "Concentrated liquid laundry detergent in eco-friendly packaging. 75% less plastic than traditional bottles.",
//     price: 11.97,
//     imageUrl: "https://i5.walmartimages.com/asr/tide-eco-box/1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//     walmartUrl: "https://walmart.com/product/6",
//     category: "Home & Garden",
//     brand: "Tide",
//     carbonFootprint: 6.8,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "7",
//     name: "Good & Gather Organic Bananas, 2 lb",
//     description:
//       "Fresh organic bananas, perfect for snacking, smoothies, or baking. USDA Organic certified and sustainably grown.",
//     price: 2.79,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_organic-bananas?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/organic-bananas-2lb/1",
//     category: "Fresh Produce",
//     brand: "Good & Gather",
//     carbonFootprint: 1.8,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "8",
//     name: "Brightroom LED Light Bulb, 60W Equivalent",
//     description:
//       "Energy efficient LED bulb with 15-year lifespan. ENERGY STAR certified and reduces energy consumption by 85%.",
//     price: 3.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_led-bulb?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/led-light-bulb-60w/2",
//     category: "Home & Garden",
//     brand: "Brightroom",
//     carbonFootprint: 6.2,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "9",
//     name: "Good & Gather Organic Whole Milk, 1 Gallon",
//     description: "Fresh organic whole milk from pasture-raised cows. rBST-free and rich in calcium and protein.",
//     price: 4.29,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_organic-milk?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/organic-whole-milk-1gal/3",
//     category: "Dairy",
//     brand: "Good & Gather",
//     carbonFootprint: 10.8,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "10",
//     name: "Good & Gather Organic Baby Spinach, 5 oz",
//     description: "Fresh organic baby spinach leaves, triple-washed and ready to eat. Perfect for salads and cooking.",
//     price: 2.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_baby-spinach?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/organic-baby-spinach-5oz/4",
//     category: "Fresh Produce",
//     brand: "Good & Gather",
//     carbonFootprint: 1.5,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "11",
//     name: "Good & Gather Whole Wheat Bread, 20 oz",
//     description:
//       "Soft whole wheat bread made with organic flour. No artificial preservatives or high fructose corn syrup.",
//     price: 2.49,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_wheat-bread?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/whole-wheat-bread-20oz/5",
//     category: "Bakery",
//     brand: "Good & Gather",
//     carbonFootprint: 2.8,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "12",
//     name: "Everspring Concentrated Laundry Detergent, 100 fl oz",
//     description: "Plant-based laundry detergent in recyclable packaging. EPA Safer Choice certified and biodegradable.",
//     price: 8.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_everspring-detergent?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/everspring-laundry-detergent/6",
//     category: "Home & Garden",
//     brand: "Everspring",
//     carbonFootprint: 4.5,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "13",
//     name: "Wild Fable Organic Cotton T-Shirt",
//     description:
//       "100% organic cotton t-shirt made with sustainable practices. Fair Trade certified and ethically sourced.",
//     price: 12.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_organic-tshirt?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/organic-cotton-tshirt/7",
//     category: "Clothing",
//     brand: "Wild Fable",
//     carbonFootprint: 5.2,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "14",
//     name: "Heyday Wireless Earbuds",
//     description:
//       "Bluetooth wireless earbuds with recycled plastic housing. 6-hour battery life and sustainable packaging.",
//     price: 29.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_wireless-earbuds?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/heyday-wireless-earbuds/8",
//     category: "Electronics",
//     brand: "Heyday",
//     carbonFootprint: 15.3,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "15",
//     name: "Good & Gather Organic Quinoa, 16 oz",
//     description: "Premium organic quinoa, sustainably sourced from Bolivia. High in protein and naturally gluten-free.",
//     price: 4.99,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_organic-quinoa?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/organic-quinoa-16oz/9",
//     category: "Pantry",
//     brand: "Good & Gather",
//     carbonFootprint: 2.1,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "16",
//     name: "Everspring All-Purpose Cleaner, 28 fl oz",
//     description: "Plant-based all-purpose cleaner with biodegradable formula. Cruelty-free and safe for families.",
//     price: 3.49,
//     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_eco-cleaner?wid=488&hei=488&fmt=pjpeg",
//     walmartUrl: "https://target.com/p/everspring-all-purpose-cleaner/10",
//     category: "Home & Garden",
//     brand: "Everspring",
//     carbonFootprint: 1.9,
//     createdAt: new Date().toISOString(),
//   },
// ]

// export async function getProducts(): Promise<Product[]> {
//   // Simulate database query delay
//   await new Promise((resolve) => setTimeout(resolve, 300))
//   return mockDatabase
// }

// export async function saveProducts(products: Omit<Product, "id" | "createdAt">[]): Promise<void> {
//   // Simulate database save delay
//   await new Promise((resolve) => setTimeout(resolve, 800))

//   const newProducts = products.map((product) => ({
//     ...product,
//     id: Math.random().toString(36).substr(2, 9),
//     createdAt: new Date().toISOString(),
//   }))

//   mockDatabase = [...mockDatabase, ...newProducts]
// }

// export async function initializeDatabase(): Promise<void> {
//   console.log("Database initialized with Target product data")
// }

// // SQL Schema remains the same for PostgreSQL
// export const DATABASE_SCHEMA = `
// -- Products table
// CREATE TABLE IF NOT EXISTS products (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     image_url TEXT,
//     walmart_url TEXT NOT NULL,
//     category VARCHAR(100),
//     brand VARCHAR(100),
//     weight DECIMAL(10, 2), -- in kg
//     carbon_footprint DECIMAL(10, 2), -- kg CO2 equivalent
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Categories table
// CREATE TABLE IF NOT EXISTS categories (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL UNIQUE,
//     carbon_factor DECIMAL(10, 4), -- CO2 per unit weight
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Suppliers table
// CREATE TABLE IF NOT EXISTS suppliers (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- GreenPoints ledger
// CREATE TABLE IF NOT EXISTS green_points_ledger (
//     id SERIAL PRIMARY KEY,
//     user_id VARCHAR(255) NOT NULL,
//     points INTEGER NOT NULL,
//     action_type VARCHAR(100) NOT NULL,
//     product_id INTEGER REFERENCES products(id),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Warehouses table for delivery optimization
// CREATE TABLE IF NOT EXISTS warehouses (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     latitude DECIMAL(10, 8),
//     longitude DECIMAL(11, 8),
//     ev_fleet_percentage DECIMAL(5, 2) DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Indexes for better performance
// CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
// CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
// CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
// CREATE INDEX IF NOT EXISTS idx_green_points_user_id ON green_points_ledger(user_id);
// CREATE INDEX IF NOT EXISTS idx_green_points_created_at ON green_points_ledger(created_at);
// `



// Database connection and operations
// Note: In production, use environment variables for database connection

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

// Mock database with more realistic Walmart and Target products with proper images
export let mockDatabase: Product[] = [
  {
    id: "1",
    name: "Great Value Organic Bananas, 2 lb",
    description:
      "Fresh organic bananas, perfect for snacking, smoothies, or baking. Sustainably grown and ethically sourced.",
    price: 2.98,
    imageUrl:"/banana.png",
    walmartUrl: "/banana.png",
    category: "Fresh Produce",
    brand: "Great Value",
    carbonFootprint: 2.1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Philips LED Light Bulb, 60W Equivalent",
    description:
      "Energy efficient LED bulb with 10-year lifespan. Reduces energy consumption by 80% compared to traditional bulbs.",
    price: 4.97,
    imageUrl:"/led.png",
    walmartUrl: "/led.png",
    category: "Home & Garden",
    brand: "Philips",
    carbonFootprint: 8.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Great Value Whole Milk, 1 Gallon",
    description: "Fresh whole milk from local dairy farms. Rich in calcium and protein for the whole family.",
    price: 3.48,
    imageUrl:"/milk.png",
    walmartUrl: "/milk.png",
    category: "Dairy",
    brand: "Great Value",
    carbonFootprint: 12.3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Marketside Organic Baby Spinach, 5 oz",
    description: "Fresh organic baby spinach leaves, pre-washed and ready to eat. Perfect for salads and cooking.",
    price: 2.48,
    imageUrl: "/spinach.png",
    walmartUrl: "https://walmart.com/product/4",
    category: "Fresh Produce",
    brand: "Marketside",
    carbonFootprint: 1.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Great Value Whole Wheat Bread, 20 oz",
    description: "Soft and nutritious whole wheat bread made with quality ingredients. No artificial preservatives.",
    price: 1.98,
    imageUrl: "/bread.png",
    walmartUrl: "https://walmart.com/product/5",
    category: "Bakery",
    brand: "Great Value",
    carbonFootprint: 3.2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Tide Eco-Box Liquid Laundry Detergent, 105 fl oz",
    description:
      "Concentrated liquid laundry detergent in eco-friendly packaging. 75% less plastic than traditional bottles.",
    price: 11.97,
    imageUrl: "/cleaner.png",
    walmartUrl: "https://walmart.com/product/6",
    category: "Home & Garden",
    brand: "Tide",
    carbonFootprint: 6.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Good & Gather Organic Bananas, 2 lb",
    description:
      "Fresh organic bananas, perfect for snacking, smoothies, or baking. USDA Organic certified and sustainably grown.",
    price: 2.79,
    imageUrl: "/banana.png",
    walmartUrl: "https://target.com/p/organic-bananas-2lb/1",
    category: "Fresh Produce",
    brand: "Good & Gather",
    carbonFootprint: 1.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Brightroom LED Light Bulb, 60W Equivalent",
    description:
      "Energy efficient LED bulb with 15-year lifespan. ENERGY STAR certified and reduces energy consumption by 85%.",
    price: 3.99,
    imageUrl: "/led.png",
    walmartUrl: "/led.png",
    category: "Home & Garden",
    brand: "Brightroom",
    carbonFootprint: 6.2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Good & Gather Organic Whole Milk, 1 Gallon",
    description: "Fresh organic whole milk from pasture-raised cows. rBST-free and rich in calcium and protein.",
    price: 4.29,
    imageUrl: "/milk.png",
    walmartUrl: "/milk.png",
    category: "Dairy",
    brand: "Good & Gather",
    carbonFootprint: 10.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Good & Gather Organic Baby Spinach, 5 oz",
    description: "Fresh organic baby spinach leaves, triple-washed and ready to eat. Perfect for salads and cooking.",
    price: 2.99,
    imageUrl: "/spinach.png",
    walmartUrl: "https://target.com/p/organic-baby-spinach-5oz/4",
    category: "Fresh Produce",
    brand: "Good & Gather",
    carbonFootprint: 1.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    name: "Good & Gather Whole Wheat Bread, 20 oz",
    description:
      "Soft whole wheat bread made with organic flour. No artificial preservatives or high fructose corn syrup.",
    price: 2.49,
    imageUrl: "/bread.png",
    walmartUrl: "https://target.com/p/whole-wheat-bread-20oz/5",
    category: "Bakery",
    brand: "Good & Gather",
    carbonFootprint: 2.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    name: "Everspring Concentrated Laundry Detergent, 100 fl oz",
    description: "Plant-based laundry detergent in recyclable packaging. EPA Safer Choice certified and biodegradable.",
    price: 8.99,
    imageUrl: "/cleaner.png",
    walmartUrl: "https://target.com/p/everspring-laundry-detergent/6",
    category: "Home & Garden",
    brand: "Everspring",
    carbonFootprint: 4.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "13",
    name: "Wild Fable Organic Cotton T-Shirt",
    description:
      "100% organic cotton t-shirt made with sustainable practices. Fair Trade certified and ethically sourced.",
    price: 12.99,
    imageUrl: "/shirt.png",
    walmartUrl: "https://target.com/p/organic-cotton-tshirt/7",
    category: "Clothing",
    brand: "Wild Fable",
    carbonFootprint: 5.2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "14",
    name: "Heyday Wireless Earbuds",
    description:
      "Bluetooth wireless earbuds with recycled plastic housing. 6-hour battery life and sustainable packaging.",
    price: 29.99,
    imageUrl: "/headphones.png",
    walmartUrl: "https://target.com/p/heyday-wireless-earbuds/8",
    category: "Electronics",
    brand: "Heyday",
    carbonFootprint: 15.3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Good & Gather Organic Quinoa, 16 oz",
    description: "Premium organic quinoa, sustainably sourced from Bolivia. High in protein and naturally gluten-free.",
    price: 4.99,
    imageUrl: "/quinoa.png",
    walmartUrl: "https://target.com/p/organic-quinoa-16oz/9",
    category: "Pantry",
    brand: "Good & Gather",
    carbonFootprint: 2.1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "16",
    name: "Everspring All-Purpose Cleaner, 28 fl oz",
    description: "Plant-based all-purpose cleaner with biodegradable formula. Cruelty-free and safe for families.",
    price: 3.49,
    imageUrl: "/cleaner.png",
    walmartUrl: "https://target.com/p/everspring-all-purpose-cleaner/10",
    category: "Home & Garden",
    brand: "Everspring",
    carbonFootprint: 1.9,
    createdAt: new Date().toISOString(),
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockDatabase
}

export async function saveProducts(products: Omit<Product, "id" | "createdAt">[]): Promise<void> {
  // Simulate database save delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newProducts = products.map((product) => ({
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  }))

  mockDatabase = [...mockDatabase, ...newProducts]
}

export async function initializeDatabase(): Promise<void> {
  console.log("Database initialized with Target product data")
}

// SQL Schema remains the same for PostgreSQL
export const DATABASE_SCHEMA = `
-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    walmart_url TEXT NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    weight DECIMAL(10, 2), -- in kg
    carbon_footprint DECIMAL(10, 2), -- kg CO2 equivalent
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    carbon_factor DECIMAL(10, 4), -- CO2 per unit weight
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GreenPoints ledger
CREATE TABLE IF NOT EXISTS green_points_ledger (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    product_id INTEGER REFERENCES products(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warehouses table for delivery optimization
CREATE TABLE IF NOT EXISTS warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    ev_fleet_percentage DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_green_points_user_id ON green_points_ledger(user_id);
CREATE INDEX IF NOT EXISTS idx_green_points_created_at ON green_points_ledger(created_at);
`
