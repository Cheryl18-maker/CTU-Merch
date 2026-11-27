import React from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartScreen({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center select-none animate-fadeIn">
        <div className="w-20 h-20 rounded-3xl bg-orange-50 text-ctu-orange flex items-center justify-center mb-4">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-xl font-black text-ctu-dark">Your bag is empty</h2>
        <p className="text-xs text-ctu-muted max-w-xs mt-1 mb-6">
          Looks like you haven't added any CTU merchandise yet. Explore the campus catalog!
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
        >
          Explore Campus Merchandise
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-32 select-none animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white px-4 py-4 border-b border-ctu-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-ctu-dark tracking-tight">Your shopping cart</h2>
          <p className="text-xs text-ctu-muted mt-0.5">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for campus pickup
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Cart Items List */}
      <div className="p-4 space-y-3">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${item.size}-${item.color}-${index}`}
            className="bg-white rounded-2xl p-3 border border-ctu-border shadow-xs flex gap-3 items-center"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/products/prod_1.png';
                }}
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs text-ctu-dark truncate leading-tight">
                {item.name}
              </h3>
              <p className="text-[11px] text-ctu-muted mt-0.5">
                {item.color} / {item.size} · ₱{item.price.toFixed(2)} each
              </p>
              <p className="font-extrabold text-sm text-ctu-dark mt-1">
                ₱{(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Quantity Stepper & Remove */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2 border border-ctu-border rounded-lg p-1 bg-white">
                  <button
                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-ctu-dark"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    className="w-6 h-6 rounded bg-ctu-orangeLight hover:bg-orange-200 flex items-center justify-center text-ctu-orange"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Checkout Bar (McDonald's Kiosk Style) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto p-4 bg-white border-t-2 border-ctu-border shadow-2xl z-40">
        <div className="flex justify-between items-center text-xs mb-3">
          <span className="text-ctu-muted font-bold uppercase tracking-wider text-[11px]">Total ({totalItems} items):</span>
          <span className="font-black text-2xl text-ctu-dark">
            ₱{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onContinueShopping}
            className="w-1/3 py-4 border-2 border-gray-200 hover:bg-gray-50 active:scale-95 text-ctu-dark rounded-2xl text-xs font-black transition-all"
          >
            + Add More Items
          </button>
          <button
            onClick={onProceedToCheckout}
            className="w-2/3 py-4 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl transition-all border-2 border-orange-400"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
