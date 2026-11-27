import React from 'react';
import { ShoppingBag, ArrowRight, Award, History, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function WelcomeScreen({ onStartShopping, onNavigate, user, onOpenTopUp }) {
  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-6 select-none animate-fadeIn">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#252525] to-[#121212] text-white pt-8 pb-10 px-5 rounded-b-[32px] shadow-lg">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-ctu-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-ctu-orange/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* CTU Seal / Monogram */}
          <div className="w-16 h-16 rounded-2xl bg-ctu-orange flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-orange-400 mb-3">
            CTU
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs font-semibold tracking-wide uppercase mb-2">
            <Sparkles size={12} />
            Official Campus Merch Kiosk
          </span>

          <h1 className="text-2xl font-black tracking-tight leading-tight mb-2">
            Wear your <span className="text-ctu-orange">campus pride.</span>
          </h1>

          <p className="text-gray-300 text-xs max-w-xs mb-6 font-normal">
            Apparel, accessories, and everyday gear crafted for students, faculty, and university alumni.
          </p>

          {/* Large Kiosk Start Button */}
          <button
            onClick={onStartShopping}
            className="w-full max-w-xs py-4 px-6 bg-ctu-orange hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-extrabold text-base flex items-center justify-center gap-3 shadow-xl transition-all animate-pulse-subtle"
          >
            <ShoppingBag size={22} />
            <span>START SHOPPING</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Student Profile & Quick Actions */}
      <div className="px-4 -mt-5 z-20">
        <div className="bg-white rounded-2xl p-4 shadow-md border border-ctu-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-ctu-orangeLight text-ctu-orange font-bold flex items-center justify-center text-sm border border-orange-200">
              DM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-ctu-dark">{user?.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {user?.role}
                </span>
              </div>
              <p className="text-[11px] text-ctu-muted font-mono">{user?.id}</p>
            </div>
          </div>

          <button
            onClick={onOpenTopUp}
            className="px-3 py-1.5 bg-ctu-orangeLight text-ctu-orange rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors flex flex-col items-end"
          >
            <span className="text-[10px] text-ctu-orangeDark font-normal">Balance</span>
            <span>₱{user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </button>
        </div>
      </div>

      {/* Campus Kiosk Quick Shortcuts */}
      <div className="px-4 mt-5 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ctu-muted px-1">
          Kiosk Services
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Rewards Card */}
          <button
            onClick={() => onNavigate('rewards')}
            className="bg-white p-4 rounded-2xl border border-ctu-border hover:border-ctu-orange shadow-sm text-left transition-all active:scale-98 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-ctu-orange flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ctu-dark">Campus Rewards</h3>
              <p className="text-[11px] text-ctu-muted mt-0.5">
                {user?.points} pts available
              </p>
            </div>
          </button>

          {/* Orders Card */}
          <button
            onClick={() => onNavigate('orders')}
            className="bg-white p-4 rounded-2xl border border-ctu-border hover:border-ctu-orange shadow-sm text-left transition-all active:scale-98 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <History size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ctu-dark">Order History</h3>
              <p className="text-[11px] text-ctu-muted mt-0.5">
                View receipts & pickup
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Campus Store Info Badge */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 border border-ctu-border shadow-sm text-xs text-ctu-muted space-y-2">
          <div className="flex items-center gap-2 text-ctu-dark font-semibold">
            <MapPin size={15} className="text-ctu-orange" />
            <span>Pickup: Campus Store Counter A (Ground Floor)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-ctu-orange" />
            <span>Orders ready in 5-10 minutes during operating hours</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>Touch-to-pay secured by CTU Student ID card system</span>
          </div>
        </div>
      </div>
    </div>
  );
}
