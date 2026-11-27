import React, { useState, useEffect, useMemo } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Battery, 
  RotateCcw, 
  Sparkles,
  ShieldCheck,
  CreditCard
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

// Fallback initial products matching Figma and backend
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
    kioskTerminal: "Kiosk Terminal #02 (Main Building)",
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

  // Kiosk UI Display controls
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [clockTime, setClockTime] = useState("");

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial data from FastAPI backend if available
  useEffect(() => {
    const fetchBackendData = async () => {
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
        console.warn("Backend API not reachable or using local state:", err);
      }
    };

    fetchBackendData();
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
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      // Cash or GCash directly places the order
      finalizeOrder(paymentMethod);
    }
  };

  const finalizeOrder = async (paymentMethod) => {
    const subtotal = cartTotal;
    const earnedPoints = Math.floor(subtotal / 10);
    const orderId = `CTU-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
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
      // Offline / fallback path
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
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-ctu-orange selection:text-white">
      
      {/* Kiosk Controls Top Bar (Desktop) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-slate-200">CTU Kiosk Active</span>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-orange-400 font-mono">
            FastAPI + Vite
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Toggle Phone Frame View"
          >
            {isPhoneFrame ? <Smartphone size={14} /> : <Monitor size={14} />}
            <span>{isPhoneFrame ? "Phone View" : "Full View"}</span>
          </button>

          <button
            onClick={handleResetKiosk}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Reset Kiosk State"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Kiosk Container (Phone Dimensions Casing) */}
      <div 
        className={`w-full transition-all duration-300 flex flex-col bg-white overflow-hidden relative shadow-kiosk ${
          isPhoneFrame
            ? "max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[10px] sm:border-slate-800"
            : "max-w-2xl min-h-[90vh] sm:rounded-3xl"
        }`}
      >
        {/* Phone Dynamic Island & Status Bar */}
        <div className="bg-[#1f2937] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs select-none shrink-0 border-b border-gray-800">
          <span className="font-semibold tracking-tight">{clockTime || "10:42 AM"}</span>

          {/* Notch / Dynamic Island */}
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-1 px-2">
            <div className="w-2 h-2 rounded-full bg-gray-900 border border-gray-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[10px] font-bold text-orange-400">CTU-5G</span>
            <Wifi size={13} />
            <Battery size={15} className="text-emerald-400" />
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
        />

        {/* Main Content Viewport */}
        <div className="flex-1 overflow-y-auto relative bg-ctu-bg">
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

        {/* Home Indicator Bar (Mobile Dimensions) */}
        {isPhoneFrame && (
          <div className="py-2 flex items-center justify-center bg-white border-t border-gray-100 shrink-0">
            <div className="w-32 h-1 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => setCurrentScreen('welcome')} />
          </div>
        )}

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

      {/* Kiosk Bottom Device Label */}
      <div className="mt-3 text-center text-slate-500 text-[11px] hidden sm:block">
        <p>Cebu Technological University · Official Self-Service Merch Kiosk Terminal</p>
      </div>
    </div>
  );
}
