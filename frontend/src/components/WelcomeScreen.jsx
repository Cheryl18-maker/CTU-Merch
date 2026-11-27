import React from 'react';
import { ShoppingBag, ArrowRight, Award, History, Sparkles, ShieldCheck, Clock, MapPin, Wallet, ChevronRight, Tag, Shirt, Coffee, PackageCheck } from 'lucide-react';

export default function WelcomeScreen({ onStartShopping, onNavigate, user, onOpenTopUp, onOpenLogin }) {
  return (
    <div className="flex flex-col flex-1 bg-ctu-bg select-none animate-fadeIn pb-16">
      
      {/* 1. Welcome Hero Section (Figma Node 10:2658) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1c1c22] via-[#141418] to-[#0d0d10] text-white pt-12 pb-16 lg:py-20 border-b border-gray-800">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ctu-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-ctu-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs font-black tracking-widest uppercase border border-white/10">
                <Sparkles size={14} />
                Official Campus Merchandise Kiosk
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Wear your <span className="text-ctu-orange">campus pride.</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Apparel, accessories, and everyday gear crafted for students, faculty, and university alumni. Order now and pick up in minutes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={onStartShopping}
                  className="w-full sm:w-auto px-8 py-4 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer border-2 border-orange-400"
                >
                  <ShoppingBag size={22} />
                  <span>START SHOPPING</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => onNavigate('catalog')}
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-2xl font-extrabold text-sm transition-all border border-white/20"
                >
                  View Full Catalog
                </button>
              </div>

              {/* Reassurance Tags */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-ctu-orange" />
                  Ready in 5-10 mins
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-ctu-orange" />
                  Pickup Counter A
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  Student Wallet / Cash / GCash
                </span>
              </div>
            </div>

            {/* Right Visual / Banner Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-900 group">
                <img
                  src="/assets/screens/catalog.png"
                  alt="CTU Campus Merch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/assets/products/prod_1.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-orange-400 text-xs font-black uppercase tracking-wider">
                    Featured Collection
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    2026 CTU Campus Collection
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Premium Hoodies, Classic Tees & Tumblers
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Member Shortcuts Section (Figma Node 10:2686) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Student Profile & Wallet Card */}
          <div className="bg-white rounded-3xl p-5 shadow-lg border border-ctu-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-ctu-orangeLight text-ctu-orange font-black flex items-center justify-center text-sm border border-orange-200">
                {user?.isGuest ? 'G' : 'DM'}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-ctu-dark">
                    {user?.isGuest ? 'Guest Shopper' : user?.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    {user?.role || 'Guest'}
                  </span>
                </div>
                <p className="text-[11px] text-ctu-muted font-mono">{user?.id}</p>
              </div>
            </div>

            {user?.isGuest ? (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 bg-ctu-orange text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={onOpenTopUp}
                className="px-3.5 py-2 bg-ctu-orangeLight hover:bg-orange-100 text-ctu-orange rounded-xl text-xs font-extrabold transition-colors flex flex-col items-end border border-orange-200"
              >
                <span className="text-[10px] text-ctu-orangeDark font-normal">Wallet Balance</span>
                <span className="text-sm">₱{user?.balance?.toFixed(2)}</span>
              </button>
            )}
          </div>

          {/* Campus Rewards Card */}
          <div 
            onClick={() => onNavigate('rewards')}
            className="bg-white rounded-3xl p-5 shadow-lg border border-ctu-border flex items-center justify-between cursor-pointer hover:border-ctu-orange transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-ctu-dark">Campus Rewards</h4>
                <p className="text-xs text-ctu-muted mt-0.5">
                  {user?.points} points available to redeem
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-ctu-orange group-hover:translate-x-1 transition-all" />
          </div>

          {/* Order History Card */}
          <div 
            onClick={() => onNavigate('orders')}
            className="bg-white rounded-3xl p-5 shadow-lg border border-ctu-border flex items-center justify-between cursor-pointer hover:border-ctu-orange transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                <History size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-ctu-dark">Order History</h4>
                <p className="text-xs text-ctu-muted mt-0.5">
                  View past orders & receipts
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>

        </div>
      </section>

      {/* 3. Collection Discovery Section (Figma Node 10:2705) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] font-extrabold text-ctu-orange uppercase tracking-wider block mb-1">
              Curated University Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ctu-dark tracking-tight">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-extrabold text-ctu-orange hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Category 1: Apparel */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="bg-white rounded-3xl p-6 border border-ctu-border shadow-sm hover:shadow-xl hover:border-ctu-orange transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shirt size={26} />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ctu-orange">
                Campus Apparel
              </span>
              <h3 className="font-extrabold text-lg text-ctu-dark mt-1">
                Varsity Hoodies & Tees
              </h3>
              <p className="text-xs text-ctu-muted mt-1 leading-relaxed">
                Classic heavyweight cotton tees, collegiate hoodies, and comfortable uniforms.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-ctu-dark group-hover:text-ctu-orange">
              <span>Shop Apparel</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Category 2: Accessories */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="bg-white rounded-3xl p-6 border border-ctu-border shadow-sm hover:shadow-xl hover:border-ctu-orange transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Tag size={26} />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                Daily Companions
              </span>
              <h3 className="font-extrabold text-lg text-ctu-dark mt-1">
                Caps, Totes & Lanyards
              </h3>
              <p className="text-xs text-ctu-muted mt-1 leading-relaxed">
                Everyday essentials for campus life: heavy canvas totes, dad caps, and ID lanyards.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-ctu-dark group-hover:text-ctu-orange">
              <span>Shop Accessories</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Category 3: Drinkware */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="bg-white rounded-3xl p-6 border border-ctu-border shadow-sm hover:shadow-xl hover:border-ctu-orange transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Coffee size={26} />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                Campus Drinkware
              </span>
              <h3 className="font-extrabold text-lg text-ctu-dark mt-1">
                Tumblers & Ceramic Mugs
              </h3>
              <p className="text-xs text-ctu-muted mt-1 leading-relaxed">
                Vacuum-insulated 750ml flasks and glazed coffee mugs keeping campus drinks fresh.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-ctu-dark group-hover:text-ctu-orange">
              <span>Shop Drinkware</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Campus Pickup Notice Banner (Figma Node 10:3396) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="bg-white rounded-3xl p-6 border border-ctu-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-ctu-dark">
                Main Campus Store Pickup · Student Center Ground Floor
              </h4>
              <p className="text-xs text-ctu-muted mt-0.5">
                Counter A is open Monday through Friday, 8:00 AM to 5:00 PM. Instant ready-time notifications.
              </p>
            </div>
          </div>
          <button
            onClick={onStartShopping}
            className="w-full md:w-auto px-6 py-3 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-black transition-all shadow-sm shrink-0"
          >
            Order for Pickup
          </button>
        </div>
      </section>

      {/* 5. Store Footer (Figma Node 10:2738) */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-200 w-full text-xs text-ctu-muted">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-ctu-orange flex items-center justify-center text-white font-black text-xs">
              CTU
            </div>
            <span className="font-bold text-ctu-dark">Cebu Technological University Merch Kiosk</span>
          </div>
          <p>© 2026 Cebu Technological University. Official Campus Self-Service Terminal.</p>
        </div>
      </footer>

    </div>
  );
}
