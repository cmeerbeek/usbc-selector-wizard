/*
  # Product Management Schema

  1. New Tables
    - `sellers` - Store seller information
      - `id` (uuid, primary key)
      - `name` (text) - Seller name
      - `url` (text) - Seller website URL
    
    - `products` - Store product information
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `rating` (numeric) - Product rating
      - `image_url` (text) - Product image URL
      - `device_brand` (text) - Device brand (e.g., 'apple')
      - `device_model` (text) - Device model (e.g., 'iphone-15')
      - `peripheral_type` (text) - Peripheral type (e.g., 'fast-charging')
    
    - `product_sellers` - Junction table for products and sellers with prices
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `seller_id` (uuid, foreign key)
      - `price` (numeric) - Price at this seller
      
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create sellers table
CREATE TABLE sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
  image_url text NOT NULL,
  device_brand text NOT NULL,
  device_model text NOT NULL,
  peripheral_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create product_sellers junction table
CREATE TABLE product_sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES sellers(id) ON DELETE CASCADE,
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sellers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on sellers" ON sellers
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on product_sellers" ON product_sellers
  FOR SELECT TO public USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_products_device_brand ON products(device_brand);
CREATE INDEX idx_products_device_model ON products(device_model);
CREATE INDEX idx_products_peripheral_type ON products(peripheral_type);
CREATE INDEX idx_product_sellers_product_id ON product_sellers(product_id);
CREATE INDEX idx_product_sellers_seller_id ON product_sellers(seller_id);