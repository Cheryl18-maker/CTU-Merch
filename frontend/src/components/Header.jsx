import React from 'react';
import { ShoppingBag, ArrowLeft, History, Award, Wallet, Home, User, LogOut } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  cartCount, 
  cartTotal, 
  user,
  onOpenTopUp,
  onOpenLogin,
  onLogout
}) {
  const isGuest = user?.isGuest;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ctu-border shadow-xs select-none">
      {/* Announcement Bar */}
      <div className="bg-[#18181b] text-white text-[11px] py-1.5 px-4 font-medium border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-gray-200">
              Campus notice: Official CTU Campus Store · Online Kiosk
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <span>Pickup: Mon–Fri 8:00 AM – 5:00 PM · Ground Floor Counter A</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Left: Back + Brand */}
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

        {/* Center: Nav Links */}
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
            <span>Rewards</span>
          </button>

          {!isGuest && (
            <button
              onClick={() => onNavigate('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentScreen === 'orders'
                  ? 'bg-white text-ctu-dark shadow-sm'
                  : 'text-ctu-muted hover:text-ctu-dark'
              }`}
            >
              <History size={15} className="text-blue-600" />
              <span>Orders</span>
            </button>
          )}
        </nav>

        {/* Right: Account + Wallet + Cart */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Guest: show Log In button */}
          {isGuest ? (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ctu-orange hover:bg-orange-600 active:scale-95 transition-all text-white text-xs font-black border-2 border-orange-400 shadow-sm"
              title="Log in to your campus account"
            >
              <User size={15} />
              <span className="hidden sm:inline">Log In</span>
            </button>
          ) : (
            /* Logged in: show name + wallet + logout */
            <div className="flex items-center gap-2">
              {/* Wallet Balance */}
              <button
                onClick={onOpenTopUp}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-ctu-orangeLight text-ctu-orange rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors border border-orange-200 shadow-xs"
                title="Campus Wallet Balance"
              >
                <Wallet size={14} />
                <span>₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </button>

              {/* User chip */}
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-bold text-ctu-dark border border-gray-200"
                title="Account"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <User size={14} className="text-gray-600" />
                <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors text-gray-500 border border-gray-200"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {/* Cart Button */}
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
