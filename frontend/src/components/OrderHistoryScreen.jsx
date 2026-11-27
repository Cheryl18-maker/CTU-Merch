import React from 'react';
import { History, ChevronRight, PackageCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function OrderHistoryScreen({
  orders,
  onSelectOrder,
  onBackToCatalog
}) {
  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-12 select-none animate-fadeIn">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-ctu-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToCatalog}
            className="p-1 rounded-full hover:bg-gray-100 text-ctu-dark"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-black text-ctu-dark tracking-tight">Order History</h2>
        </div>
        <span className="text-xs text-ctu-muted font-medium">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {orders.length === 0 ? (
          <div className="py-20 text-center text-ctu-muted">
            <PackageCheck size={40} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-bold text-ctu-dark">No orders yet</p>
            <p className="text-xs mt-1">Your past merchandise orders will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="bg-white rounded-2xl p-4 border border-ctu-border shadow-xs hover:border-ctu-orange transition-all cursor-pointer space-y-3 active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-ctu-dark">
                    {order.id}
                  </span>
                  <p className="text-[10px] text-ctu-muted mt-0.5">{order.date}</p>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  order.status === 'Ready for Pickup'
                    ? 'bg-orange-50 text-ctu-orange border border-orange-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Items Summary */}
              <div className="text-xs text-ctu-muted space-y-1 pt-1 border-t border-gray-100">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[210px]">
                      {item.quantity}× {item.name} ({item.size})
                    </span>
                    <span className="font-semibold text-ctu-dark">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-ctu-muted block">Total Paid:</span>
                  <span className="font-black text-sm text-ctu-orange">
                    ₱{order.total?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-ctu-dark">
                  <span>View Pass</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
