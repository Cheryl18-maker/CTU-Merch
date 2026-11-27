-- =====================================================================
-- CEBU TECHNOLOGICAL UNIVERSITY (CTU) MERCHANDISE KIOSK
-- Production Database Schema & Seed Data
-- Project ID: aograbohxutnakmcnrgm
-- =====================================================================

-- 1. CATEGORIES TABLE
-- Allows campus store managers to dynamically add or toggle categories.
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_order INTEGER DEFAULT 0,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
-- Stores merchandise item details, base prices, tags, and gallery images.
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tag TEXT, -- e.g. 'CAMPUS ESSENTIALS', 'DAILY COMPANIONS'
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
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

-- 3. PRODUCT VARIANTS / INVENTORY TABLE
-- SKU-level inventory tracking per size and color combination.
-- Prevents kiosk customers from ordering unavailable sizes/colors.
CREATE TABLE IF NOT EXISTS public.product_variants (
    id TEXT PRIMARY KEY, -- e.g. 'ctu-tee-white-m'
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    color_hex TEXT,
    sku TEXT UNIQUE,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. STUDENT & FACULTY PROFILES (CAMPUS ID & WALLET)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY, -- e.g. 'CTU-2024-08219' (Student ID)
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'Student', -- 'Student', 'Faculty', 'Staff', 'Alumni'
    department TEXT,
    campus TEXT DEFAULT 'Main Campus',
    balance NUMERIC(10, 2) DEFAULT 0.00 CHECK (balance >= 0),
    points INTEGER DEFAULT 0 CHECK (points >= 0),
    pin_hash TEXT, -- 4-digit student transaction PIN hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. KIOSK TERMINALS TABLE
-- Multi-kiosk tracking (which machine took the order, paper status, location).
CREATE TABLE IF NOT EXISTS public.kiosk_terminals (
    id TEXT PRIMARY KEY, -- e.g. 'KIOSK-MAIN-01'
    name TEXT NOT NULL,
    campus TEXT DEFAULT 'Main Campus',
    location TEXT NOT NULL, -- e.g. 'Student Center Ground Floor'
    status TEXT DEFAULT 'Online', -- 'Online', 'Offline', 'Maintenance', 'Paper Low'
    receipt_printer_status TEXT DEFAULT 'OK',
    last_ping TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY, -- e.g. 'CTU-ORD-84920'
    user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    kiosk_id TEXT REFERENCES public.kiosk_terminals(id) ON DELETE SET NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'Ready for Pickup', -- 'Pending', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'
    pickup_location TEXT DEFAULT 'Campus Store Counter A',
    kiosk_terminal TEXT DEFAULT 'Kiosk Terminal #01',
    payment_method TEXT NOT NULL, -- 'Campus Student Wallet', 'Cash at Counter', 'GCash'
    payment_status TEXT DEFAULT 'Paid', -- 'Paid', 'Pending Counter Payment'
    subtotal NUMERIC(10, 2) NOT NULL,
    tax NUMERIC(10, 2) DEFAULT 0.00,
    discount NUMERIC(10, 2) DEFAULT 0.00,
    total NUMERIC(10, 2) NOT NULL,
    points_earned INTEGER DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ORDER LINE ITEMS TABLE (Normalized Breakdown)
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    size TEXT,
    color TEXT,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10, 2) NOT NULL,
    image TEXT
);

-- 8. WALLET TRANSACTIONS AUDIT LOG
-- Critical for student wallet integrity, top-ups, dispute resolution, and store audits.
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL, -- 'TOPUP', 'PURCHASE', 'REFUND', 'REWARD_CREDIT'
    amount NUMERIC(10, 2) NOT NULL,
    balance_before NUMERIC(10, 2) NOT NULL,
    balance_after NUMERIC(10, 2) NOT NULL,
    reference_order_id TEXT REFERENCES public.orders(id) ON DELETE SET NULL,
    kiosk_id TEXT REFERENCES public.kiosk_terminals(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. REWARDS CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.rewards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    cost INTEGER NOT NULL CHECK (cost > 0),
    description TEXT,
    icon TEXT,
    voucher_type TEXT DEFAULT 'DISCOUNT', -- 'DISCOUNT', 'ITEM', 'FREEBIE'
    discount_amount NUMERIC(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. REWARD VOUCHERS TABLE
-- Tracks claimed voucher codes and prevents double-redemption.
CREATE TABLE IF NOT EXISTS public.reward_vouchers (
    code TEXT PRIMARY KEY, -- e.g. 'CTU-REW-8F92A1'
    reward_id TEXT NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_redeemed BOOLEAN DEFAULT false,
    redeemed_in_order_id TEXT REFERENCES public.orders(id) ON DELETE SET NULL,
    redeemed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. ANNOUNCEMENTS & STORE NOTICES TABLE
-- Controls top announcement ticker and campus store alerts dynamically.
CREATE TABLE IF NOT EXISTS public.announcements (
    id BIGSERIAL PRIMARY KEY,
    badge TEXT DEFAULT 'Notice',
    message TEXT NOT NULL,
    hours_info TEXT DEFAULT 'Mon-Fri 8:00 AM - 5:00 PM',
    pickup_counter TEXT DEFAULT 'Counter A (Ground Floor)',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kiosk_terminals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read for kiosk display
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Kiosks" ON public.kiosk_terminals FOR SELECT USING (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Read Order Items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Public Read Rewards" ON public.rewards FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON public.announcements FOR SELECT USING (true);

-- Allow kiosk write operations (orders, topup, wallet, items)
CREATE POLICY "Kiosk Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Kiosk Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Kiosk Update Profiles" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Kiosk Insert Wallet Tx" ON public.wallet_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Kiosk Vouchers Access" ON public.reward_vouchers FOR ALL USING (true);

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- Insert Categories
INSERT INTO public.categories (id, name, display_order, icon)
VALUES 
('cat-all', 'All merchandise', 0, 'layout-grid'),
('cat-apparel', 'Apparel', 1, 'shirt'),
('cat-accessories', 'Accessories', 2, 'tag'),
('cat-drinkware', 'Drinkware', 3, 'coffee')
ON CONFLICT (id) DO NOTHING;

-- Insert Kiosk Terminal #01
INSERT INTO public.kiosk_terminals (id, name, campus, location, status)
VALUES 
('KIOSK-MAIN-01', 'CTU Main Kiosk Terminal #01', 'Main Campus', 'Student Center Ground Floor', 'Online')
ON CONFLICT (id) DO NOTHING;

-- Insert Default Student Profile
INSERT INTO public.profiles (id, name, email, role, department, campus, balance, points)
VALUES (
    'CTU-2024-08219',
    'Dominic Magalso',
    'd.magalso@ctu.edu.ph',
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

-- Insert Product Variants (SKU level)
INSERT INTO public.product_variants (id, product_id, size, color, color_hex, sku, stock_quantity)
VALUES
('ctu-tee-w-s', 'ctu-tee-classic', 'S', 'White', '#FFFFFF', 'CTU-TEE-W-S', 10),
('ctu-tee-w-m', 'ctu-tee-classic', 'M', 'White', '#FFFFFF', 'CTU-TEE-W-M', 18),
('ctu-tee-w-l', 'ctu-tee-classic', 'L', 'White', '#FFFFFF', 'CTU-TEE-W-L', 12),
('ctu-tee-o-m', 'ctu-tee-classic', 'M', 'Orange', '#F47721', 'CTU-TEE-O-M', 8),
('ctu-hoodie-o-l', 'ctu-varsity-hoodie', 'L', 'Orange', '#F47721', 'CTU-HOD-O-L', 6),
('ctu-hoodie-n-m', 'ctu-varsity-hoodie', 'M', 'Navy Blue', '#1B2A4A', 'CTU-HOD-N-M', 6)
ON CONFLICT (id) DO NOTHING;

-- Insert Rewards
INSERT INTO public.rewards (id, title, cost, description, icon, voucher_type, discount_amount)
VALUES 
('rew-1', 'CTU Sticker Pack (5-pcs)', 150, 'Waterproof vinyl campus decals for laptops and water bottles.', 'sparkles', 'FREEBIE', 0.00),
('rew-2', '₱50 Merchandise Voucher', 250, '₱50 discount applicable on any campus apparel item.', 'ticket', 'DISCOUNT', 50.00),
('rew-3', 'CTU Heritage Lanyard', 300, 'Free official university ID lanyard with metal clasp.', 'award', 'FREEBIE', 0.00),
('rew-4', 'Free Campus Store Tote', 450, 'Complimentary standard CTU canvas shopping tote.', 'shopping-bag', 'FREEBIE', 0.00)
ON CONFLICT (id) DO NOTHING;

-- Insert Announcements
INSERT INTO public.announcements (badge, message, hours_info, pickup_counter)
VALUES 
('Notice', 'Official CTU Campus Store · Online Kiosk Terminal', 'Mon-Fri 8:00 AM - 5:00 PM', 'Ground Floor Counter A')
ON CONFLICT DO NOTHING;
