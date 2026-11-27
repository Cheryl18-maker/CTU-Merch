import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

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
  onViewCart
}) {
  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-28 select-none">
      {/* Search & Header Intro */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-ctu-border">
        <h2 className="text-xl font-black text-ctu-dark tracking-tight">
          Wear your campus pride.
        </h2>
        <p className="text-xs text-ctu-muted mt-0.5">
          Select merchandise below to personalize and add to your bag.
        </p>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search merchandise (e.g. Tee, Hoodie, Cap)..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ctu-orange/40 text-ctu-dark"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto mt-3 pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-ctu-orange text-white shadow-sm'
                    : 'bg-gray-100 text-ctu-dark hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-3">
        {products.length === 0 ? (
          <div className="py-16 text-center text-ctu-muted">
            <p className="text-sm font-semibold">No merchandise found.</p>
            <p className="text-xs mt-1">Try clearing your search or choosing another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl p-2.5 border border-ctu-border shadow-sm flex flex-col justify-between hover:shadow-md hover:border-ctu-orange/50 transition-all cursor-pointer group active:scale-98"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/products/prod_1.png';
                      }}
                    />
                    {product.tag && (
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] font-extrabold px-1.5 py-0.5 rounded text-ctu-dark uppercase tracking-wider">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-xs text-ctu-dark line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-ctu-muted mt-0.5 line-clamp-1">
                    {product.category}
                  </p>
                </div>

                {/* Price & Quick Add */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <span className="font-extrabold text-sm text-ctu-dark">
                    ₱{product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="w-7 h-7 rounded-lg bg-ctu-orangeLight text-ctu-orange hover:bg-ctu-orange hover:text-white flex items-center justify-center transition-colors shadow-xs active:scale-90"
                    title="Quick Add"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (from Figma Screen 3 / 10) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40">
          <div
            onClick={onViewCart}
            className="bg-ctu-orange text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer active:scale-98 transition-all hover:bg-orange-600 animate-slideUp"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="font-extrabold text-sm leading-tight">
                  Your cart · {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
                <p className="text-[11px] text-orange-100">
                  Ready for instant campus pickup
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-black text-base">
                ₱{cartTotal.toFixed(2)}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <ArrowRight size={17} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
