"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  ShoppingBag, 
  ChevronRight, 
  Gift, 
  Plane, 
  Coffee, 
  Smartphone, 
  Smartphone as Phone, 
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/reward-logic';

const COLLECTIONS = [
  { name: 'Travel Gems', icon: Plane, points: '4.5L+', count: '124 Deals', color: 'bg-blue-500' },
  { name: 'Dining Exclusive', icon: Coffee, points: '12k+', count: '458 Outlets', color: 'bg-orange-500' },
  { name: 'Luxury Goods', icon: ShoppingBag, points: '85k+', count: '2.1k Items', color: 'bg-emerald-500' },
  { name: 'Tech & Gadgets', icon: Phone, points: '1.2L+', count: '85 Items', color: 'bg-rose-500' },
];

const RECOMMENDED_DEALS = [
  { title: 'Indigo Flight Voucher', merchant: '6E Rewards', value: '₹5,000', cost: '15,000 Pts', rewardRate: '3.3%', tag: 'High Value' },
  { title: 'Apple Store Credit', merchant: 'Imagine', value: '₹10,000', cost: '25,000 Pts', rewardRate: '4.0%', tag: 'Hot' },
  { title: 'Taj Hotels Voucher', merchant: 'Taj Mahal', value: '₹20,000', cost: '12,000 Pts', rewardRate: '16.6%', tag: 'Elite' },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Unified Marketplace</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">One redemption engine for all your bank points and miles.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="flex-1 md:flex-none relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Redeem anything..."
                  className="w-full h-12 rounded-2xl border border-slate-100 bg-white pl-12 pr-4 font-bold text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <button className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                <Zap className="h-4 w-4" />
             </button>
          </div>
        </div>

        {/* Global Collection Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
           {COLLECTIONS.map(col => (
             <div key={col.name} className="premium-card rounded-2xl md:rounded-3xl p-5 md:p-6 group cursor-pointer overflow-hidden relative">
                <div className={cn("absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity", col.color)} />
                <div className={cn("h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-6 md:mb-8 group-hover:scale-110 transition-transform", col.color)}>
                   <col.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="space-y-1">
                   <h3 className="font-black text-slate-900 text-sm md:text-base leading-tight">{col.name}</h3>
                   <div className="flex items-center gap-2">
                       <span className="text-[10px] md:text-xs font-bold text-slate-400">{col.count}</span>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{col.points}</p>
                   <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600" />
                </div>
             </div>
           ))}
        </div>

        {/* Top Redemption Plays */}
        <div>
           <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8 flex items-center gap-3 px-2">
              Best Value Redemptions
              <div className="h-1 flex-1 bg-slate-100 rounded-full" />
           </h2>

           <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
              {RECOMMENDED_DEALS.map((deal, idx) => (
                <div key={idx} className="premium-card rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between group relative overflow-hidden">
                   <div className="absolute top-8 right-8 text-yellow-400 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Star className="h-12 w-12 fill-current" />
                   </div>
                   
                   <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                         <div>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">{deal.tag}</span>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-4 leading-tight">{deal.title}</h3>
                            <p className="text-xs md:text-sm font-bold text-slate-400 mt-2 uppercase tracking-tight">{deal.merchant}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-10 pt-6 border-t border-slate-50">
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Net Value</p>
                            <p className="text-xl md:text-2xl font-black text-slate-900">{deal.value}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 leading-none">Point Value</p>
                            <p className="text-xl md:text-2xl font-black text-blue-600">{deal.rewardRate}</p>
                         </div>
                      </div>
                   </div>

                   <button className="relative z-10 w-full rounded-2xl bg-white border border-slate-100 py-4 font-bold text-sm text-slate-900 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                      Redeem for {deal.cost}
                      <ArrowUpRight className="h-4 w-4 text-slate-400" />
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Global Search Meta Banner */}
        <div className="rounded-[2rem] md:rounded-[3rem] bg-indigo-600 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group mt-6">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-xl space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">Your points are global currency.</h2>
                 <p className="text-indigo-100 text-sm md:text-lg font-medium leading-relaxed tracking-tight">
                    IROS automatically searches 1,200+ partner portals to find the absolute best redemption value for your collective point balance.
                 </p>
              </div>
              <div className="flex flex-col gap-4">
                 <button className="h-14 px-8 rounded-2xl bg-white text-indigo-600 font-black tracking-tight hover:shadow-xl hover:scale-105 transition-all">Enable Global Search</button>
                 <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-[0.3em] text-center italic">IROS One-Click Redemption</p>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
