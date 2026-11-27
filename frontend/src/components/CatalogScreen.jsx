import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, ArrowRight, Tag, RotateCcw } from 'lucide-react';

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
  onResetOrder
}) {
  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-36 select-none animate-fadeIn">
      {/* Search & Category Filter Section */}
      <div className="bg-white px-5 pt-5 pb-4 border-b-2 border-ctu-border shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-ctu-dark tracking-tight">
              Merchandise Catalog
            </h2>
            <p className="text-xs text-ctu-muted mt-0.5 font-medium">
              Touch an item to customize size and color, or tap + to quickly add.
            </p>
          </div>
        </div>

        {/* Big Touch Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search merchandise (Tee, Hoodie, Cap, Tumbler)..."
            className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 text-ctu-dark placeholder:text-gray-400 border border-transparent focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-black bg-gray-200 px-2 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Large Kiosk Category Touch Tabs (McDonald's Style) */}
        <div className="flex gap-2.5 overflow-x-auto mt-4 pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 shadow-xs flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-ctu-orange text-white shadow-md scale-102 ring-2 ring-orange-300'
                    : 'bg-gray-100 text-ctu-dark hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {products.length === 0 ? (
          <div className="py-24 text-center text-ctu-muted bg-white rounded-3xl p-8 border border-ctu-border mt-2">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-base font-extrabold text-ctu-dark">No merchandise found</p>
            <p className="text-xs mt-1">Try clearing your search query or selecting "All merchandise".</p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All merchandise');
              }}
              className="mt-4 px-4 py-2 bg-ctu-orange text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-3xl p-3.5 border-2 border-ctu-border shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-ctu-orange/70 transition-all cursor-pointer group active:scale-98"
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
                  <h3 className="font-extrabold text-sm text-ctu-dark line-clamp-2 leading-snug group-hover:text-ctu-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-ctu-muted mt-0.5 line-clamp-1 font-medium">
                    {product.category} {product.stockInfo && `· ${product.stockInfo}`}
                  </p>
                </div>

                {/* Price & Quick Add Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-ctu-muted uppercase tracking-wider block font-bold">Price</span>
                    <span className="font-black text-base text-ctu-dark">
                      ₱{product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="h-10 px-3 rounded-xl bg-ctu-orangeLight text-ctu-orange hover:bg-ctu-orange hover:text-white flex items-center justify-center gap-1 transition-all shadow-xs active:scale-90 font-black text-xs border border-orange-200"
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

      {/* Persistent Bottom Order Tray (McDonald's Kiosk Style) */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-40 bg-white border-t-2 border-ctu-orange shadow-2xl p-4 animate-slideUp">
          <div className="flex items-center justify-between gap-3">
            {/* Cancel / Clear Order Button */}
            <button
              onClick={onResetOrder}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center shrink-0"
              title="Cancel Order & Start Over"
            >
              <RotateCcw size={16} />
            </button>

            {/* Middle: Bag & Running Subtotal */}
            <div 
              onClick={onViewCart} 
              className="flex items-center gap-3 cursor-pointer flex-1 select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center relative shrink-0 border border-orange-200">
                <ShoppingBag size={22} />
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] bg-ctu-orange text-white text-[11px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight">
                <p className="text-[11px] text-ctu-muted font-bold uppercase tracking-wider">
                  Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </p>
                <p className="font-black text-lg text-ctu-dark">
                  ₱{cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Giant McDonald's Style Checkout Button */}
            <button
              onClick={onViewCart}
              className="py-3.5 px-6 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer border-2 border-orange-400 shrink-0"
            >
              <span>CHECKOUT & PAY</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
