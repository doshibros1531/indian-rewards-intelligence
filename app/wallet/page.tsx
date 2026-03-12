"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  ArrowUpRight, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Info, 
  Sparkles,
  Wallet,
  Gift,
  Zap,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/reward-logic';
import { cn, formatCompactNumber } from '@/lib/utils';
import { useRewardStore } from '@/lib/store';

export default function WalletPage() {
  const { cards } = useRewardStore();
  const [selectedCardId, setSelectedCardId] = useState<string>('all');
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Card Selector */}
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
            All Portfolio
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

        {/* Global Snapshot - Dynamic based on selection */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm relative overflow-hidden group">
           <div className={cn(
             "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 opacity-20 transition-all duration-500",
             selectedCard ? selectedCard.color : "bg-emerald-500"
           )} />
           
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 text-left">
                 <div className="space-y-1">
                    <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] leading-none">
                      {selectedCardId === 'all' ? 'Total Portfolio Balance' : `${displayData.name} Balance`}
                    </p>
                    <div className="flex items-baseline gap-3">
                       <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                         {displayData.totalPoints.toLocaleString()}
                       </span>
                       <span className="text-slate-500 font-bold text-sm md:text-lg">Points</span>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 leading-none">Global Liquidity</p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl md:text-3xl font-black text-emerald-600">
                         {formatCurrency(displayData.totalValue)}
                       </span>
                       <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-100">
                         AVG ₹{displayData.pointsToRupees.toFixed(2)} / PT
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex-1 lg:pl-12 border-l border-slate-100 hidden md:block">
                 <div className="flex items-center gap-4 text-slate-400">
                    <Sparkles className="h-6 w-6 opacity-20" />
                    <p className="text-sm font-medium leading-relaxed max-w-[400px]">
                       Your average reward rate is currently <strong>{displayData.pointsToRupees.toFixed(2)}x</strong>. 
                       Redeeming through partners could increase your total savings by 24%.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Individual Card Breakdown */}
        <div>
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                 Portfolio Assets 
                 <span className="text-slate-400 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">{cards.length} Cards</span>
              </h2>
              <div className="h-1 flex-1 bg-slate-100 rounded-full mx-6 hidden md:block" />
           </div>

           <div className="grid gap-4">
              {cards.filter(c => selectedCardId === 'all' || c.id === selectedCardId).map((card) => (
                <div key={card.id} className="premium-card bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 transition-all hover:bg-slate-50 group">
                   <div className="flex items-center gap-4 md:w-[220px] shrink-0 pt-2">
                      <div className={cn("h-10 w-16 md:h-12 md:w-20 rounded-xl flex items-center justify-center text-[8px] md:text-[10px] font-black italic tracking-tighter text-white shadow-lg", card.color)}>{card.issuer}</div>
                      <div>
                         <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight">{card.name}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">•••• {card.last4}</p>
                      </div>
                   </div>

                   <div className="flex-1 border-t md:border-t-0 border-slate-50 pt-6 md:pt-2">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
                         {card.redemptionRules.slice(0, 4).map((rule, idx) => (
                           <div key={idx} className="space-y-2 flex flex-col">
                              <div className="flex flex-col gap-1.5 min-h-[44px]">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{rule.category}</p>
                                 <div className="inline-flex w-fit px-1.5 py-0.5 rounded bg-emerald-50 text-[8px] font-black text-emerald-700 leading-none">
                                    {rule.unit ? `1:${rule.rate}` : `${rule.rate}/PT`}
                                 </div>
                              </div>
                              <p className="text-xl font-black text-slate-900 leading-none">
                                {formatCurrency(card.currentPoints * rule.rate)}
                              </p>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t md:border-t-0 border-slate-50 pt-6 md:pt-0 shrink-0 lg:w-[140px]">
                      <div className="text-left md:text-right">
                         <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Portfolio Value</p>
                         <p className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all mt-4 hidden md:flex">
                         <ChevronRight className="h-5 w-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Expiry Alert Engine */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-rose-400">
                 <Zap className="h-8 w-8 md:h-10 md:w-10 fill-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
              </div>
              <div className="flex-1 space-y-4">
                 <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight">Expiry Alert Engine</h2>
                 <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed tracking-tight">
                    You have <span className="text-white font-bold">12,400 points</span> on Amex Platinum Travel expiring in <span className="text-rose-400 font-bold">14 days</span>.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-2">
                    <button className="h-12 px-8 rounded-xl bg-emerald-600 font-bold text-sm tracking-tight hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 text-white leading-none">Redeem Now</button>
                    <button className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 font-bold text-sm tracking-tight hover:bg-white/10 transition-all text-white leading-none">Snooze Alert</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
