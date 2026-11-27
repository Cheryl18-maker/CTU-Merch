import React, { useState, useMemo } from 'react';
import { Search, Plus, ShoppingBag, ArrowRight, Tag, ChevronRight, SlidersHorizontal, ArrowUpDown, MapPin, Check } from 'lucide-react';

export default function CatalogScreen({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onQuickAdd,
  cartCount,
  cartTotal,
  onViewCart,
  onNavigateHome,
  user,
  onOpenLogin
}) {
  const [sortBy, setSortBy] = useState('featured');

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="flex flex-col flex-1 bg-ctu-bg pb-32 select-none animate-fadeIn">
      
      {/* 1. Catalog Header & Introduction (Figma Node 10:2907) */}
      <div className="bg-white border-b border-ctu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Breadcrumb (10:2908) */}
          <div className="flex items-center gap-1.5 text-xs text-ctu-muted mb-3 font-semibold">
            <button 
              onClick={onNavigateHome}
              className="hover:text-ctu-dark transition-colors"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-gray-400" />
            <span className="text-ctu-orange font-bold">Catalog</span>
            {selectedCategory !== 'All merchandise' && (
              <>
                <ChevronRight size={13} className="text-gray-400" />
                <span className="text-ctu-dark">{selectedCategory}</span>
              </>
            )}
          </div>

          {/* Collection Introduction (10:2912) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-ctu-orange block mb-1">
                Official Campus Gear
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-ctu-dark tracking-tight">
                Wear your campus pride.
              </h1>
              <p className="text-xs sm:text-sm text-ctu-muted mt-1 max-w-xl font-normal leading-relaxed">
                Apparel, accessories, and daily essentials crafted for students, faculty, and alumni.
              </p>
            </div>

            {/* Guest / Account Notice Pill (10:2917) */}
            {user?.isGuest && (
              <div 
                onClick={onOpenLogin}
                className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer hover:bg-orange-100/80 transition-colors shrink-0"
              >
                <div className="w-10 h-10 rounded-xl bg-ctu-orange text-white flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-ctu-dark">Shopping as Guest</p>
                  <p className="text-ctu-muted text-[11px]">Tap here to sign in with your CTU ID</p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Category Navigation Tabs (Figma Node 10:2924) */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-2 no-scrollbar border-b border-gray-100">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-ctu-orange text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-300'
                      : 'bg-gray-100 text-ctu-dark hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3. Browsing Controls (Figma Node 10:2938) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search merchandise (Tee, Hoodie, Cap, Tumbler)..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/40 text-ctu-dark placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[11px] font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Results Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-ctu-muted">
              <span className="font-semibold">
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
              </span>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 font-bold text-ctu-dark">
                <ArrowUpDown size={14} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Complete Merchandise Grid (Figma Node 10:2953) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {sortedProducts.length === 0 ? (
          <div className="py-24 text-center text-ctu-muted bg-white rounded-3xl p-8 border border-ctu-border">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-base font-extrabold text-ctu-dark">No merchandise found</p>
            <p className="text-xs mt-1">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All merchandise');
              }}
              className="mt-4 px-5 py-2.5 bg-ctu-orange text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-3xl p-4 border border-ctu-border shadow-xs hover:shadow-xl hover:border-ctu-orange/60 transition-all cursor-pointer group flex flex-col justify-between active:scale-98"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 mb-3 border border-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/products/prod_1.png';
                      }}
                    />
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-[9px] font-black px-2 py-0.5 rounded-md text-ctu-dark uppercase tracking-wider shadow-xs border border-gray-100">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-ctu-orange block mb-0.5">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-ctu-dark line-clamp-2 leading-snug group-hover:text-ctu-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-ctu-muted mt-1 line-clamp-2 font-normal leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add to Bag Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-ctu-muted uppercase tracking-wider block font-semibold">Price</span>
                    <span className="font-black text-base text-ctu-dark">
                      ₱{product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="h-10 px-3.5 rounded-xl bg-ctu-orangeLight text-ctu-orange hover:bg-ctu-orange hover:text-white flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-90 font-black text-xs border border-orange-200"
                    title="Quick Add to Bag"
                  >
                    <Plus size={16} />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Campus Pickup Notice Banner (Figma Node 10:3396) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
        <div className="bg-white rounded-3xl p-5 border border-ctu-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-ctu-dark">
                Campus Store Pickup · Student Center Ground Floor
              </p>
              <p className="text-[11px] text-ctu-muted">
                Orders ready in 5-10 minutes. Pickup Counter A is open Mon-Fri 8:00 AM - 5:00 PM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Dynamic Persistent Bottom Order Bar (McDonald's Kiosk Style) */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-ctu-orange shadow-2xl p-4 animate-slideUp">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Bag & Items Summary */}
            <div 
              onClick={onViewCart} 
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-ctu-orange text-white flex items-center justify-center relative shrink-0 shadow-md">
                <ShoppingBag size={22} />
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] bg-white text-ctu-orange text-[11px] font-black rounded-full flex items-center justify-center ring-2 ring-ctu-orange">
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight">
                <p className="text-[11px] text-ctu-muted font-bold uppercase tracking-wider">
                  Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </p>
                <p className="font-black text-xl text-ctu-dark">
                  ₱{cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Right: Checkout Button */}
            <button
              onClick={onViewCart}
              className="py-3.5 px-8 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer border-2 border-orange-400"
            >
              <span>CHECKOUT & PAY</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
