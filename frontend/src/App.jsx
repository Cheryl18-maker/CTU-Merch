import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCcw, 
  Sparkles,
  Database,
  Store,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import Header from './components/Header.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import CatalogScreen from './components/CatalogScreen.jsx';
import ProductDetailModal from './components/ProductDetailModal.jsx';
import CartScreen from './components/CartScreen.jsx';
import CheckoutScreen from './components/CheckoutScreen.jsx';
import ConfirmWalletModal from './components/ConfirmWalletModal.jsx';
import InsufficientBalanceModal from './components/InsufficientBalanceModal.jsx';
import OrderSuccessScreen from './components/OrderSuccessScreen.jsx';
import OrderHistoryScreen from './components/OrderHistoryScreen.jsx';
import RewardsScreen from './components/RewardsScreen.jsx';
import TopUpModal from './components/TopUpModal.jsx';
import ReceiptModal from './components/ReceiptModal.jsx';

import { 
  fetchSupabaseProducts, 
  fetchSupabaseUserProfile, 
  createSupabaseOrder, 
  isSupabaseConfigured,
  supabase 
} from './supabase.js';

// Default initial products matching Figma and backend
const INITIAL_PRODUCTS = [
  {
    id: "ctu-tee-classic",
    name: "CTU Classic Tee",
    tag: "CAMPUS ESSENTIALS",
    category: "Apparel",
    price: 350.00,
    image: "/assets/products/prod_1.png",
    gallery: [
      "/assets/products/prod_1.png",
      "/assets/products/detail_main.png",
      "/assets/products/detail_thumb1.png"
    ],
    description: "Your everyday campus essential. Soft breathable cotton, a relaxed unisex fit, and bold CTU lettering.",
    inStock: true,
    stockCount: 18,
    stockInfo: "18 available in White / M",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF", border: "#E5E5E5" },
      { name: "Orange", hex: "#F47721", border: "#F47721" }
    ]
  },
  {
    id: "ctu-varsity-hoodie",
    name: "Varsity Hoodie",
    tag: "CAMPUS ESSENTIALS",
    category: "Apparel",
    price: 850.00,
    image: "/assets/products/prod_2.jpg",
    gallery: [
      "/assets/products/prod_2.jpg",
      "/assets/products/prod_8.png"
    ],
    description: "Heavyweight premium cotton fleece hoodie featuring embroidered Cebu Technological University crest.",
    inStock: true,
    stockCount: 12,
    stockInfo: "12 available across all sizes",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Orange", hex: "#F47721", border: "#F47721" },
      { name: "Navy Blue", hex: "#1B2A4A", border: "#1B2A4A" },
      { name: "Gray", hex: "#8A8D91", border: "#8A8D91" }
    ]
  },
  {
    id: "ctu-everyday-tote",
    name: "Everyday Tote",
    tag: "DAILY COMPANIONS",
    category: "Accessories",
    price: 250.00,
    image: "/assets/products/prod_3.jpg",
    gallery: ["/assets/products/prod_3.jpg"],
    description: "Heavy-duty canvas tote with reinforced handles. Perfect for campus notebooks, laptops, and everyday essentials.",
    inStock: true,
    stockCount: 35,
    stockInfo: "35 available",
    sizes: ["Standard"],
    colors: [
      { name: "Natural Cream", hex: "#F5F2EB", border: "#D8D4CA" },
      { name: "CTU Orange", hex: "#F47721", border: "#F47721" }
    ]
  },
  {
    id: "ctu-campus-cap",
    name: "Campus Cap",
    tag: "DAILY COMPANIONS",
    category: "Accessories",
    price: 280.00,
    image: "/assets/products/prod_4.jpg",
    gallery: ["/assets/products/prod_4.jpg"],
    description: "Classic 6-panel unstructured dad cap with 3D CTU monogram embroidery and brass buckle closure.",
    inStock: true,
    stockCount: 24,
    stockInfo: "24 available",
    sizes: ["Adjustable"],
    colors: [
      { name: "Black", hex: "#252525", border: "#252525" },
      { name: "CTU Orange", hex: "#F47721", border: "#F47721" }
    ]
  },
  {
    id: "ctu-stainless-tumbler",
    name: "Stainless Tumbler 750ml",
    tag: "CAMPUS ESSENTIALS",
    category: "Drinkware",
    price: 420.00,
    image: "/assets/products/prod_5.jpg",
    gallery: ["/assets/products/prod_5.jpg"],
    description: "Double-wall vacuum insulated flask. Keeps campus coffee hot for 12 hours or cold iced drinks chilled for 24 hours.",
    inStock: true,
    stockCount: 15,
    stockInfo: "15 available",
    sizes: ["750 ml"],
    colors: [
      { name: "Matte White", hex: "#FFFFFF", border: "#E5E5E5" },
      { name: "Matte Black", hex: "#252525", border: "#252525" },
      { name: "CTU Orange", hex: "#F47721", border: "#F47721" }
    ]
  },
  {
    id: "ctu-official-lanyard",
    name: "Official Campus Lanyard",
    tag: "DAILY COMPANIONS",
    category: "Accessories",
    price: 120.00,
    image: "/assets/products/prod_6.png",
    gallery: ["/assets/products/prod_6.png"],
    description: "High-density woven lanyard with metal swivel clasp and safety breakaway buckle for CTU Student/Faculty ID cards.",
    inStock: true,
    stockCount: 80,
    stockInfo: "80 available",
    sizes: ["Standard"],
    colors: [
      { name: "CTU Orange", hex: "#F47721", border: "#F47721" }
    ]
  },
  {
    id: "ctu-enamel-pin-set",
    name: "CTU Heritage Pin Set",
    tag: "COLLECTIBLES",
    category: "Accessories",
    price: 180.00,
    image: "/assets/products/prod_7.png",
    gallery: ["/assets/products/prod_7.png"],
    description: "Set of 3 die-cast hard enamel collectible pins with gold plating and rubber clutches.",
    inStock: true,
    stockCount: 40,
    stockInfo: "40 sets available",
    sizes: ["Set of 3"],
    colors: [
      { name: "Gold / Enamel", hex: "#D4AF37", border: "#B3922D" }
    ]
  },
  {
    id: "ctu-ceramic-mug",
    name: "CTU Ceramic Coffee Mug",
    tag: "DRINKWARE",
    category: "Drinkware",
    price: 200.00,
    image: "/assets/products/prod_11.png",
    gallery: ["/assets/products/prod_11.png"],
    description: "Classic 11oz ceramic mug featuring the Cebu Technological University seal in durable glaze.",
    inStock: true,
    stockCount: 26,
    stockInfo: "26 available",
    sizes: ["11 oz"],
    colors: [
      { name: "Gloss White", hex: "#FFFFFF", border: "#E5E5E5" },
      { name: "Navy Blue", hex: "#1B2A4A", border: "#1B2A4A" }
    ]
  }
];

const INITIAL_USER = {
  id: "CTU-2024-08219",
  name: "Dominic Magalso",
  role: "Student",
  department: "College of Computer, Information and Communications Technology",
  campus: "Main Campus",
  balance: 1250.00,
  points: 450
};

const INITIAL_ORDERS = [
  {
    id: "CTU-ORD-84920",
    date: "Nov 25, 2026 · 02:15 PM",
    status: "Ready for Pickup",
    pickupLocation: "Campus Store Counter A",
    kioskTerminal: "Kiosk Terminal #01 (Main Building)",
    paymentMethod: "Campus Student Wallet",
    subtotal: 600.00,
    tax: 0.00,
    discount: 0.00,
    total: 600.00,
    items: [
      {
        id: "ctu-tee-classic",
        name: "CTU Classic Tee",
        size: "M",
        color: "White",
        price: 350.00,
        quantity: 1,
        image: "/assets/products/prod_1.png"
      },
      {
        id: "ctu-everyday-tote",
        name: "Everyday Tote",
        size: "Standard",
        color: "Natural Cream",
        price: 250.00,
        quantity: 1,
        image: "/assets/products/prod_3.jpg"
      }
    ]
  }
];

const INITIAL_REWARDS = [
  {
    id: "rew-1",
    title: "CTU Sticker Pack (5-pcs)",
    cost: 150,
    description: "Waterproof vinyl campus decals for laptops and water bottles.",
    icon: "sparkles"
  },
  {
    id: "rew-2",
    title: "₱50 Merchandise Voucher",
    cost: 250,
    description: "₱50 discount applicable on any campus apparel item.",
    icon: "ticket"
  },
  {
    id: "rew-3",
    title: "CTU Heritage Lanyard",
    cost: 300,
    description: "Free official university ID lanyard with metal clasp.",
    icon: "award"
  },
  {
    id: "rew-4",
    title: "Free Campus Store Tote",
    cost: 450,
    description: "Complimentary standard CTU canvas shopping tote.",
    icon: "shopping-bag"
  }
];

export default function App() {
  // Navigation & Screen View
  const [currentScreen, setCurrentScreen] = useState('welcome');
  
  // Data States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(["All merchandise", "Apparel", "Accessories", "Drinkware"]);
  const [selectedCategory, setSelectedCategory] = useState("All merchandise");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(INITIAL_USER);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [rewards, setRewards] = useState(INITIAL_REWARDS);

  // Modals & Active Flows
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWalletConfirm, setShowWalletConfirm] = useState(false);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [insufficientData, setInsufficientData] = useState({ required: 0, current: 0 });
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [dbSource, setDbSource] = useState('Local Store');

  // Load data: try Supabase first, then FastAPI proxy, then fallback
  useEffect(() => {
    const initializeData = async () => {
      // 1. Try Supabase
      if (isSupabaseConfigured) {
        try {
          const [sbProds, sbProfile] = await Promise.allSettled([
            fetchSupabaseProducts(),
            fetchSupabaseUserProfile()
          ]);
          if (sbProds.status === 'fulfilled' && sbProds.value && sbProds.value.length > 0) {
            setProducts(sbProds.value);
            setDbSource('Supabase (aograbohxutnakmcnrgm)');
          }
          if (sbProfile.status === 'fulfilled' && sbProfile.value) {
            setUser(sbProfile.value);
          }
        } catch (err) {
          console.warn('Supabase initialization fallback:', err);
        }
      }

      // 2. Try FastAPI Backend
      try {
        const [prodRes, catRes, userRes, ordersRes, rewRes] = await Promise.allSettled([
          fetch('/api/products').then(r => r.ok ? r.json() : null),
          fetch('/api/categories').then(r => r.ok ? r.json() : null),
          fetch('/api/user').then(r => r.ok ? r.json() : null),
          fetch('/api/orders').then(r => r.ok ? r.json() : null),
          fetch('/api/rewards').then(r => r.ok ? r.json() : null),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value && prodRes.value.length > 0) {
          setProducts(prodRes.value);
          setDbSource('FastAPI + Local');
        }
        if (catRes.status === 'fulfilled' && catRes.value) {
          setCategories(catRes.value);
        }
        if (userRes.status === 'fulfilled' && userRes.value) {
          setUser(userRes.value);
        }
        if (ordersRes.status === 'fulfilled' && ordersRes.value) {
          setOrders(ordersRes.value);
        }
        if (rewRes.status === 'fulfilled' && rewRes.value?.rewards) {
          setRewards(rewRes.value.rewards);
        }
      } catch (err) {
        console.warn('Backend proxy initialization:', err);
      }
    };

    initializeData();
  }, []);

  // Computed Cart metrics
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === "All merchandise" ||
        p.category?.toLowerCase() === selectedCategory?.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + item.quantity
        };
        return next;
      }
      return [...prev, item];
    });
  };

  const handleQuickAdd = (product) => {
    handleAddToCart({
      id: product.id,
      name: product.name,
      size: product.sizes?.[0] || 'Standard',
      color: product.colors?.[0]?.name || 'Standard',
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Top Up Operation
  const handleTopUp = async (amount) => {
    try {
      const res = await fetch('/api/user/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => ({ ...prev, balance: data.balance }));
        return;
      }
    } catch {
      // Local fallback
    }
    setUser((prev) => ({ ...prev, balance: prev.balance + amount }));
  };

  // Checkout flow
  const handleInitiatePayment = (paymentMethod) => {
    if (paymentMethod === 'Campus Student Wallet') {
      if (user.balance < cartTotal) {
        setInsufficientData({
          required: cartTotal,
          current: user.balance
        });
        setShowInsufficientBalance(true);
        return;
      }
      setShowWalletConfirm(true);
    } else {
      finalizeOrder(paymentMethod);
    }
  };

  const finalizeOrder = async (paymentMethod) => {
    const subtotal = cartTotal;
    const earnedPoints = Math.floor(subtotal / 10);
    const orderId = `CTU-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      user_id: user?.id,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Ready for Pickup",
      pickupLocation: "Campus Store Counter A",
      kioskTerminal: "Kiosk Terminal #01 (Main Gate)",
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      tax: 0.00,
      discount: 0.00,
      total: subtotal,
      pointsEarned: earnedPoints,
      items: [...cart]
    };

    // 1. Try Supabase order insertion
    if (isSupabaseConfigured) {
      try {
        await createSupabaseOrder(newOrder);
      } catch (e) {
        console.warn('Supabase order creation skipped:', e);
      }
    }

    // 2. Try FastAPI Backend
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          paymentMethod: paymentMethod
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrders((prev) => [data.order, ...prev]);
          setLastCompletedOrder(data.order);
        } else {
          setOrders((prev) => [newOrder, ...prev]);
          setLastCompletedOrder(newOrder);
        }
        if (data.remainingBalance !== undefined) {
          setUser((prev) => ({
            ...prev,
            balance: data.remainingBalance,
            points: data.updatedPoints ?? prev.points + earnedPoints
          }));
        }
        setCart([]);
        setCurrentScreen('success');
        return;
      }
    } catch {
      // Offline fallback
    }

    // Local fallback update
    if (paymentMethod === 'Campus Student Wallet') {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance - subtotal,
        points: prev.points + earnedPoints
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        points: prev.points + earnedPoints
      }));
    }

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    setCart([]);
    setCurrentScreen('success');
  };

  // Rewards redemption
  const handleRedeemReward = async (reward) => {
    try {
      const res = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardId: reward.id })
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => ({ ...prev, points: data.remainingPoints }));
        return data;
      }
    } catch {
      // Fallback
    }

    if (user.points >= reward.cost) {
      setUser((prev) => ({ ...prev, points: prev.points - reward.cost }));
      return {
        voucherCode: `CTU-REW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      };
    }
    return null;
  };

  // Reset Demo kiosk data
  const handleResetKiosk = () => {
    setCart([]);
    setUser(INITIAL_USER);
    setCurrentScreen('welcome');
    setSelectedProduct(null);
    setShowTopUp(false);
    setShowWalletConfirm(false);
    setShowInsufficientBalance(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#111114] flex justify-center text-slate-800 font-sans selection:bg-ctu-orange selection:text-white">
      
      {/* Full Page McDonald's Kiosk Column (Tall, Not Wide) */}
      <div className="w-full max-w-2xl min-h-screen bg-ctu-bg flex flex-col relative shadow-2xl border-x border-stone-800/60">
        
        {/* Top Kiosk Station Info Bar */}
        <div className="bg-[#18181b] text-white px-4 py-2 flex items-center justify-between text-xs select-none border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-[11px] text-orange-400 uppercase tracking-wider">
              CTU Kiosk Terminal #01
            </span>
            <span className="text-gray-400 text-[10px] hidden sm:inline">
              · Main Campus Ground Floor
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-300 text-[11px]">
              <Database size={12} className="text-amber-400" />
              <span className="font-mono text-[10px] text-gray-400">
                {isSupabaseConfigured ? "Supabase Connected" : "Supabase: aograbohxutnakmcnrgm"}
              </span>
            </div>

            <button
              onClick={handleResetKiosk}
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-gray-300 text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1"
              title="Reset Kiosk State"
            >
              <RotateCcw size={12} />
              <span className="hidden xs:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Global Kiosk Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          cartCount={cartCount}
          cartTotal={cartTotal}
          user={user}
          onOpenTopUp={() => setShowTopUp(true)}
          onResetOrder={handleResetKiosk}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-ctu-bg flex flex-col">
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              onStartShopping={() => setCurrentScreen('catalog')}
              onNavigate={setCurrentScreen}
              user={user}
              onOpenTopUp={() => setShowTopUp(true)}
            />
          )}

          {currentScreen === 'catalog' && (
            <CatalogScreen
              products={filteredProducts}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectProduct={setSelectedProduct}
              onQuickAdd={handleQuickAdd}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onViewCart={() => setCurrentScreen('cart')}
              onResetOrder={handleResetKiosk}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onProceedToCheckout={() => setCurrentScreen('checkout')}
              onContinueShopping={() => setCurrentScreen('catalog')}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              cart={cart}
              user={user}
              onConfirmOrder={handleInitiatePayment}
              onBackToCart={() => setCurrentScreen('cart')}
              onOpenTopUp={() => setShowTopUp(true)}
            />
          )}

          {currentScreen === 'success' && (
            <OrderSuccessScreen
              order={lastCompletedOrder || orders[0]}
              onHome={() => setCurrentScreen('welcome')}
              onViewReceipt={() => setSelectedReceiptOrder(lastCompletedOrder || orders[0])}
            />
          )}

          {currentScreen === 'orders' && (
            <OrderHistoryScreen
              orders={orders}
              onSelectOrder={(ord) => setSelectedReceiptOrder(ord)}
              onBackToCatalog={() => setCurrentScreen('catalog')}
            />
          )}

          {currentScreen === 'rewards' && (
            <RewardsScreen
              user={user}
              rewards={rewards}
              onRedeemReward={handleRedeemReward}
              onOpenTopUp={() => setShowTopUp(true)}
              onBackToCatalog={() => setCurrentScreen('catalog')}
            />
          )}
        </div>

        {/* Global Modals */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {showTopUp && (
          <TopUpModal
            currentBalance={user.balance}
            onTopUp={handleTopUp}
            onClose={() => setShowTopUp(false)}
          />
        )}

        {showWalletConfirm && (
          <ConfirmWalletModal
            user={user}
            totalAmount={cartTotal}
            onConfirm={() => {
              setShowWalletConfirm(false);
              finalizeOrder('Campus Student Wallet');
            }}
            onClose={() => setShowWalletConfirm(false)}
          />
        )}

        {showInsufficientBalance && (
          <InsufficientBalanceModal
            currentBalance={insufficientData.current}
            requiredAmount={insufficientData.required}
            onTopUp={() => {
              setShowInsufficientBalance(false);
              setShowTopUp(true);
            }}
            onSwitchPayment={() => {
              setShowInsufficientBalance(false);
            }}
            onClose={() => setShowInsufficientBalance(false)}
          />
        )}

        {selectedReceiptOrder && (
          <ReceiptModal
            order={selectedReceiptOrder}
            onClose={() => setSelectedReceiptOrder(null)}
          />
        )}
      </div>
    </div>
  );
}
