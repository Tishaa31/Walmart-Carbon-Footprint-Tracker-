-- Initialize PostgreSQL database for Carbon Footprint Tracker
-- Run this script to set up the initial database schema

-- Create database (run this separately if needed)
-- CREATE DATABASE carbon_footprint_tracker;

-- Products table - stores scraped product information
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    walmart_url TEXT NOT NULL UNIQUE,
    category VARCHAR(100),
    brand VARCHAR(100),
    weight DECIMAL(10, 2), -- in kg
    carbon_footprint DECIMAL(10, 2), -- kg CO2 equivalent
    scrape_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table - for product categorization and carbon factors
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    carbon_factor DECIMAL(10, 4), -- CO2 per unit weight/volume
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers/Brands table - for tracking sustainability scores
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    website VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carbon footprint calculations table - for tracking calculation methods
CREATE TABLE IF NOT EXISTS carbon_calculations (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    calculation_method VARCHAR(100) NOT NULL,
    base_footprint DECIMAL(10, 2),
    transport_footprint DECIMAL(10, 2),
    packaging_footprint DECIMAL(10, 2),
    total_footprint DECIMAL(10, 2),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scraping logs table - for monitoring scraping activities
CREATE TABLE IF NOT EXISTS scraping_logs (
    id SERIAL PRIMARY KEY,
    url VARCHAR(500),
    status VARCHAR(50), -- 'success', 'failed', 'blocked'
    products_found INTEGER DEFAULT 0,
    error_message TEXT,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_carbon_footprint ON products(carbon_footprint);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_products_walmart_url ON products(walmart_url);

-- Create indexes for carbon calculations
CREATE INDEX IF NOT EXISTS idx_carbon_calculations_product_id ON carbon_calculations(product_id);
CREATE INDEX IF NOT EXISTS idx_carbon_calculations_calculated_at ON carbon_calculations(calculated_at);

-- Create indexes for scraping logs
CREATE INDEX IF NOT EXISTS idx_scraping_logs_scraped_at ON scraping_logs(scraped_at);
CREATE INDEX IF NOT EXISTS idx_scraping_logs_status ON scraping_logs(status);

-- Insert sample categories with carbon factors (kg CO2 per kg of product)
INSERT INTO categories (name, carbon_factor, description) VALUES
('Fresh Produce', 0.5, 'Fruits and vegetables - generally low carbon footprint'),
('Dairy', 3.2, 'Milk, cheese, yogurt - moderate to high carbon footprint'),
('Meat & Seafood', 15.0, 'Animal proteins - highest carbon footprint'),
('Pantry', 1.8, 'Packaged goods, grains, canned items'),
('Bakery', 2.1, 'Bread, pastries, baked goods'),
('Home & Garden', 5.0, 'Non-food items with manufacturing footprint'),
('Electronics', 25.0, 'High manufacturing and material footprint'),
('Clothing', 8.0, 'Textile production and transportation')
ON CONFLICT (name) DO NOTHING;

-- Insert sample suppliers with sustainability scores
INSERT INTO suppliers (name, sustainability_score, website, notes) VALUES
('Great Value', 65, 'https://walmart.com', 'Walmart private label brand'),
('Marketside', 70, 'https://walmart.com', 'Walmart fresh food brand'),
('Equate', 60, 'https://walmart.com', 'Walmart health and wellness brand'),
('Mainstays', 55, 'https://walmart.com', 'Walmart home goods brand'),
('Better Homes & Gardens', 68, 'https://walmart.com', 'Walmart home and garden brand')
ON CONFLICT (name) DO NOTHING;

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update timestamps
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data for testing
INSERT INTO products (name, description, price, image_url, walmart_url, category, brand, weight, carbon_footprint) VALUES
('Organic Bananas, 2 lb', 'Fresh organic bananas, perfect for snacking or smoothies', 2.98, '/placeholder.svg?height=200&width=200', 'https://walmart.com/sample/1', 'Fresh Produce', 'Great Value', 0.91, 0.45),
('Whole Milk, 1 Gallon', 'Fresh whole milk from local farms', 3.48, '/placeholder.svg?height=200&width=200', 'https://walmart.com/sample/2', 'Dairy', 'Great Value', 3.78, 12.10),
('LED Light Bulb, 60W Equivalent', 'Energy efficient LED bulb with 10-year lifespan', 4.97, '/placeholder.svg?height=200&width=200', 'https://walmart.com/sample/3', 'Home & Garden', 'Better Homes & Gardens', 0.15, 0.75)
ON CONFLICT (walmart_url) DO NOTHING;

-- Create a view for products with calculated carbon efficiency
CREATE OR REPLACE VIEW product_carbon_efficiency AS
SELECT 
    p.*,
    CASE 
        WHEN p.carbon_footprint IS NOT NULL AND p.carbon_footprint > 0 
        THEN p.price / p.carbon_footprint 
        ELSE NULL 
    END as price_per_carbon_unit,
    c.carbon_factor,
    s.sustainability_score
FROM products p
LEFT JOIN categories c ON p.category = c.name
LEFT JOIN suppliers s ON p.brand = s.name;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

COMMIT;
