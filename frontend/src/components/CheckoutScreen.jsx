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
      subtitle: `Balance: ₱${user?.balance?.toFixed(2)}`,
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
    <div className="flex flex-col min-h-full bg-ctu-bg pb-32 select-none animate-fadeIn">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-ctu-border">
        <h2 className="text-xl font-black text-ctu-dark tracking-tight">Checkout & Pickup</h2>
        <p className="text-xs text-ctu-muted mt-0.5">
          Review your pickup details and select your preferred payment.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Pickup Information Card */}
        <div className="bg-white rounded-2xl p-4 border border-ctu-border shadow-xs space-y-2.5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-bold text-xs text-ctu-dark">CTU Main Campus Store</h3>
              <p className="text-[11px] text-ctu-muted">
                Student Center Ground Floor · Pickup Counter A
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-ctu-muted pt-2 border-t border-gray-100">
            <Clock size={14} className="text-ctu-orange" />
            <span>Estimated pickup: Ready in 5-10 minutes</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-ctu-muted">
              Select Payment Method
            </h3>
            {paymentMethod === 'Campus Student Wallet' && user?.balance < subtotal && (
              <button
                onClick={onOpenTopUp}
                className="text-xs text-ctu-orange font-bold hover:underline"
              >
                + Top Up Wallet
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = paymentMethod === opt.id;
              const isWalletInsufficient = opt.id === 'Campus Student Wallet' && user?.balance < subtotal;

              return (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-ctu-orangeLight/60 border-ctu-orange shadow-xs'
                      : 'bg-white border-ctu-border hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-ctu-orange text-white' : 'bg-gray-100 text-ctu-dark'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-ctu-dark">{opt.title}</span>
                        {opt.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 font-semibold text-ctu-muted">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] ${
                        isWalletInsufficient ? 'text-red-500 font-bold' : 'text-ctu-muted'
                      }`}>
                        {isWalletInsufficient
                          ? `Balance: ₱${user?.balance?.toFixed(2)} (Insufficient)`
                          : opt.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-ctu-orange bg-ctu-orange text-white'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <Check size={14} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-ctu-border shadow-xs space-y-2 text-xs">
          <h3 className="font-bold text-ctu-dark text-xs mb-2">Order Breakdown</h3>
          
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-ctu-muted text-[11px]">
                <span className="truncate max-w-[200px]">
                  {item.quantity}× {item.name} ({item.size})
                </span>
                <span className="font-medium text-ctu-dark">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-1 text-ctu-muted text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-ctu-dark">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Campus Student Subsidy:</span>
              <span>₱0.00</span>
            </div>
            <div className="flex justify-between font-black text-sm text-ctu-dark pt-1 border-t border-gray-100">
              <span>Total Amount:</span>
              <span className="text-base text-ctu-orange">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-ctu-border shadow-2xl z-40">
        <button
          onClick={() => onConfirmOrder(paymentMethod)}
          className="w-full py-3.5 bg-ctu-orange hover:bg-orange-600 active:scale-98 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <span>Confirm & Pay ₱{subtotal.toFixed(2)}</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
