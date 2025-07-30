#!/usr/bin/env python3
"""
Web Scraping Setup Script for Walmart Product Data
This script demonstrates the setup and ethical considerations for web scraping.

IMPORTANT ETHICAL AND LEGAL CONSIDERATIONS:
1. Always check robots.txt before scraping
2. Implement proper rate limiting
3. Use realistic User-Agent headers
4. Respect the website's terms of service
5. Consider using official APIs when available
"""

import requests
from bs4 import BeautifulSoup
import time
import random
import json
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class EthicalWalmartScraper:
    def __init__(self):
        self.base_url = "https://www.walmart.com"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
        # Rate limiting settings
        self.min_delay = 2  # Minimum delay between requests (seconds)
        self.max_delay = 5  # Maximum delay between requests (seconds)
        
    def check_robots_txt(self) -> bool:
        """Check robots.txt to ensure we're allowed to scrape"""
        try:
            robots_url = urljoin(self.base_url, '/robots.txt')
            response = self.session.get(robots_url)
            robots_content = response.text
            
            logger.info("Robots.txt content preview:")
            logger.info(robots_content[:500] + "..." if len(robots_content) > 500 else robots_content)
            
            # Basic check - look for disallowed paths
            if "Disallow: /" in robots_content:
                logger.warning("Robots.txt contains 'Disallow: /' - proceed with caution")
            
            return True
        except Exception as e:
            logger.error(f"Could not fetch robots.txt: {e}")
            return False
    
    def rate_limit(self):
        """Implement rate limiting between requests"""
        delay = random.uniform(self.min_delay, self.max_delay)
        logger.info(f"Rate limiting: waiting {delay:.2f} seconds...")
        time.sleep(delay)
    
    def scrape_product_page(self, product_url: str) -> Optional[Dict]:
        """
        Scrape a single product page
        NOTE: This is a simplified example - actual implementation would need
        to handle dynamic content, anti-bot measures, etc.
        """
        try:
            self.rate_limit()
            
            response = self.session.get(product_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract product information
            # NOTE: These selectors are examples and may not work with current Walmart site
            product_data = {
                'name': self.extract_product_name(soup),
                'price': self.extract_price(soup),
                'description': self.extract_description(soup),
                'image_url': self.extract_image_url(soup),
                'category': self.extract_category(soup),
                'brand': self.extract_brand(soup),
                'walmart_url': product_url
            }
            
            logger.info(f"Successfully scraped: {product_data.get('name', 'Unknown')}")
            return product_data
            
        except requests.RequestException as e:
            logger.error(f"Request failed for {product_url}: {e}")
            return None
        except Exception as e:
            logger.error(f"Scraping failed for {product_url}: {e}")
            return None
    
    def extract_product_name(self, soup: BeautifulSoup) -> str:
        """Extract product name from page"""
        # Example selectors - these would need to be updated for current site
        selectors = [
            'h1[data-automation-id="product-title"]',
            'h1.prod-ProductTitle',
            'h1#main-title',
            'h1'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text(strip=True)
        
        return "Unknown Product"
    
    def extract_price(self, soup: BeautifulSoup) -> float:
        """Extract price from page"""
        selectors = [
            '[data-automation-id="product-price"]',
            '.price-current',
            '.price-display',
            '[itemprop="price"]'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                price_text = element.get_text(strip=True)
                # Extract numeric value from price text
                import re
                price_match = re.search(r'\$?(\d+\.?\d*)', price_text)
                if price_match:
                    return float(price_match.group(1))
        
        return 0.0
    
    def extract_description(self, soup: BeautifulSoup) -> str:
        """Extract product description"""
        selectors = [
            '[data-automation-id="product-description"]',
            '.about-desc',
            '.product-description',
            '[itemprop="description"]'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text(strip=True)[:500]  # Limit length
        
        return "No description available"
    
    def extract_image_url(self, soup: BeautifulSoup) -> str:
        """Extract main product image URL"""
        selectors = [
            'img[data-automation-id="product-image"]',
            '.prod-hero-image img',
            '.product-image img',
            'img[itemprop="image"]'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                src = element.get('src') or element.get('data-src')
                if src:
                    return urljoin(self.base_url, src)
        
        return ""
    
    def extract_category(self, soup: BeautifulSoup) -> str:
        """Extract product category"""
        # Look for breadcrumbs or category information
        breadcrumb = soup.select_one('.breadcrumb')
        if breadcrumb:
            links = breadcrumb.select('a')
            if len(links) > 1:
                return links[-2].get_text(strip=True)
        
        return "Unknown Category"
    
    def extract_brand(self, soup: BeautifulSoup) -> str:
        """Extract product brand"""
        selectors = [
            '[data-automation-id="product-brand"]',
            '.brand-name',
            '[itemprop="brand"]'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text(strip=True)
        
        return "Unknown Brand"

def main():
    """Main function to demonstrate scraping setup"""
    logger.info("🚀 Starting Walmart Scraper Setup")
    
    scraper = EthicalWalmartScraper()
    
    # Step 1: Check robots.txt
    logger.info("📋 Checking robots.txt...")
    if not scraper.check_robots_txt():
        logger.error("❌ Could not verify robots.txt - stopping")
        return
    
    # Step 2: Sample product URLs for testing
    # NOTE: These are example URLs - replace with actual product URLs
    sample_urls = [
        "https://www.walmart.com/ip/Great-Value-Organic-Bananas-2-lb/44390948",
        "https://www.walmart.com/ip/Great-Value-Whole-Milk-Gallon/10450114",
    ]
    
    logger.info(f"🎯 Scraping {len(sample_urls)} sample products...")
    
    scraped_products = []
    
    for url in sample_urls:
        logger.info(f"Scraping: {url}")
        product_data = scraper.scrape_product_page(url)
        
        if product_data:
            scraped_products.append(product_data)
        else:
            logger.warning(f"Failed to scrape: {url}")
    
    # Step 3: Save results
    if scraped_products:
        output_file = 'scraped_products.json'
        with open(output_file, 'w') as f:
            json.dump(scraped_products, f, indent=2)
        
        logger.info(f"✅ Successfully scraped {len(scraped_products)} products")
        logger.info(f"💾 Results saved to {output_file}")
        
        # Display summary
        for product in scraped_products:
            logger.info(f"  - {product['name']} (${product['price']:.2f})")
    else:
        logger.warning("❌ No products were successfully scraped")
    
    logger.info("🏁 Scraping setup complete")

if __name__ == "__main__":
    main()
