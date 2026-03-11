"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  Filter, 
  Download, 
  Tag,
  CreditCard,
  Zap,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRewardStore } from '@/lib/store';
import { formatCurrency, getBestCardForTransaction } from '@/lib/reward-logic';
import { motion, AnimatePresence } from 'framer-motion';

function TransactionsContent() {
  const { transactions, cards } = useRewardStore();
  const searchParams = useSearchParams();
  const [selectedCardId, setSelectedCardId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with query param if present
  useEffect(() => {
    const cardId = searchParams.get('cardId');
    if (cardId) {
      setSelectedCardId(cardId);
    }
  }, [searchParams]);

  // Filter logic
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCard = selectedCardId === 'all' || tx.cardId === selectedCardId;
    return matchesSearch && matchesCard;
  });

  // Summary Metrics for the selection
  const totalAmount = filteredTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  const totalPoints = filteredTransactions.reduce((acc, tx) => acc + tx.pointsEarned, 0);
  
  const selectedCard = cards.find(c => c.id === selectedCardId);

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {selectedCard ? `${selectedCard.issuer} ${selectedCard.name}` : 'All Transactions'}
          </h1>
          <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">
            {selectedCard ? `Detailed overview for card ending in ${selectedCard.last4}` : 'Track every swipe across your entire portfolio.'}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-100 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm hover:shadow-md transition-all w-full md:w-auto">
           <Download className="h-4 w-4" />
           Export CSV
        </button>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
         <motion.div 
           layout
           className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden border border-white/5"
         >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Transaction Value</p>
            <p className="text-3xl font-black tracking-tight">{formatCurrency(totalAmount)}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-400">
              <Zap className="h-3 w-3 fill-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
              Verified by IROS
            </div>
         </motion.div>

         <motion.div 
           layout
           className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-colors"
         >
            <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-600 transition-opacity group-hover:opacity-10">
              <Zap className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Points Earned</p>
            <p className="text-3xl font-black text-emerald-600 tracking-tight">{totalPoints.toLocaleString()}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase">
              Average yield: <span className="text-emerald-600">{totalAmount > 0 ? ((totalPoints / (totalAmount/100))).toFixed(2) : '0'}%</span>
            </div>
         </motion.div>

         <motion.div 
           layout
           className="bg-slate-50 border border-slate-100 p-6 rounded-3xl shadow-sm relative overflow-hidden transition-all"
         >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-900">
              <Wallet className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Redemption Value</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{formatCurrency(totalPoints * (selectedCard?.pointsToRupees || 0.25))}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              Liquid Cash Equivalent
            </div>
         </motion.div>
      </div>

      {/* Card Selector Loop */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
        <button 
          onClick={() => setSelectedCardId('all')}
          className={cn(
            "flex-shrink-0 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2",
            selectedCardId === 'all' 
              ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-500/10" 
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          )}
        >
          All Cards
        </button>
        {cards.map((card) => (
          <button 
            key={card.id}
            onClick={() => setSelectedCardId(card.id)}
            className={cn(
              "flex-shrink-0 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-3",
              selectedCardId === card.id 
                ? "bg-slate-900 text-white border-slate-900 shadow-2xl" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <div className={cn("h-4 w-6 rounded-sm text-[6px] flex items-center justify-center font-black text-white italic shadow-sm", card.color)}>
              {card.issuer}
            </div>
            {card.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
         <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search merchants or categories..."
                 className="w-full h-12 rounded-xl border border-slate-100 bg-white pl-12 pr-4 font-bold text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <button className="h-12 px-6 rounded-xl bg-white border border-slate-100 font-bold text-sm text-slate-900 shadow-sm flex items-center justify-center gap-2">
               <Filter className="h-4 w-4" />
               Filters
            </button>
         </div>

         <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => {
                  const card = cards.find(c => c.id === tx.cardId);
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={tx.id} 
                      className="premium-card rounded-2xl p-4 md:p-6 flex flex-col gap-4 group hover:border-emerald-100 transition-all shadow-sm"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                              <Tag className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                  <h3 className="text-sm md:text-base font-black text-slate-900 truncate">{tx.merchant}</h3>
                                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">{tx.category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                  <p className="text-[11px] font-bold text-slate-500">{tx.date}</p>
                                  <div className="h-1 w-1 rounded-full bg-slate-200" />
                                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                                    Used: <span className="text-slate-500">{card?.issuer} {card?.name}</span>
                                  </p>
                              </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-8 md:gap-12 pl-14 md:pl-0">
                          <div className="text-left md:text-right">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Amount</p>
                              <p className="text-base md:text-lg font-black text-slate-900">{formatCurrency(tx.amount)}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none mb-1">Rewards</p>
                              <p className="text-base md:text-lg font-black text-emerald-600">+{tx.pointsEarned} <span className="text-[10px]">Pts</span></p>
                          </div>
                        </div>
                      </div>

                      {/* Optimization Insight */}
                      {(() => {
                        const { card: bestCard, reward: bestReward } = getBestCardForTransaction(cards, tx.amount, tx.category);
                        const currentRewardValue = tx.pointsEarned * (card?.pointsToRupees || 0.25);
                        const bestRewardValue = bestReward * (bestCard.pointsToRupees || 0.25);
                        const missedReward = bestRewardValue - currentRewardValue;
                        
                        if (bestCard.id !== tx.cardId && missedReward > 10) {
                          return (
                            <div className="mt-2 md:ml-16 bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                               <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                     <Zap className="h-3 w-3 fill-emerald-600" />
                                  </div>
                                  <p className="text-[10px] md:text-xs font-bold text-slate-700">
                                     Better Card: <span className="text-slate-900 font-black">{bestCard.issuer} {bestCard.name}</span>
                                  </p>
                               </div>
                               <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Missed Reward:</span>
                                  <span className="text-xs md:text-sm font-black text-rose-600">+{formatCurrency(missedReward)}</span>
                               </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100 text-slate-400">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold">No transactions found for this selection.</p>
                </div>
              )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <LayoutWrapper>
      <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold">Loading Ledger...</div>}>
        <TransactionsContent />
      </Suspense>
    </LayoutWrapper>
  );
}
