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
import { CARDS_DATA, formatCurrency } from '@/lib/reward-logic';
import { cn, formatCompactNumber } from '@/lib/utils';

export default function WalletPage() {
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  // Calculate global totals
  const totals = CARDS_DATA.reduce((acc, card) => {
    acc.cashback += card.rewardsBreakdown.cashback;
    acc.airmiles += card.rewardsBreakdown.airmiles;
    acc.cash += card.rewardsBreakdown.cash;
    acc.vouchers += card.rewardsBreakdown.vouchers;
    acc.totalValue += (card.currentPoints * card.pointsToRupees);
    return acc;
  }, { cashback: 0, airmiles: 0, cash: 0, vouchers: 0, totalValue: 0 });

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Rewards Wallet</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Real-time valuation of your collective reward arsenal.</p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-100 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm hover:shadow-md transition-all w-full md:w-auto">
             <ArrowUpRight className="h-4 w-4" />
             Transfer Points
          </button>
        </div>

        {/* Global Snapshot - Clear & Informative Summation */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-80 transition-opacity" />
           
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4">
                 <div className="space-y-1">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Total Point Balance</p>
                    <div className="flex items-baseline gap-3">
                       <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                         {totals.airmiles + totals.cashback + totals.cash + totals.vouchers === 0 ? '1,24,500' : (totals.airmiles + totals.cashback + totals.cash + totals.vouchers).toLocaleString()}
                       </span>
                       <span className="text-slate-400 font-bold text-sm md:text-lg">Points</span>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2 leading-none">Max Potential Value</p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl md:text-3xl font-black text-emerald-600">
                         {formatCurrency(124500 * 1.0)}
                       </span>
                       <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md">At ₹1.0 / pt</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 italic">*Valid for Flights, Hotels, and Apple/Tanishq via SmartBuy</p>
                 </div>
              </div>

              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                 <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100/50 group/item hover:bg-emerald-50/50 transition-colors">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 leading-none group-hover/item:text-emerald-600">Pure Cashback</p>
                    <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(124500 * 0.3)}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">@ ₹0.30</p>
                 </div>
                 <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100/50 group/item hover:bg-blue-50/50 transition-colors">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 leading-none group-hover/item:text-blue-600">Travel/Miles</p>
                    <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(124500 * 1.0)}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">@ ₹1.00</p>
                 </div>
                 <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100/50 group/item hover:bg-amber-50/50 transition-colors">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 leading-none group-hover/item:text-amber-600">Vouchers</p>
                    <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(124500 * 0.5)}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">@ ₹0.50</p>
                 </div>
                 <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100/50 group/item hover:bg-purple-50/50 transition-colors">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 leading-none group-hover/item:text-purple-600">Apple/Luxury</p>
                    <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(124500 * 1.0)}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">@ ₹1.00</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Individual Card Breakdown */}
        <div>
           <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
              Portfolio Assets
              <div className="h-1 flex-1 bg-slate-100 rounded-full" />
           </h2>

           <div className="grid gap-6">
              {CARDS_DATA.map((card) => (
                <div key={card.id} className="premium-card rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 group transition-all hover:border-blue-100">
                   <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center md:w-[15%]">
                      <div className={cn("h-10 w-14 md:h-12 md:w-20 rounded-xl flex items-center justify-center text-[8px] md:text-[10px] font-black italic tracking-tighter text-white transition-transform group-hover:scale-105", card.color)}>{card.issuer}</div>
                      <div className="mt-0 md:mt-4 text-right md:text-left">
                         <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight">{card.name}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">•••• {card.last4}</p>
                      </div>
                   </div>

                   <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border-t md:border-t-0 border-slate-50 pt-6 md:pt-0">
                      {card.redemptionRules.slice(0, 4).map((rule, idx) => (
                        <div key={idx} className="space-y-1">
                           <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              <div className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                idx === 0 ? "bg-emerald-500" :
                                idx === 1 ? "bg-blue-500" :
                                idx === 2 ? "bg-indigo-500" : "bg-purple-500"
                              )} />
                              {rule.category}
                           </div>
                           <p className="text-base md:text-xl font-black text-slate-900">
                             {rule.unit ? `1:${rule.rate}` : `₹${rule.rate}`}
                             {rule.unit && <span className="text-[10px] ml-1 text-slate-400 font-bold uppercase">{rule.unit}</span>}
                           </p>
                        </div>
                      ))}
                   </div>

                   <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 leading-none">Net Liquid Value</p>
                         <p className="text-xl md:text-2xl font-black text-emerald-600">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all hidden md:flex mt-2">
                         <ChevronRight className="h-5 w-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Expiry Alert Engine */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
                 <Zap className="h-8 w-8 md:h-10 md:w-10 fill-current" />
              </div>
              <div className="flex-1 space-y-4">
                 <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight">Expiry Alert Engine</h2>
                 <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed tracking-tight">
                    You have <span className="text-white font-bold">12,400 points</span> on Amex Platinum Travel expiring in <span className="text-rose-400 font-bold">14 days</span>.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-2">
                    <button className="h-12 px-8 rounded-xl bg-blue-600 font-bold text-sm tracking-tight hover:bg-blue-700 transition-all">Redeem Now</button>
                    <button className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 font-bold text-sm tracking-tight hover:bg-white/10 transition-all">Snooze Alert</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}

