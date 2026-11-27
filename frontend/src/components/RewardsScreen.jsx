import React, { useState } from 'react';
import { Award, Wallet, Sparkles, Check, ArrowRight, X, Ticket, Gift } from 'lucide-react';

export default function RewardsScreen({
  user,
  rewards,
  onRedeemReward,
  onOpenTopUp,
  onBackToCatalog
}) {
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemedCode, setRedeemedCode] = useState(null);

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    const res = onRedeemReward(selectedReward);
    if (res && res.voucherCode) {
      setRedeemedCode(res.voucherCode);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-ctu-bg pb-12 select-none animate-fadeIn">
      {/* Header */}
      <div className="bg-white border-b border-ctu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h2 className="text-2xl font-black text-ctu-dark tracking-tight">Balance & Rewards</h2>
          <p className="text-xs sm:text-sm text-ctu-muted mt-0.5">
            Earn points with every purchase and redeem campus rewards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Balance & Points Dual Card */}
        <div className="bg-gradient-to-br from-[#252525] to-[#161616] rounded-3xl p-5 text-white shadow-lg space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ctu-orange/20 rounded-full blur-2xl pointer-events-none" />

          {/* User info */}
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-gray-400 text-[11px]">Campus ID: {user?.id}</p>
              <h3 className="font-extrabold text-white text-sm">{user?.name}</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-ctu-orange/30 text-orange-300 text-[10px] font-bold border border-orange-400/30">
              {user?.role}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            {/* Wallet Balance */}
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-gray-300 text-[11px] mb-1">
                <Wallet size={14} className="text-ctu-orange" />
                <span>Wallet Balance</span>
              </div>
              <p className="font-black text-lg text-white">
                ₱{user?.balance?.toFixed(2)}
              </p>
              <button
                onClick={onOpenTopUp}
                className="mt-2 text-[10px] font-bold text-orange-300 hover:text-white underline block"
              >
                + Top Up Wallet
              </button>
            </div>

            {/* CTU Points */}
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-gray-300 text-[11px] mb-1">
                <Sparkles size={14} className="text-amber-400" />
                <span>CTU Points</span>
              </div>
              <p className="font-black text-lg text-amber-400">
                {user?.points} <span className="text-xs font-normal text-gray-300">pts</span>
              </p>
              <span className="mt-2 text-[10px] text-gray-400 block">
                1 pt per ₱10 spent
              </span>
            </div>
          </div>
        </div>

        {/* Redeemable Rewards List */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-ctu-muted px-1">
            Available Campus Rewards
          </h3>

          <div className="space-y-2.5">
            {rewards?.map((reward) => {
              const canAfford = user?.points >= reward.cost;

              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-2xl p-4 border border-ctu-border shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-ctu-orange flex items-center justify-center shrink-0">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-ctu-dark">
                        {reward.title}
                      </h4>
                      <p className="text-[11px] text-ctu-muted line-clamp-1 mt-0.5">
                        {reward.description}
                      </p>
                      <span className="font-black text-xs text-ctu-orange mt-1 block">
                        {reward.cost} points
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedReward(reward);
                      setRedeemedCode(null);
                    }}
                    disabled={!canAfford}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                      canAfford
                        ? 'bg-ctu-orange hover:bg-orange-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Need Points'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl text-center space-y-4 animate-scaleUp">
            {!redeemedCode ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-ctu-orange mx-auto flex items-center justify-center">
                  <Gift size={32} />
                </div>

                <div>
                  <h3 className="font-black text-base text-ctu-dark">
                    Confirm Reward Redemption
                  </h3>
                  <p className="text-xs text-ctu-muted mt-1">
                    Are you sure you want to redeem this reward?
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-1.5 text-left border border-gray-100">
                  <div className="flex justify-between font-bold text-ctu-dark">
                    <span>Reward:</span>
                    <span>{selectedReward.title}</span>
                  </div>
                  <div className="flex justify-between text-ctu-muted">
                    <span>Points Cost:</span>
                    <span className="text-ctu-orange font-bold">-{selectedReward.cost} pts</span>
                  </div>
                  <div className="flex justify-between text-ctu-muted pt-1 border-t border-gray-200">
                    <span>Remaining Points:</span>
                    <span className="font-bold text-ctu-dark">{user?.points - selectedReward.cost} pts</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedReward(null)}
                    className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 text-ctu-dark rounded-xl text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRedeem}
                    className="w-1/2 py-3 bg-ctu-orange hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce-short">
                  <Check size={32} />
                </div>

                <div>
                  <h3 className="font-black text-base text-ctu-dark">
                    Reward Claimed!
                  </h3>
                  <p className="text-xs text-ctu-muted mt-1">
                    Present this voucher code at Campus Store Counter A to claim.
                  </p>
                </div>

                {/* Voucher Code Box */}
                <div className="bg-orange-50 border-2 border-dashed border-ctu-orange rounded-2xl p-4">
                  <span className="text-[10px] text-ctu-muted uppercase tracking-wider block">
                    Campus Voucher Code
                  </span>
                  <span className="font-mono text-xl font-black text-ctu-orange tracking-widest block mt-1">
                    {redeemedCode}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedReward(null);
                    setRedeemedCode(null);
                  }}
                  className="w-full py-3 bg-ctu-orange text-white rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
