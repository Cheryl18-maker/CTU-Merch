import React, { useState } from 'react';
import { Wallet, X, Check, PlusCircle } from 'lucide-react';

export default function TopUpModal({ currentBalance, onTopUp, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const amounts = [100, 200, 500, 1000];

  const handleConfirm = () => {
    onTopUp(selectedAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div 
        className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl space-y-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-ctu-orange flex items-center justify-center">
              <Wallet size={18} />
            </div>
            <h3 className="font-extrabold text-sm text-ctu-dark">Top Up Student Wallet</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 text-xs">
          <span className="text-ctu-muted text-[11px] block">Current Balance</span>
          <span className="text-xl font-black text-ctu-dark">₱{currentBalance?.toFixed(2)}</span>
        </div>

        <div className="space-y-2">
          <span className="font-bold text-xs text-ctu-dark">Select Amount</span>
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'border-ctu-orange bg-ctu-orangeLight text-ctu-orange'
                      : 'border-ctu-border bg-white text-ctu-dark hover:border-gray-400'
                  }`}
                >
                  +₱{amt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle size={16} />
            <span>Confirm Top Up (+₱{selectedAmount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
