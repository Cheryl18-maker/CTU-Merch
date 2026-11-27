import React from 'react';
import { ShoppingBag, ArrowRight, Award, History, Sparkles, ShieldCheck, Clock, MapPin, HandMetal, Smartphone } from 'lucide-react';

export default function WelcomeScreen({ onStartShopping, onNavigate, user, onOpenTopUp }) {
  return (
    <div className="flex flex-col flex-1 bg-ctu-bg pb-12 select-none animate-fadeIn">
      {/* Tall Hero Section (Attract Screen) */}
      <div 
        onClick={onStartShopping}
        className="relative overflow-hidden bg-gradient-to-b from-[#1e1e24] via-[#16161a] to-[#0f0f11] text-white pt-12 pb-16 px-6 shadow-xl cursor-pointer group transition-all"
      >
        {/* Ambient glow effects */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-ctu-orange/20 rounded-full blur-3xl pointer-events-none group-hover:bg-ctu-orange/30 transition-all duration-500" />
        <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-ctu-orange/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          {/* CTU Monogram / Crest */}
          <div className="w-24 h-24 rounded-3xl bg-ctu-orange flex items-center justify-center text-white font-black text-3xl shadow-2xl border-4 border-orange-400/80 mb-5 group-hover:scale-105 transition-transform duration-300">
            CTU
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs font-extrabold tracking-widest uppercase mb-4 border border-white/10">
            <Sparkles size={14} />
            Self-Service Ordering Kiosk
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
            Wear your <span className="text-ctu-orange">campus pride.</span>
          </h1>

          <p className="text-gray-300 text-sm max-w-md mb-8 font-normal leading-relaxed">
            Official Cebu Technological University merchandise, apparel, drinkware, and daily essentials. Fast pickup at Ground Floor Counter A.
          </p>

          {/* Huge Touch-to-Order CTA Button (McDonald's Style) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartShopping();
            }}
            className="w-full max-w-sm py-5 px-8 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-4 shadow-2xl transition-all animate-pulse-subtle border-2 border-orange-300/40 cursor-pointer"
          >
            <ShoppingBag size={26} />
            <span className="tracking-wider">TOUCH TO ORDER</span>
            <ArrowRight size={24} />
          </button>
          
          <p className="text-gray-400 text-xs mt-3 font-medium flex items-center gap-1.5">
            <span>Tap screen anywhere to start browsing catalog</span>
          </p>
        </div>
      </div>

      {/* Student Tap-Card Profile Section */}
      <div className="px-5 -mt-8 z-20 max-w-xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-ctu-border flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-ctu-orangeLight text-ctu-orange font-black flex items-center justify-center text-base border-2 border-orange-200">
              DM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-ctu-dark">{user?.name}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-ctu-muted font-mono mt-0.5">{user?.id}</p>
            </div>
          </div>

          <button
            onClick={onOpenTopUp}
            className="px-4 py-2.5 bg-ctu-orangeLight hover:bg-orange-100 text-ctu-orange rounded-2xl text-xs font-black transition-all flex flex-col items-end border border-orange-200 shadow-xs active:scale-95"
          >
            <span className="text-[10px] text-ctu-orangeDark font-bold uppercase tracking-wider">Campus Wallet</span>
            <span className="text-sm">₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </button>
        </div>
      </div>

      {/* Kiosk Service Grid */}
      <div className="px-5 mt-8 space-y-4 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-ctu-muted">
            Kiosk Fast Services
          </h2>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Kiosk Ready
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Rewards Card */}
          <button
            onClick={() => onNavigate('rewards')}
            className="bg-white p-5 rounded-3xl border-2 border-ctu-border hover:border-ctu-orange shadow-md text-left transition-all active:scale-98 flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ctu-dark">Campus Rewards</h3>
              <p className="text-xs text-ctu-muted mt-1 font-semibold">
                {user?.points} points available
              </p>
              <span className="inline-block mt-2 text-xs font-bold text-ctu-orange">
                Redeem Rewards ➔
              </span>
            </div>
          </button>

          {/* Orders Card */}
          <button
            onClick={() => onNavigate('orders')}
            className="bg-white p-5 rounded-3xl border-2 border-ctu-border hover:border-ctu-orange shadow-md text-left transition-all active:scale-98 flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <History size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ctu-dark">Past Orders</h3>
              <p className="text-xs text-ctu-muted mt-1 font-semibold">
                View receipts & pickup codes
              </p>
              <span className="inline-block mt-2 text-xs font-bold text-blue-600">
                Check History ➔
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Campus Pickup & Kiosk Location Details */}
      <div className="px-5 mt-6 max-w-xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-5 border-2 border-ctu-border shadow-md text-xs text-ctu-muted space-y-3">
          <div className="flex items-center gap-3 text-ctu-dark font-bold text-sm">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <span>Pickup: Campus Store Counter A (Ground Floor)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
              <Clock size={16} />
            </div>
            <span>Orders prepared in 5-10 minutes during store hours (8 AM - 5 PM)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} />
            </div>
            <span>Pay with Campus Student Wallet, Cash at Counter, or GCash QRPh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
