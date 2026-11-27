-- =====================================================================
-- CEBU TECHNOLOGICAL UNIVERSITY (CTU) MERCHANDISE KIOSK
-- Supabase Database Schema & Seed Data
-- Project ID: aograbohxutnakmcnrgm
-- =====================================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tag TEXT,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    in_stock BOOLEAN DEFAULT true,
    stock_count INTEGER DEFAULT 0,
    stock_info TEXT,
    sizes JSONB DEFAULT '[]'::jsonb,
    colors JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Users / Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Student',
    department TEXT,
    campus TEXT DEFAULT 'Main Campus',
    balance NUMERIC(10, 2) DEFAULT 0.00,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'Ready for Pickup',
    pickup_location TEXT DEFAULT 'Campus Store Counter A',
    kiosk_terminal TEXT DEFAULT 'Kiosk Terminal #01',
    payment_method TEXT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    tax NUMERIC(10, 2) DEFAULT 0.00,
    discount NUMERIC(10, 2) DEFAULT 0.00,
    total NUMERIC(10, 2) NOT NULL,
    points_earned INTEGER DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Rewards Table
CREATE TABLE IF NOT EXISTS public.rewards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    cost INTEGER NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Public Read/Write for Kiosk Demo
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public write on products" ON public.products FOR ALL USING (true);

CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public write on profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public write on orders" ON public.orders FOR ALL USING (true);

CREATE POLICY "Allow public read on rewards" ON public.rewards FOR SELECT USING (true);
CREATE POLICY "Allow public write on rewards" ON public.rewards FOR ALL USING (true);

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- Insert Default Student Profile
INSERT INTO public.profiles (id, name, role, department, campus, balance, points)
VALUES (
    'CTU-2024-08219',
    'Dominic Magalso',
    'Student',
    'College of Computer, Information and Communications Technology',
    'Main Campus',
    1250.00,
    450
) ON CONFLICT (id) DO UPDATE SET 
    balance = EXCLUDED.balance,
    points = EXCLUDED.points;

-- Insert Products
INSERT INTO public.products (id, name, tag, category, price, image, gallery, description, in_stock, stock_count, stock_info, sizes, colors)
VALUES 
(
    'ctu-tee-classic',
    'CTU Classic Tee',
    'CAMPUS ESSENTIALS',
    'Apparel',
    350.00,
    '/assets/products/prod_1.png',
    '["/assets/products/prod_1.png", "/assets/products/detail_main.png", "/assets/products/detail_thumb1.png"]'::jsonb,
    'Your everyday campus essential. Soft breathable cotton, a relaxed unisex fit, and bold CTU lettering.',
    true,
    18,
    '18 available in White / M',
    '["S", "M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "White", "hex": "#FFFFFF", "border": "#E5E5E5"}, {"name": "Orange", "hex": "#F47721", "border": "#F47721"}]'::jsonb
),
(
    'ctu-varsity-hoodie',
    'Varsity Hoodie',
    'CAMPUS ESSENTIALS',
    'Apparel',
    850.00,
    '/assets/products/prod_2.jpg',
    '["/assets/products/prod_2.jpg", "/assets/products/prod_8.png"]'::jsonb,
    'Heavyweight premium cotton fleece hoodie featuring embroidered Cebu Technological University crest.',
    true,
    12,
    '12 available across all sizes',
    '["S", "M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "Orange", "hex": "#F47721", "border": "#F47721"}, {"name": "Navy Blue", "hex": "#1B2A4A", "border": "#1B2A4A"}, {"name": "Gray", "hex": "#8A8D91", "border": "#8A8D91"}]'::jsonb
),
(
    'ctu-everyday-tote',
    'Everyday Tote',
    'DAILY COMPANIONS',
    'Accessories',
    250.00,
    '/assets/products/prod_3.jpg',
    '["/assets/products/prod_3.jpg"]'::jsonb,
    'Heavy-duty canvas tote with reinforced handles. Perfect for campus notebooks, laptops, and everyday essentials.',
    true,
    35,
    '35 available',
    '["Standard"]'::jsonb,
    '[{"name": "Natural Cream", "hex": "#F5F2EB", "border": "#D8D4CA"}, {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}]'::jsonb
),
(
    'ctu-campus-cap',
    'Campus Cap',
    'DAILY COMPANIONS',
    'Accessories',
    280.00,
    '/assets/products/prod_4.jpg',
    '["/assets/products/prod_4.jpg"]'::jsonb,
    'Classic 6-panel unstructured dad cap with 3D CTU monogram embroidery and brass buckle closure.',
    true,
    24,
    '24 available',
    '["Adjustable"]'::jsonb,
    '[{"name": "Black", "hex": "#252525", "border": "#252525"}, {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}]'::jsonb
),
(
    'ctu-stainless-tumbler',
    'Stainless Tumbler 750ml',
    'CAMPUS ESSENTIALS',
    'Drinkware',
    420.00,
    '/assets/products/prod_5.jpg',
    '["/assets/products/prod_5.jpg"]'::jsonb,
    'Double-wall vacuum insulated flask. Keeps campus coffee hot for 12 hours or cold iced drinks chilled for 24 hours.',
    true,
    15,
    '15 available',
    '["750 ml"]'::jsonb,
    '[{"name": "Matte White", "hex": "#FFFFFF", "border": "#E5E5E5"}, {"name": "Matte Black", "hex": "#252525", "border": "#252525"}, {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}]'::jsonb
),
(
    'ctu-official-lanyard',
    'Official Campus Lanyard',
    'DAILY COMPANIONS',
    'Accessories',
    120.00,
    '/assets/products/prod_6.png',
    '["/assets/products/prod_6.png"]'::jsonb,
    'High-density woven lanyard with metal swivel clasp and safety breakaway buckle for CTU Student/Faculty ID cards.',
    true,
    80,
    '80 available',
    '["Standard"]'::jsonb,
    '[{"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}]'::jsonb
),
(
    'ctu-enamel-pin-set',
    'CTU Heritage Pin Set',
    'COLLECTIBLES',
    'Accessories',
    180.00,
    '/assets/products/prod_7.png',
    '["/assets/products/prod_7.png"]'::jsonb,
    'Set of 3 die-cast hard enamel collectible pins with gold plating and rubber clutches.',
    true,
    40,
    '40 sets available',
    '["Set of 3"]'::jsonb,
    '[{"name": "Gold / Enamel", "hex": "#D4AF37", "border": "#B3922D"}]'::jsonb
),
(
    'ctu-ceramic-mug',
    'CTU Ceramic Coffee Mug',
    'DRINKWARE',
    'Drinkware',
    200.00,
    '/assets/products/prod_11.png',
    '["/assets/products/prod_11.png"]'::jsonb,
    'Classic 11oz ceramic mug featuring the Cebu Technological University seal in durable glaze.',
    true,
    26,
    '26 available',
    '["11 oz"]'::jsonb,
    '[{"name": "Gloss White", "hex": "#FFFFFF", "border": "#E5E5E5"}, {"name": "Navy Blue", "hex": "#1B2A4A", "border": "#1B2A4A"}]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock_count = EXCLUDED.stock_count;

-- Insert Rewards
INSERT INTO public.rewards (id, title, cost, description, icon)
VALUES 
('rew-1', 'CTU Sticker Pack (5-pcs)', 150, 'Waterproof vinyl campus decals for laptops and water bottles.', 'sparkles'),
('rew-2', '₱50 Merchandise Voucher', 250, '₱50 discount applicable on any campus apparel item.', 'ticket'),
('rew-3', 'CTU Heritage Lanyard', 300, 'Free official university ID lanyard with metal clasp.', 'award'),
('rew-4', 'Free Campus Store Tote', 450, 'Complimentary standard CTU canvas shopping tote.', 'shopping-bag')
ON CONFLICT (id) DO NOTHING;
