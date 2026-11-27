import React from 'react';
import { CheckCircle2, QrCode, Printer, Home, MapPin, Clock, Sparkles } from 'lucide-react';

export default function OrderSuccessScreen({
  order,
  onHome,
  onViewReceipt
}) {
  if (!order) return null;

  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-12 select-none animate-fadeIn">
      {/* Top Success Banner */}
      <div className="bg-white px-5 pt-8 pb-6 border-b border-ctu-border text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-sm animate-bounce-short">
          <CheckCircle2 size={38} />
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
          Payment & Order Confirmed
        </span>

        <h1 className="text-2xl font-black text-ctu-dark tracking-tight">
          Order Successful!
        </h1>
        <p className="text-xs text-ctu-muted mt-1 max-w-xs">
          Thank you for supporting Cebu Technological University merchandise.
        </p>

        {/* Order ID Pill */}
        <div className="mt-4 px-4 py-2 bg-gray-100 rounded-xl border border-gray-200">
          <span className="text-[11px] text-ctu-muted block">Pickup Order Number</span>
          <span className="text-lg font-black text-ctu-orange tracking-wider font-mono">
            {order.id}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* QR Code & Pickup Pass */}
        <div className="bg-white rounded-3xl p-5 border border-ctu-border shadow-sm text-center space-y-4">
          <h2 className="font-extrabold text-sm text-ctu-dark">
            Campus Pickup Pass
          </h2>

          {/* Simulated QR Code */}
          <div className="w-44 h-44 mx-auto p-3 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center">
            <QrCode size={130} className="text-ctu-dark" />
            <span className="text-[10px] font-mono text-ctu-muted mt-1">
              SCAN AT COUNTER A
            </span>
          </div>

          <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100 text-xs space-y-1.5 text-left">
            <div className="flex items-center gap-2 font-bold text-ctu-dark">
              <MapPin size={15} className="text-ctu-orange" />
              <span>CTU Campus Store Counter A</span>
            </div>
            <div className="flex items-center gap-2 text-ctu-muted text-[11px]">
              <Clock size={15} className="text-ctu-orange" />
              <span>Ready for pickup in approx. 5-10 minutes</span>
            </div>
          </div>

          {order.pointsEarned && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-ctu-orange bg-ctu-orangeLight py-2 rounded-xl">
              <Sparkles size={15} />
              <span>+{order.pointsEarned} CTU Reward Points earned!</span>
            </div>
          )}
        </div>

        {/* Quick Items Preview */}
        <div className="bg-white rounded-2xl p-4 border border-ctu-border shadow-xs text-xs space-y-2">
          <h3 className="font-bold text-ctu-dark">Items Ordered ({order.items?.length})</h3>
          <div className="space-y-1.5 text-[11px] text-ctu-muted">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.quantity}× {item.name} ({item.size})</span>
                <span className="font-semibold text-ctu-dark">₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-100 flex justify-between font-black text-sm text-ctu-dark">
            <span>Total Paid ({order.paymentMethod}):</span>
            <span className="text-ctu-orange">₱{order.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onViewReceipt}
            className="w-full py-3.5 bg-white border border-ctu-border hover:bg-gray-50 text-ctu-dark rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Printer size={16} />
            <span>View Printable Receipt</span>
          </button>

          <button
            onClick={onHome}
            className="w-full py-3.5 bg-ctu-orange hover:bg-orange-600 active:scale-98 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Home size={16} />
            <span>Done · Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
