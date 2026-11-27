import React, { useState } from 'react';
import { X, Check, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.gallery?.[0] || product.image);

  const subtotal = product.price * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      quantity: quantity,
      image: activeImage || product.image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div 
        className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-ctu-border">
          <h2 className="font-extrabold text-base text-ctu-dark">Make it yours</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* Main Photo Gallery */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/products/prod_1.png';
              }}
            />
            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-medium px-2 py-1 rounded-full text-ctu-muted shadow-sm">
              Front view · {selectedColor}
            </span>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-[10px] font-extrabold tracking-wider text-ctu-orangeDark uppercase">
              {product.tag || 'CAMPUS ESSENTIALS'}
            </span>
            <h1 className="text-xl font-black text-ctu-dark leading-tight mt-0.5">
              {product.name}
            </h1>
            <p className="text-lg font-black text-ctu-dark mt-1">
              ₱{product.price.toFixed(2)}
            </p>
            <p className="text-xs text-ctu-muted leading-relaxed mt-1">
              {product.description}
            </p>

            {/* Stock status indicator */}
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-ctu-green">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>In stock · {product.stockInfo || 'Available for immediate pickup'}</span>
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ctu-dark">Choose your size</span>
                <span className="text-ctu-muted">Selected: {selectedSize}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-ctu-orangeLight border-2 border-ctu-orange text-ctu-dark shadow-xs'
                          : 'bg-white border border-ctu-border text-ctu-dark hover:border-gray-400'
                      }`}
                    >
                      <span>{size}</span>
                      {isSelected && <Check size={14} className="text-ctu-orange" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ctu-dark">Choose your color</span>
                <span className="text-ctu-muted">Selected: {selectedColor}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-11 px-3.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-ctu-orangeLight border-2 border-ctu-orange text-ctu-dark'
                          : 'bg-white border border-ctu-border text-ctu-dark hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      {isSelected && <Check size={13} className="text-ctu-orange" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="font-bold text-xs text-ctu-dark">Quantity</span>
            <div className="flex items-center justify-between border border-ctu-border rounded-xl p-1.5 max-w-[160px] bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-ctu-dark transition-colors"
              >
                <Minus size={15} />
              </button>
              <span className="font-extrabold text-sm text-ctu-dark">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg bg-ctu-orangeLight hover:bg-orange-200 flex items-center justify-center text-ctu-orange transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-ctu-dark">{selectedColor} / {selectedSize} · {quantity} {quantity === 1 ? 'item' : 'items'}</p>
              <p className="text-ctu-muted text-[11px]">₱{product.price.toFixed(2)} each</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-ctu-muted block">Subtotal</span>
              <span className="font-extrabold text-base text-ctu-dark">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-ctu-border flex gap-3 bg-white">
          <button
            onClick={onClose}
            className="w-1/3 py-3 border border-ctu-border hover:bg-gray-50 text-ctu-dark font-bold text-xs rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="w-2/3 py-3 bg-ctu-orange hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <ShoppingBag size={17} />
            <span>Add to Cart · ₱{subtotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
