import React, { useState } from 'react';
import { Wallet, Banknote, QrCode, MapPin, Clock, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export default function CheckoutScreen({
  cart,
  user,
  onConfirmOrder,
  onBackToCart,
  onOpenTopUp
}) {
  const [paymentMethod, setPaymentMethod] = useState('Campus Student Wallet');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentOptions = [
    {
      id: 'Campus Student Wallet',
      title: 'Campus Student Wallet',
      subtitle: `Balance: ₱${user?.balance?.toFixed(2) || '0.00'}`,
      icon: Wallet,
      badge: 'Fastest · Touch ID'
    },
    {
      id: 'Cash at Counter',
      title: 'Cash at Counter',
      subtitle: 'Pay when picking up at Counter A',
      icon: Banknote,
      badge: 'Pay upon pickup'
    },
    {
      id: 'GCash',
      title: 'GCash / QRPh',
      subtitle: 'Scan QR at kiosk terminal',
      icon: QrCode,
      badge: 'Instant QR'
    }
  ];

  return (
    <div className="flex flex-col flex-1 bg-ctu-bg pb-36 select-none animate-fadeIn">
      {/* Header */}
      <div className="bg-white border-b border-ctu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h2 className="text-2xl font-black text-ctu-dark tracking-tight">Checkout & Pickup</h2>
          <p className="text-xs sm:text-sm text-ctu-muted mt-0.5">
            Review your pickup details and select your preferred payment method.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Pickup Information & Payment Methods */}
          <div className="lg:col-span-7 space-y-5">
            {/* Pickup Information Card */}
            <div className="bg-white rounded-3xl p-6 border border-ctu-border shadow-xs space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-ctu-dark">CTU Main Campus Store</h3>
                  <p className="text-xs text-ctu-muted mt-0.5">
                    Student Center Ground Floor · Pickup Counter A
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs text-ctu-muted">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-ctu-orange" />
                  <span>Ready in 5-10 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Kiosk verified order</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl p-6 border border-ctu-border shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm sm:text-base text-ctu-dark">Payment Method</h3>
                <span className="text-[11px] font-bold text-ctu-orange">Touch to select</span>
              </div>

              <div className="space-y-3 pt-1">
                {paymentOptions.map((opt) => {
                  const isSelected = paymentMethod === opt.id;
                  const Icon = opt.icon;
                  const isWalletInsufficient =
                    opt.id === 'Campus Student Wallet' && (user?.balance || 0) < subtotal;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                        isSelected
                          ? 'border-ctu-orange bg-orange-50/40 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-ctu-orange text-white shadow-sm' : 'bg-gray-100 text-ctu-dark'
                        }`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-ctu-dark">{opt.title}</span>
                            {opt.badge && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-gray-100 font-bold text-ctu-muted">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-0.5 ${
                            isWalletInsufficient ? 'text-red-500 font-bold' : 'text-ctu-muted'
                          }`}>
                            {isWalletInsufficient
                              ? `Balance: ₱${user?.balance?.toFixed(2) || '0.00'} (Insufficient)`
                              : opt.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-ctu-orange bg-ctu-orange text-white'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <Check size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Breakdown */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-ctu-border shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-ctu-dark">Order Breakdown</h3>
              
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-ctu-dark truncate text-xs">{item.name}</p>
                        <p className="text-[11px] text-ctu-muted">{item.quantity}× · {item.size} / {item.color}</p>
                      </div>
                    </div>
                    <span className="font-black text-ctu-dark shrink-0">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-ctu-muted">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-ctu-dark">₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Campus Student Discount:</span>
                  <span>₱0.00</span>
                </div>
                <div className="flex justify-between font-black text-base text-ctu-dark pt-2 border-t border-gray-100">
                  <span>Total Amount:</span>
                  <span className="text-xl text-ctu-orange">₱{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Responsive Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-ctu-border shadow-2xl p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToCart}
            className="px-6 py-4 border-2 border-gray-200 hover:bg-gray-50 active:scale-95 text-ctu-dark rounded-2xl text-xs font-black transition-all"
          >
            ← Back to Bag
          </button>

          <button
            onClick={() => onConfirmOrder(paymentMethod)}
            className="flex-1 sm:flex-none px-10 py-4 bg-ctu-orange hover:bg-orange-600 active:scale-95 text-white rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 shadow-xl transition-all border-2 border-orange-400"
          >
            <span>Confirm & Pay ₱{subtotal.toFixed(2)}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
