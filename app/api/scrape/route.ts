import { NextResponse } from "next/server"
import { scrapeWalmartProducts } from "@/lib/scraper"
import { saveProducts } from "@/lib/database"

export async function POST() {
  try {
    console.log("Starting product scraping...")

    // Scrape products from Walmart
    const scrapedProducts = await scrapeWalmartProducts()

    if (scrapedProducts.length === 0) {
      return NextResponse.json({ error: "No products were scraped" }, { status: 400 })
    }

    // Save to database
    await saveProducts(scrapedProducts)

    console.log(`Successfully scraped and saved ${scrapedProducts.length} products`)

    return NextResponse.json({
      success: true,
      count: scrapedProducts.length,
      message: `Successfully scraped ${scrapedProducts.length} products`,
    })
  } catch (error) {
    console.error("Scraping failed:", error)
    return NextResponse.json({ error: "Failed to scrape products" }, { status: 500 })
  }
}
