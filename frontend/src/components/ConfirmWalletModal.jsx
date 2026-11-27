import React, { useState } from 'react';
import { Wallet, ShieldCheck, X, CheckCircle, Fingerprint } from 'lucide-react';

export default function ConfirmWalletModal({
  user,
  totalAmount,
  onConfirm,
  onClose
}) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const remaining = user?.balance - totalAmount;

  const handlePinInput = (num) => {
    const nextIdx = pin.findIndex(d => d === '');
    if (nextIdx !== -1) {
      const newPin = [...pin];
      newPin[nextIdx] = num;
      setPin(newPin);
      if (nextIdx === 3) {
        triggerPayment();
      }
    }
  };

  const handleBackspace = () => {
    const filledIdxs = pin.map((d, i) => d !== '' ? i : -1).filter(i => i !== -1);
    if (filledIdxs.length > 0) {
      const lastIdx = filledIdxs[filledIdxs.length - 1];
      const newPin = [...pin];
      newPin[lastIdx] = '';
      setPin(newPin);
    }
  };

  const triggerPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div 
        className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl animate-slideUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-ctu-border">
          <div className="flex items-center gap-2 text-ctu-dark font-extrabold text-sm">
            <Wallet size={18} className="text-ctu-orange" />
            <span>Confirm Campus Wallet</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-center">
          <div>
            <span className="text-[11px] text-ctu-muted">Payment to Campus Store</span>
            <h2 className="text-3xl font-black text-ctu-dark tracking-tight mt-0.5">
              ₱{totalAmount.toFixed(2)}
            </h2>
          </div>

          {/* Account & Balance Box */}
          <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 text-xs space-y-2 text-left">
            <div className="flex justify-between text-ctu-muted text-[11px]">
              <span>Student Account:</span>
              <span className="font-bold text-ctu-dark">{user?.name}</span>
            </div>
            <div className="flex justify-between text-ctu-muted text-[11px]">
              <span>ID Number:</span>
              <span className="font-mono text-ctu-dark">{user?.id}</span>
            </div>
            <div className="h-px bg-gray-200 my-1" />
            <div className="flex justify-between text-ctu-muted">
              <span>Current Balance:</span>
              <span className="font-semibold text-ctu-dark">₱{user?.balance?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Remaining Balance:</span>
              <span>₱{remaining.toFixed(2)}</span>
            </div>
          </div>

          {/* PIN Pad / Quick Tap */}
          <div className="space-y-3">
            <p className="text-[11px] text-ctu-muted font-medium">
              Enter 4-digit student PIN or tap Authorize
            </p>

            {/* PIN Dots */}
            <div className="flex justify-center gap-3 my-2">
              {pin.map((digit, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    digit !== ''
                      ? 'border-ctu-orange bg-ctu-orange scale-110'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              ))}
            </div>

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinInput(num.toString())}
                  className="h-11 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 font-extrabold text-sm text-ctu-dark transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={triggerPayment}
                className="h-11 rounded-xl bg-ctu-orangeLight text-ctu-orange font-bold text-xs flex items-center justify-center hover:bg-orange-200 transition-colors"
                title="Bypass with Biometric"
              >
                <Fingerprint size={18} />
              </button>
              <button
                onClick={() => handlePinInput('0')}
                className="h-11 rounded-xl bg-gray-100 hover:bg-gray-200 font-extrabold text-sm text-ctu-dark transition-colors"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-600 transition-colors flex items-center justify-center"
              >
                Del
              </button>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={triggerPayment}
            disabled={isProcessing}
            className="w-full py-3.5 bg-ctu-orange hover:bg-orange-600 active:scale-98 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all mt-3"
          >
            {isProcessing ? (
              <span className="animate-pulse">Authorizing Payment...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Tap to Authorize ₱{totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
