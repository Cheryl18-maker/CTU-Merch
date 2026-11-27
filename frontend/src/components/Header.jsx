import React from 'react';
import { ShoppingBag, ArrowLeft, History, Award, Wallet, Home } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  cartCount, 
  cartTotal, 
  user,
  onOpenTopUp 
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ctu-border shadow-sm">
      {/* Campus Notice Bar */}
      <div className="bg-[#1f2937] text-white text-[11px] py-1 px-3 flex items-center justify-between font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          CTU Main Campus Store · Online Kiosk
        </span>
        <span className="text-gray-300">Mon-Fri 8:00 AM - 5:00 PM</span>
      </div>

      {/* Main Header */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {currentScreen !== 'welcome' && (
            <button
              onClick={() => onNavigate(currentScreen === 'catalog' ? 'welcome' : 'catalog')}
              className="p-1.5 rounded-full hover:bg-gray-100 active:scale-95 transition-transform text-ctu-dark"
              title="Back"
            >
              {currentScreen === 'catalog' ? <Home size={20} /> : <ArrowLeft size={20} />}
            </button>
          )}

          {/* CTU Monogram & Brand */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-ctu-orange flex items-center justify-center text-white font-black text-lg shadow-sm">
              CTU
            </div>
            <div className="leading-tight">
              <h1 className="font-extrabold text-sm text-ctu-dark tracking-tight">
                CAMPUS STORE
              </h1>
              <p className="text-[10px] text-ctu-muted font-medium">
                Self-Service Kiosk
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions: Balance, Rewards, History, Cart */}
        <div className="flex items-center gap-1.5">
          {/* Quick Balance Pill */}
          <button
            onClick={onOpenTopUp}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1 bg-ctu-orangeLight text-ctu-orange rounded-full text-xs font-bold hover:bg-orange-100 transition-colors"
            title="Wallet Balance - Click to top up"
          >
            <Wallet size={13} />
            <span>₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </button>

          {/* Rewards button */}
          <button
            onClick={() => onNavigate('rewards')}
            className={`p-2 rounded-xl transition-all ${
              currentScreen === 'rewards'
                ? 'bg-ctu-orange text-white'
                : 'text-ctu-dark hover:bg-gray-100'
            }`}
            title="Campus Rewards"
          >
            <Award size={20} />
          </button>

          {/* Order History button */}
          <button
            onClick={() => onNavigate('orders')}
            className={`p-2 rounded-xl transition-all ${
              currentScreen === 'orders'
                ? 'bg-ctu-orange text-white'
                : 'text-ctu-dark hover:bg-gray-100'
            }`}
            title="Order History"
          >
            <History size={20} />
          </button>

          {/* Shopping Bag Button with Badge */}
          <button
            onClick={() => onNavigate('cart')}
            className={`relative p-2 rounded-xl transition-all ${
              currentScreen === 'cart'
                ? 'bg-ctu-orange text-white'
                : 'text-ctu-dark hover:bg-gray-100'
            }`}
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-ctu-orange text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce-short">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
