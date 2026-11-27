import React from 'react';
import { AlertCircle, PlusCircle, ArrowRight, X } from 'lucide-react';

export default function InsufficientBalanceModal({
  currentBalance,
  requiredAmount,
  onTopUp,
  onSwitchPayment,
  onClose
}) {
  const shortfall = requiredAmount - currentBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div 
        className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl p-6 text-center space-y-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
          <AlertCircle size={36} />
        </div>

        <div>
          <h2 className="text-lg font-black text-ctu-dark">
            Insufficient Wallet Balance
          </h2>
          <p className="text-xs text-ctu-muted mt-1 leading-relaxed">
            Your current balance is not enough to complete this purchase.
          </p>
        </div>

        {/* Amount Comparison */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs space-y-2 text-left">
          <div className="flex justify-between text-ctu-muted">
            <span>Required Total:</span>
            <span className="font-bold text-ctu-dark">₱{requiredAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-ctu-muted">
            <span>Current Balance:</span>
            <span className="font-semibold text-ctu-dark">₱{currentBalance.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200 my-1" />
          <div className="flex justify-between text-red-500 font-extrabold text-sm">
            <span>Shortfall:</span>
            <span>₱{shortfall.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => onTopUp(Math.ceil(shortfall / 100) * 100 || 500)}
            className="w-full py-3 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <PlusCircle size={16} />
            <span>Top Up ₱{Math.ceil(shortfall / 100) * 100 || 500} & Pay</span>
          </button>

          <button
            onClick={onSwitchPayment}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-ctu-dark rounded-xl text-xs font-bold transition-colors"
          >
            Pay with Cash / GCash Instead
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-ctu-muted hover:text-ctu-dark text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
