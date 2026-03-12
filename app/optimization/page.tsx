"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  Zap, 
  TrendingUp, 
  ChevronRight, 
  Gift, 
  Tag,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <div className="flex bg-white border border-slate-100 rounded-xl p-1 shadow-sm w-full md:w-auto">
             <button className="flex-1 md:flex-none h-10 px-6 rounded-lg bg-slate-900 text-white font-bold text-xs uppercase tracking-widest transition-all">Live Mapper</button>
             <button className="flex-1 md:flex-none h-10 px-6 rounded-lg text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Reports</button>
          </div>
        </div>

        {/* Hero Recommendation */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />
           <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
           
           <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3">
                       <Zap className="h-4 w-4 fill-emerald-400/20" />
                       Intelligence Engine
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">Where are you spending?</h2>
                 </div>
                 <div className="flex-1 max-w-full md:max-w-md relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Merchant, category, or card..."
                      className="w-full h-14 md:h-16 rounded-2xl bg-white/5 border border-white/10 pl-16 pr-8 font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-sm backdrop-blur-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
              </div>

              <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm relative border-l-4 border-l-emerald-500 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between mb-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Global Best Choice</p>
                          <h3 className="text-xl md:text-2xl font-black text-white">HDFC Infinia</h3>
                       </div>
                       <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <TrendingUp className="h-6 w-6 text-slate-900" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Net Reward</p>
                             <p className="text-3xl font-black text-emerald-400">16.5%</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Strategy</p>
                             <p className="text-3xl font-black text-white">5X <span className="text-slate-500 text-xs uppercase font-bold tracking-tight">Voucher</span></p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm relative border-l-4 border-l-amber-500 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between mb-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Milestone Target</p>
                          <h3 className="text-xl md:text-2xl font-black text-white">Amex Plat Travel</h3>
                       </div>
                       <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                          <Gift className="h-6 w-6 text-slate-900" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Milestone Rewards</p>
                             <p className="text-3xl font-black text-amber-400">8.2%</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Current Weight</p>
                             <p className="text-3xl font-black text-white">4.5% <span className="text-slate-500 text-xs uppercase font-bold tracking-tight">Real</span></p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Lists */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                 {CATEGORY_TABS.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={cn(
                       "flex-shrink-0 h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                       activeCategory === cat ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                     )}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              <div className="space-y-3">
                 {RULE_ENGINE.filter(rule => activeCategory === 'All' || rule.category === activeCategory).map((rule, idx) => (
                    <div key={idx} className="premium-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors border border-slate-50">
                             <Tag className="h-4 w-4" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{rule.category}</p>
                             <p className="text-sm font-bold text-slate-500 mt-1">{rule.rule}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Extra Rewards</p>
                          <p className="text-xl font-black text-emerald-600">{rule.maxReward}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-emerald-500 text-slate-900 flex items-center justify-center">
                       <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Safe Mode Active</h3>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    All suggestions are verified against current bank T&Cs. Your data remains encrypted.
                 </p>
              </div>

              <div className="rounded-3xl border border-slate-100 p-6 space-y-6">
                 <h3 className="font-black text-slate-900 uppercase text-sm tracking-widest">System Efficiency</h3>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Analysis Ran</span>
                       <span className="text-sm font-black text-slate-900">1,242</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Savings Found</span>
                       <span className="text-sm font-black text-emerald-600">+₹4,200</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
