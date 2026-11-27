import React from 'react';
import { X, Printer, QrCode } from 'lucide-react';

export default function ReceiptModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div 
        className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-ctu-border bg-gray-50">
          <span className="font-extrabold text-xs text-ctu-dark uppercase tracking-wider">
            Official Kiosk Receipt
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
          >
            <X size={15} />
          </button>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs text-slate-800 bg-white">
          <div className="text-center space-y-1">
            <h3 className="font-black text-sm text-ctu-dark">CEBU TECHNOLOGICAL UNIVERSITY</h3>
            <p className="text-[11px] text-gray-500">Official Campus Merchandise Store</p>
            <p className="text-[10px] text-gray-400">Terminal #01 · Self-Service Kiosk</p>
            <div className="border-b border-dashed border-gray-300 my-2" />
          </div>

          <div className="text-[11px] space-y-1">
            <div className="flex justify-between">
              <span>Order No:</span>
              <span className="font-bold">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup:</span>
              <span>{order.pickupLocation}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-gray-300 my-2" />

          {/* Items */}
          <div className="space-y-2 text-[11px]">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-400 text-[10px]">{item.color} / {item.size} × {item.quantity}</p>
                </div>
                <span className="font-bold">₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-b border-dashed border-gray-300 my-2" />

          {/* Totals */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal:</span>
              <span>₱{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax / Fee:</span>
              <span>₱0.00</span>
            </div>
            <div className="flex justify-between font-black text-sm text-ctu-dark pt-1 border-t border-gray-200">
              <span>Total Paid:</span>
              <span className="text-ctu-orange">₱{order.total?.toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode/QR */}
          <div className="pt-2 text-center flex flex-col items-center">
            <QrCode size={80} className="text-gray-800" />
            <p className="text-[10px] text-gray-400 mt-1">Present this receipt at Counter A</p>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="p-4 bg-gray-50 border-t border-ctu-border flex gap-2">
          <button
            onClick={handlePrint}
            className="w-1/2 py-2.5 bg-gray-200 hover:bg-gray-300 text-ctu-dark rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer size={15} />
            <span>Print</span>
          </button>
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
