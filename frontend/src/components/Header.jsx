import React from 'react';
import { ShoppingBag, ArrowLeft, History, Award, Wallet, Home, RotateCcw } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  cartCount, 
  cartTotal, 
  user,
  onOpenTopUp,
  onResetOrder
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-ctu-border shadow-sm select-none">
      {/* Kiosk Service Bar */}
      <div className="bg-[#18181b] text-white text-xs py-2 px-4 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold tracking-wide uppercase text-[11px] text-amber-400">
            CTU Self-Service Ordering Kiosk #01
          </span>
          <span className="text-gray-400 hidden sm:inline">· Main Campus Student Center</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 text-[11px]">
          <span>Touch to Order</span>
          {currentScreen !== 'welcome' && (
            <button
              onClick={onResetOrder}
              className="px-2 py-0.5 rounded bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1"
              title="Cancel & return to start"
            >
              <RotateCcw size={11} />
              <span>Cancel Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Kiosk Navigation Bar */}
      <div className="px-5 py-3.5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          {currentScreen !== 'welcome' && (
            <button
              onClick={() => onNavigate(currentScreen === 'catalog' ? 'welcome' : 'catalog')}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-transform text-ctu-dark flex items-center justify-center shadow-xs"
              title="Back"
            >
              {currentScreen === 'catalog' ? <Home size={22} /> : <ArrowLeft size={22} />}
            </button>
          )}

          {/* CTU Monogram & Brand */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-ctu-orange flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-orange-400">
              CTU
            </div>
            <div className="leading-tight">
              <h1 className="font-black text-base text-ctu-dark tracking-tight">
                CAMPUS MERCH KIOSK
              </h1>
              <p className="text-xs text-ctu-muted font-semibold">
                Cebu Technological University
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions: Student Wallet, Rewards, Bag */}
        <div className="flex items-center gap-2">
          {/* Quick Balance Pill */}
          <button
            onClick={onOpenTopUp}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ctu-orangeLight text-ctu-orange rounded-xl text-xs font-bold hover:bg-orange-100 active:scale-95 transition-all border border-orange-200 shadow-xs"
            title="Student Wallet - Tap to top up"
          >
            <Wallet size={15} />
            <div className="text-left leading-tight hidden xs:block">
              <span className="text-[9px] uppercase tracking-wider text-ctu-orangeDark block font-normal">Wallet</span>
              <span>₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </button>

          {/* Rewards */}
          <button
            onClick={() => onNavigate('rewards')}
            className={`p-2.5 rounded-xl transition-all flex items-center gap-1 ${
              currentScreen === 'rewards'
                ? 'bg-ctu-orange text-white shadow-sm'
                : 'bg-gray-100 text-ctu-dark hover:bg-gray-200'
            }`}
            title="Campus Rewards"
          >
            <Award size={20} />
            <span className="text-xs font-bold hidden sm:inline">{user?.points} pts</span>
          </button>

          {/* Order History */}
          <button
            onClick={() => onNavigate('orders')}
            className={`p-2.5 rounded-xl transition-all ${
              currentScreen === 'orders'
                ? 'bg-ctu-orange text-white shadow-sm'
                : 'bg-gray-100 text-ctu-dark hover:bg-gray-200'
            }`}
            title="Order History & Receipts"
          >
            <History size={20} />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            className={`relative p-2.5 rounded-xl transition-all shadow-xs ${
              currentScreen === 'cart'
                ? 'bg-ctu-orange text-white'
                : 'bg-gray-100 text-ctu-dark hover:bg-gray-200'
            }`}
            title="View Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 bg-ctu-orange text-white text-xs font-black rounded-full flex items-center justify-center ring-2 ring-white animate-bounce-short shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
