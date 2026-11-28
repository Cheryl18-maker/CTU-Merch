import React from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, LogIn } from 'lucide-react';

export default function CartScreen({
  cart,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  onOpenLogin
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center select-none animate-fadeIn">
        <div className="w-24 h-24 rounded-3xl bg-orange-50 text-ctu-orange flex items-center justify-center mb-4 border border-orange-200">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-black text-ctu-dark">Your bag is empty</h2>
        <p className="text-xs sm:text-sm text-ctu-muted max-w-sm mt-1 mb-6">
          Looks like you haven't added any CTU merchandise yet. Explore our campus catalog!
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-4 bg-ctu-orange hover:bg-orange-600 text-white rounded-2xl text-sm font-black transition-all shadow-md active:scale-95 border-2 border-orange-400"
        >
          Explore Campus Merchandise
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-ctu-bg pb-36 select-none animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white border-b border-ctu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-ctu-dark tracking-tight">Your shopping cart</h2>
            <p className="text-xs text-ctu-muted mt-0.5 font-medium">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for campus pickup at Ground Floor Counter A
            </p>
          </div>
          <button
            onClick={onClearCart}
            className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${index}`}
              className="bg-white rounded-3xl p-4 border border-ctu-border shadow-xs flex gap-4 items-center"
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
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
                <h3 className="font-extrabold text-sm sm:text-base text-ctu-dark truncate leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-ctu-muted mt-1 font-medium">
                  {item.color} / {item.size} · ₱{item.price.toFixed(2)} each
                </p>
                <p className="font-black text-base text-ctu-dark mt-1">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Quantity Stepper & Remove */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 border border-ctu-border rounded-xl p-1 bg-gray-50">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center text-ctu-dark shadow-xs"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black text-xs w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-ctu-orangeLight hover:bg-orange-200 flex items-center justify-center text-ctu-orange shadow-xs"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Checkout Bar (Dynamically Responsive Across Screen Width) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-ctu-border shadow-2xl p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-ctu-muted font-bold uppercase tracking-wider text-xs">
              Total ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
            </span>
            <span className="font-black text-2xl text-ctu-dark">
              ₱{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onContinueShopping}
              className="flex-1 sm:flex-none px-6 py-4 border-2 border-gray-200 hover:bg-gray-50 active:scale-95 text-ctu-dark rounded-2xl text-xs font-black transition-all"
            >
              + Add More Items
            </button>

            {user?.isGuest ? (
              /* Guest: prompt to log in before checkout */
              <button
                onClick={onOpenLogin}
                className="flex-1 sm:flex-none px-8 py-4 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl transition-all border-2 border-orange-400"
              >
                <LogIn size={18} />
                <span>Log In to Checkout</span>
              </button>
            ) : (
              <button
                onClick={onProceedToCheckout}
                className="flex-1 sm:flex-none px-8 py-4 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl transition-all border-2 border-orange-400"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
