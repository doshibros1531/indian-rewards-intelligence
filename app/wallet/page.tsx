"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  ArrowUpRight, 
  TrendingUp, 
  ChevronRight, 
  Wallet,
  Gift,
  Zap,
  Tag,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/reward-logic';
import { cn, formatCompactNumber } from '@/lib/utils';
import { useRewardStore } from '@/lib/store';

export default function WalletPage() {
  const { cards } = useRewardStore();
  const [selectedCardId, setSelectedCardId] = useState<string>('all');

  // Derived data based on selection
  const selectedCard = cards.find(c => c.id === selectedCardId);
  
  const displayData = selectedCard ? {
    totalPoints: selectedCard.currentPoints,
    totalValue: selectedCard.currentPoints * selectedCard.pointsToRupees,
    breakdown: selectedCard.rewardsBreakdown,
    name: selectedCard.name,
    issuer: selectedCard.issuer,
    color: selectedCard.color,
    pointsToRupees: selectedCard.pointsToRupees
  } : {
    totalPoints: cards.reduce((acc, c) => acc + c.currentPoints, 0),
    totalValue: cards.reduce((acc, c) => acc + (c.currentPoints * c.pointsToRupees), 0),
    breakdown: cards.reduce((acc, c) => {
      acc.cashback += c.rewardsBreakdown?.cashback || 0;
      acc.airmiles += c.rewardsBreakdown?.airmiles || 0;
      acc.cash += c.rewardsBreakdown?.cash || 0;
      acc.vouchers += c.rewardsBreakdown?.vouchers || 0;
      return acc;
    }, { cashback: 0, airmiles: 0, cash: 0, vouchers: 0 }),
    name: 'All Portfolio',
    issuer: 'ALL',
    color: 'bg-emerald-600',
    pointsToRupees: 1.0 // Ideal/Max
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 md:px-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Rewards Wallet</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Real-time valuation of your collective reward arsenal.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Portfolio Snapshot</p>
              <div className="flex items-center gap-3">
                 <div className="text-right border-r border-slate-200 pr-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Points</p>
                    <p className="text-base font-black text-slate-900 leading-none">{cards.reduce((acc, c) => acc + c.currentPoints, 0).toLocaleString()}</p>
                 </div>
                 <div className="text-left">
                    <p className="text-[9px] font-bold text-emerald-600 uppercase">Total Value</p>
                    <p className="text-base font-black text-emerald-600 leading-none">
                       {formatCurrency(cards.reduce((acc, c) => acc + (c.currentPoints * c.pointsToRupees), 0))}
                    </p>
                 </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all w-full md:w-auto">
               <ArrowUpRight className="h-4 w-4" />
               Transfer Points
            </button>
          </div>
        </div>

        <div className="w-full">
           <div className="flex items-center gap-3 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide py-2 snap-x snap-mandatory">
              <button 
                onClick={() => setSelectedCardId('all')}
                className={cn(
                  "flex-shrink-0 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 snap-start",
                  selectedCardId === 'all' 
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-500/10" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                All Portfolio
              </button>
              {cards.map((card) => (
                <button 
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={cn(
                    "flex-shrink-0 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-3 snap-start",
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
        </div>

        {/* Global Snapshot */}
        <div className="mx-4 md:mx-0 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm relative overflow-hidden group">
           <div className={cn(
             "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 opacity-20 transition-all duration-500",
             selectedCard ? selectedCard.color : "bg-emerald-500"
           )} />
           
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 text-left">
                 <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                       <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] leading-none">
                         {selectedCardId === 'all' ? 'Total Portfolio Balance' : `${displayData.name} Balance`}
                       </p>
                       {selectedCard && (
                         <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                           <Sparkles className="h-2 w-2" /> Superpower: {selectedCard.issuer === 'HDFC' ? 'Travel Specialist' : selectedCard.issuer === 'AMEX' ? 'Milestone King' : 'All-Rounder'}
                         </div>
                       )}
                    </div>
                    <div className="flex items-baseline gap-3">
                       <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                         {displayData.totalPoints.toLocaleString()}
                       </span>
                       <span className="text-slate-500 font-bold text-sm md:text-lg uppercase">Points</span>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none">Market Liquidity</p>
                    <div className="flex flex-wrap items-center gap-3">
                       <span className="text-2xl md:text-4xl font-black text-emerald-600 tracking-tight">
                         {formatCurrency(displayData.totalValue)}
                       </span>
                       <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-100">
                         AVG ₹{displayData.pointsToRupees.toFixed(2)} / PT
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex-1 lg:pl-12 md:border-l border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Redemption Sweet Spots</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    {selectedCard ? (
                      selectedCard.redemptionRules.slice(0, 3).map((rule, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", idx === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-200/50 text-slate-400")}>
                                 {idx === 0 ? <TrendingUp className="h-4 w-4" /> : idx === 1 ? <Gift className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                              </div>
                              <span className="text-[11px] md:text-xs font-bold text-slate-600">{rule.category}</span>
                           </div>
                           <div className="text-right">
                              <p className="text-xs md:text-sm font-black text-slate-900">{formatCurrency(selectedCard.currentPoints * rule.rate)}</p>
                              {idx === 0 && <span className="text-[8px] font-black text-emerald-600 uppercase">Best Value 🔥</span>}
                           </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full bg-emerald-50/50 rounded-2xl p-4 md:p-6 border border-emerald-100 flex items-center gap-4">
                         <Sparkles className="h-8 w-8 text-emerald-600 flex-shrink-0 opacity-40 shadow-sm" />
                         <div>
                            <p className="text-xs font-black text-slate-900 uppercase">Portfolio Management Active</p>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-bold mt-1 max-w-[300px]">
                               Select a specific card to unlock granular redemption comparisons and maximize point value.
                            </p>
                         </div>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Portfolio Assets List */}
        <div className="px-4 md:px-0">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                 Portfolio Assets 
                 <span className="text-slate-400 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">{cards.length} Cards</span>
              </h2>
              <div className="h-1 flex-1 bg-slate-100 rounded-full mx-6 hidden md:block" />
           </div>

           <div className="grid gap-4 md:gap-6">
              {cards.filter(c => selectedCardId === 'all' || c.id === selectedCardId).map((card) => (
                <div key={card.id} className="premium-card bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-12 hover:bg-slate-50 transition-all group shadow-sm">
                   <div className="flex items-center gap-4 md:w-[240px] shrink-0">
                      <div className={cn("h-10 w-16 md:h-14 md:w-24 rounded-xl flex items-center justify-center text-[8px] md:text-xs font-black italic tracking-tighter text-white shadow-xl shadow-slate-900/5 transition-transform group-hover:scale-105", card.color)}>{card.issuer}</div>
                      <div className="min-w-0">
                         <h3 className="text-base md:text-lg font-black text-slate-900 truncate">{card.name}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Acct •••• {card.last4}</p>
                      </div>
                   </div>

                   <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-10">
                      {card.redemptionRules.slice(0, 4).map((rule, idx) => (
                        <div key={idx} className="space-y-1.5 min-w-0">
                           <div className="flex flex-col gap-1 min-h-[40px]">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{rule.category}</p>
                              <div className="inline-flex w-fit px-1.5 py-0.5 rounded bg-emerald-50 text-[8px] font-black text-emerald-700">
                                 {rule.unit ? `1:${rule.rate}` : `${rule.rate}/PT`}
                              </div>
                           </div>
                           <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(card.currentPoints * rule.rate)}</p>
                        </div>
                      ))}
                   </div>

                   <div className="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 border-slate-100 pt-6 lg:pt-0 lg:border-l lg:pl-10 shrink-0 lg:w-[160px]">
                      <div className="text-left lg:text-right">
                         <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Total Liquid Value</p>
                         <p className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all mt-3 hidden md:flex">
                         <ChevronRight className="h-5 w-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Intelligence Alert Engine - Premium Design */}
        <div className="mx-4 md:mx-0 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="h-14 w-14 md:h-20 md:w-20 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-rose-400">
                 <Zap className="h-6 w-6 md:h-10 md:w-10 fill-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse" />
              </div>
              <div className="flex-1 space-y-4">
                 <div className="space-y-1">
                    <p className="text-emerald-400 font-extrabold text-[10px] uppercase tracking-[0.3em]">System Intelligence</p>
                    <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight">Imminent Expiry Warning</h2>
                 </div>
                 <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed tracking-tight max-w-[600px]">
                    You have <span className="text-white font-bold">12,400 points</span> on Amex Platinum Travel expiring in <span className="text-rose-400 font-bold underline underline-offset-4 decoration-rose-500/30">14 days</span>. That's ₹6,200 in value at risk.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <button className="h-12 px-8 rounded-xl bg-emerald-600 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/10 text-white flex items-center gap-2">
                       <ArrowUpRight className="h-4 w-4" /> Redeem Now
                    </button>
                    <button className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 font-bold text-sm tracking-tight hover:bg-white/10 transition-all text-white">Snooze</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
