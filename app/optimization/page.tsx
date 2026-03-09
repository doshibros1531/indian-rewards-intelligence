"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  Zap, 
  TrendingUp, 
  ChevronRight, 
  Gift, 
  Plane, 
  ShoppingBag, 
  Coffee, 
  Fuel,
  Tag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/reward-logic';

const CATEGORY_TABS = ['All', 'Travel', 'Dining', 'Grocery', 'Fuel'];

const RULE_ENGINE = [
  { category: 'Travel', rule: 'HDFC SmartBuy 5X on Flights', maxReward: '16.5%' },
  { category: 'Dining', rule: 'Amex Plat Travel for 2X points', maxReward: '8.2%' },
  { category: 'Grocery', rule: 'Axis Magnus for 12X on Groceries', maxReward: '6.0%' },
  { category: 'Fuel', rule: 'Citi IndianOil for 4% cashback', maxReward: '4.0%' },
  { category: 'Travel', rule: 'Axis Atlas for 5X on Hotels', maxReward: '10.0%' },
  { category: 'Dining', rule: 'HDFC Infinia for 3.3% on Dining', maxReward: '3.3%' },
];

export default function OptimizationPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Reward Optimization</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Real-time spend mapping to maximize your total rewards.</p>
          </div>
          <div className="flex bg-white border border-slate-100 rounded-2xl p-1 shadow-sm w-full md:w-auto">
             <button className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs md:text-sm uppercase tracking-wider">Live Mapper</button>
             <button className="flex-1 md:flex-none h-12 px-6 rounded-xl text-slate-400 font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-slate-50 transition-all">Report</button>
          </div>
        </div>

        {/* Live Recommendation Engine */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
           <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500" />
           
           <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3">
                       <Zap className="h-4 w-4 fill-current" />
                       Recommendation Engine
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">Where are you spending?</h2>
                 </div>
                 <div className="flex-1 max-w-full md:max-w-md relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Merchant, category, or card..."
                      className="w-full h-14 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 pl-16 pr-8 font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-sm md:text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
              </div>

              <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                 {/* Top Recommendation */}
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-3xl backdrop-blur-sm relative group/card border-l-4 border-l-blue-600 shadow-xl">
                    <div className="flex items-start justify-between mb-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Recommended Choice</p>
                          <h3 className="text-xl md:text-2xl font-black text-white">HDFC Infinia</h3>
                       </div>
                       <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
                          <TrendingUp className="h-6 w-6" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-none">Reward Rate</p>
                             <p className="text-2xl md:text-3xl font-black text-emerald-400">16.5%</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-none">SmartBuy Mode</p>
                             <p className="text-2xl md:text-3xl font-black text-white">5X <span className="text-slate-500 text-xs uppercase font-bold tracking-tight">Active</span></p>
                          </div>
                       </div>
                       <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <p className="text-xs text-slate-400 font-medium">Use for <span className="text-white font-bold">Amazon/Flipkart</span> purchases via Gift Vouchers.</p>
                          <ChevronRight className="h-4 w-4 text-slate-600" />
                       </div>
                    </div>
                 </div>

                 {/* Secondary Recommendation */}
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-3xl backdrop-blur-sm relative group/card border-l-4 border-l-emerald-600 shadow-xl">
                    <div className="flex items-start justify-between mb-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Efficiency Play</p>
                          <h3 className="text-xl md:text-2xl font-black text-white">Amex Plat Travel</h3>
                       </div>
                       <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                          <Gift className="h-6 w-6" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-none">Net Value</p>
                             <p className="text-2xl md:text-3xl font-black text-emerald-400">8.2%</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-none">Milestone Weight</p>
                             <p className="text-2xl md:text-3xl font-black text-white">4.5% <span className="text-slate-500 text-xs uppercase font-bold tracking-tight">Reward</span></p>
                          </div>
                       </div>
                       <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <p className="text-xs text-slate-400 font-medium">Use for <span className="text-white font-bold">General Spends</span> to hit the 4L annual milestone.</p>
                          <ChevronRight className="h-4 w-4 text-slate-600" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Category Insights Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Category Spend Insights</h2>
                 <button className="text-xs md:text-sm font-bold text-blue-600 hover:underline">View History</button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar px-2 -mx-2 md:px-0 md:mx-0">
                 {CATEGORY_TABS.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={cn(
                       "flex-shrink-0 h-10 md:h-12 px-5 md:px-6 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all shadow-sm tracking-tight",
                       activeCategory === cat ? "bg-slate-900 text-white shadow-slate-200" : "bg-white text-slate-400 hover:bg-slate-50"
                     )}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              <div className="space-y-4 md:space-y-6 overflow-x-hidden">
                 {RULE_ENGINE.filter(rule => activeCategory === 'All' || rule.category === activeCategory).map((rule, idx) => (
                    <div key={idx} className="premium-card rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                             <Tag className="h-4 w-4 md:h-5 md:w-5" />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{rule.category}</p>
                             <p className="text-sm font-bold text-slate-500 mt-1 leading-relaxed tracking-tight">{rule.rule}</p>
                          </div>
                       </div>
                       <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 leading-none">Max Reward</p>
                             <p className="text-lg md:text-xl font-black text-emerald-600">{rule.maxReward}</p>
                          </div>
                          <span className="text-[10px] md:text-[11px] font-bold text-blue-600 underline decoration-blue-100 mt-1 hidden md:inline">View Optimization Rule</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6 md:space-y-8">
              <div className="bg-blue-50/50 rounded-3xl p-6 md:p-8 border border-blue-50">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                       <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 italic tracking-tight uppercase text-xs">Safe Mode Active</h3>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    All suggestions are verified against current bank T&Cs. Your personal data remains end-to-end encrypted.
                 </p>
              </div>

              <div className="rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
                 <h3 className="font-black text-slate-900">Optimization Stats</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Analysis Ran</span>
                       <span className="text-sm font-black text-slate-900">1,242</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Total Savings</span>
                       <span className="text-sm font-black text-emerald-600">+₹4,200</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Errors Prevented</span>
                       <span className="text-sm font-black text-blue-600">03</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
