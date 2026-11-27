import React from 'react';
import { ShoppingBag, ArrowLeft, History, Award, Wallet, Home, User, UserCheck, ShieldCheck } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  cartCount, 
  cartTotal, 
  user,
  onOpenTopUp,
  onOpenLogin
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ctu-border shadow-xs select-none">
      {/* 1. Announcement Bar (Figma Node 10:2627 / 10:2876) */}
      <div className="bg-[#18181b] text-white text-[11px] py-1.5 px-4 font-medium border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-gray-200">
              Campus notice: Official CTU Campus Store · Online Kiosk
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hidden sm:flex">
            <span>Pickup notice: Mon-Fri 8:00 AM - 5:00 PM · Ground Floor Counter A</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Figma Node 10:2631 / 10:2880) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Left: Brand Monogram & Wordmark */}
        <div className="flex items-center gap-3">
          {currentScreen !== 'welcome' && (
            <button
              onClick={() => onNavigate(currentScreen === 'catalog' ? 'welcome' : 'catalog')}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-transform text-ctu-dark lg:hidden"
              title="Back"
            >
              {currentScreen === 'catalog' ? <Home size={20} /> : <ArrowLeft size={20} />}
            </button>
          )}

          <div 
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-2xl bg-ctu-orange flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-orange-400 group-hover:scale-105 transition-transform">
              CTU
            </div>
            <div className="leading-tight">
              <h1 className="font-black text-base sm:text-lg text-ctu-dark tracking-tight">
                CTU Merch
              </h1>
              <p className="text-[11px] text-ctu-muted font-semibold tracking-wide">
                Cebu Technological University
              </p>
            </div>
          </div>
        </div>

        {/* Center: Primary Navigation Links (Figma Node 10:2638 / 10:2887) */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
          <button
            onClick={() => onNavigate('welcome')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              currentScreen === 'welcome'
                ? 'bg-white text-ctu-dark shadow-sm'
                : 'text-ctu-muted hover:text-ctu-dark'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              currentScreen === 'catalog'
                ? 'bg-white text-ctu-dark shadow-sm'
                : 'text-ctu-muted hover:text-ctu-dark'
            }`}
          >
            Catalog
          </button>

          <button
            onClick={() => onNavigate('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              currentScreen === 'rewards'
                ? 'bg-white text-ctu-dark shadow-sm'
                : 'text-ctu-muted hover:text-ctu-dark'
            }`}
          >
            <Award size={15} className="text-ctu-orange" />
            <span>Campus Rewards</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              currentScreen === 'orders'
                ? 'bg-white text-ctu-dark shadow-sm'
                : 'text-ctu-muted hover:text-ctu-dark'
            }`}
          >
            <History size={15} className="text-blue-600" />
            <span>Order History</span>
          </button>
        </nav>

        {/* Right: Shopping Actions & Account Status (Figma Node 10:2648 / 10:2897) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Account / Guest Button */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-bold text-ctu-dark border border-gray-200"
            title="Account login & guest access"
          >
            <div className={`w-2 h-2 rounded-full ${user?.isGuest ? 'bg-amber-400' : 'bg-emerald-500'}`} />
            <User size={15} className="text-gray-600" />
            <span className="hidden sm:inline">
              {user?.isGuest ? 'Guest' : (user?.name?.split(' ')[0] || 'Student')}
            </span>
          </button>

          {/* Quick Balance Button (if logged in) */}
          {!user?.isGuest && (
            <button
              onClick={onOpenTopUp}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-ctu-orangeLight text-ctu-orange rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors border border-orange-200 shadow-xs"
              title="Student Wallet Balance"
            >
              <Wallet size={14} />
              <span>₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </button>
          )}

          {/* Shopping Bag Button (Figma Node 10:2655 / 10:2904) */}
          <button
            onClick={() => onNavigate('cart')}
            className={`relative p-2.5 rounded-2xl transition-all shadow-xs flex items-center gap-2 ${
              currentScreen === 'cart'
                ? 'bg-ctu-orange text-white'
                : 'bg-gray-100 text-ctu-dark hover:bg-gray-200 border border-gray-200'
            }`}
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            <span className="hidden sm:inline text-xs font-bold">
              {cartCount > 0 ? `₱${cartTotal.toFixed(2)}` : 'Cart'}
            </span>
            {cartCount > 0 && (
              <span className="min-w-[20px] h-[20px] px-1 bg-ctu-orange text-white text-[11px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
