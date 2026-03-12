"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  Zap, 
  TrendingUp, 
  Gift, 
  Tag,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_TABS = ['All', 'Travel', 'Dining', 'Grocery', 'Fuel'];

const RULE_ENGINE = [
  { 
    category: 'Travel', 
    rule: 'HDFC SmartBuy 5X on Flights', 
    maxReward: '16.5%',
    math: {
      base: '3.3%',
      multiplier: '5x (SmartBuy)',
      value: '₹1.00 / Point',
      formula: '3.3% × 5 × ₹1.0'
    }
  },
  { 
    category: 'Dining', 
    rule: 'Amex Plat Travel for 2X points', 
    maxReward: '8.2%',
    math: {
      base: '2.0%',
      multiplier: '2x (Dining)',
      value: '₹0.50 / Point',
      formula: '2.0% × 2 × ₹0.5'
    }
  },
  { 
    category: 'Grocery', 
    rule: 'Axis Magnus for 12X on Groceries', 
    maxReward: '6.0%',
    math: {
      base: '1.2%',
      multiplier: '5x (Milestone)',
      value: '₹1.00 / Point',
      formula: '1.2% × 5 × ₹1.0'
    }
  },
  { 
    category: 'Fuel', 
    rule: 'Citi IndianOil for 4% cashback', 
    maxReward: '4.0%',
    math: {
      base: '1.0%',
      multiplier: '4x (Partner)',
      value: '₹1.00 / Point',
      formula: '1.0% × 4 × ₹1.0'
    }
  },
  { 
    category: 'Travel', 
    rule: 'Axis Atlas for 5X on Hotels', 
    maxReward: '10.0%',
    math: {
      base: '2.0%',
      multiplier: '5x (Hotel)',
      value: '₹1.00 / Point',
      formula: '2.0% × 5 × ₹1.0'
    }
  },
  { 
    category: 'Dining', 
    rule: 'HDFC Infinia for 3.3% on Dining', 
    maxReward: '3.3%',
    math: {
      base: '3.3%',
      multiplier: '1x (Base)',
      value: '₹1.00 / Point',
      formula: '3.3% × 1 × ₹1.0'
    }
  },
];

export default function OptimizationPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="px-4 md:px-0">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Reward Optimization</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Real-time spend mapping to maximize your total rewards.</p>
          </div>
          <div className="flex bg-white border border-slate-100 rounded-xl p-1 shadow-sm mx-4 md:mx-0">
             <button className="flex-1 md:flex-none h-10 px-6 rounded-lg bg-slate-900 text-white font-bold text-xs uppercase tracking-widest transition-all">Live Mapper</button>
             <button className="flex-1 md:flex-none h-10 px-6 rounded-lg text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Reports</button>
          </div>
        </div>

        {/* Hero Recommendation */}
        <div className="md:mx-0 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-5 md:p-10 text-white shadow-1xl relative overflow-hidden group border border-white/5">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />
           
           <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6">
                 <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-1">
                       <Zap className="h-3 w-3 md:h-4 md:w-4 fill-emerald-400/20" />
                       Intelligence Engine
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">Where are you spending?</h2>
                 </div>
                 <div className="w-full md:max-w-md relative">
                    <Search className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Merchant, category, or card..."
                      className="w-full h-12 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 pl-12 md:pl-16 pr-6 font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-sm backdrop-blur-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
              </div>

              <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                 <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl backdrop-blur-sm relative border-l-4 border-l-emerald-500 shadow-xl overflow-hidden">
                    <div className="flex items-start justify-between mb-5 md:mb-8">
                       <div className="space-y-1">
                          <p className="text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Global Best Choice</p>
                          <h3 className="text-lg md:text-2xl font-black text-white leading-tight">HDFC Infinia</h3>
                       </div>
                       <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                          <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-slate-900" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-6 pt-1 md:pt-0">
                       <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Net Rate</p>
                          <p className="text-xl md:text-3xl font-black text-emerald-400 leading-none">16.5%</p>
                       </div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Strategy</p>
                          <p className="text-xl md:text-3xl font-black text-white leading-none">5X <span className="text-slate-500 text-[9px] md:text-xs uppercase font-bold tracking-tight align-middle ml-1">Voc</span></p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl backdrop-blur-sm relative border-l-4 border-l-amber-500 shadow-xl overflow-hidden">
                    <div className="flex items-start justify-between mb-5 md:mb-8">
                       <div className="space-y-1">
                          <p className="text-[9px] md:text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none">Milestone Target</p>
                          <h3 className="text-lg md:text-2xl font-black text-white leading-tight">Amex Plat Travel</h3>
                       </div>
                       <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                          <Gift className="h-5 w-5 md:h-6 md:w-6 text-slate-900" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-6 pt-1 md:pt-0">
                       <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Milestone Return</p>
                          <p className="text-xl md:text-3xl font-black text-amber-400 leading-none">8.2%</p>
                       </div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Current Weight</p>
                          <p className="text-xl md:text-3xl font-black text-white leading-none">4.5% <span className="text-slate-500 text-[9px] md:text-xs uppercase font-bold tracking-tight align-middle ml-1">Real</span></p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Lists */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3 md:mx-0">
           <div className="lg:col-span-2 space-y-6 min-w-0">
              <div className="relative -mx-4 md:mx-0">
                 <div className="flex items-center gap-2 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide snap-x snap-mandatory">
                    {CATEGORY_TABS.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "flex-shrink-0 h-10 px-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all snap-start",
                          activeCategory === cat ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-3">
                 {RULE_ENGINE.filter(rule => activeCategory === 'All' || rule.category === activeCategory).map((rule, idx) => {
                    const isExpanded = expandedIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "premium-card rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300",
                          isExpanded ? "border-emerald-200 ring-4 ring-emerald-500/5 shadow-xl shadow-emerald-500/10" : "hover:border-slate-200"
                        )}
                      >
                         <div 
                           onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                           className="p-4 md:p-6 flex items-center justify-between gap-3 cursor-pointer"
                         >
                            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                               <div className={cn(
                                 "h-9 w-9 md:h-10 md:w-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors",
                                 isExpanded ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-400"
                               )}>
                                  <Tag className="h-4 w-4" />
                               </div>
                               <div className="min-w-0 flex-1">
                                  <p className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest">{rule.category}</p>
                                  <p className="text-xs md:text-sm font-bold text-slate-500 mt-1 line-clamp-2 md:truncate">{rule.rule}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                               <div className="text-right">
                                  <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 leading-none">Net Rate</p>
                                  <p className="text-lg md:text-xl font-black text-emerald-600 leading-none">{rule.maxReward}</p>
                               </div>
                               <div className="text-slate-300">
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                               </div>
                            </div>
                         </div>

                         <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              >
                                 <div className="px-5 pb-6 md:px-6 md:pb-8 pt-2 border-t border-slate-50 bg-slate-50/50">
                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                                           <div className="bg-white p-2 md:p-3 rounded-xl border border-slate-100 flex flex-col justify-center text-center">
                                              <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Base</p>
                                              <p className="text-[10px] sm:text-xs font-black text-slate-900">{rule.math.base}</p>
                                           </div>
                                           <div className="bg-white p-2 md:p-3 rounded-xl border border-slate-100 flex flex-col justify-center text-center">
                                              <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Multiplier</p>
                                              <p className="text-[10px] sm:text-xs font-black text-emerald-600 truncate">{rule.math.multiplier.split(' ')[0]} <span className="hidden sm:inline">{rule.math.multiplier.substring(rule.math.multiplier.indexOf(' '))}</span></p>
                                           </div>
                                           <div className="bg-white p-2 md:p-3 rounded-xl border border-slate-100 flex flex-col justify-center text-center">
                                              <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Value</p>
                                              <p className="text-[10px] sm:text-xs font-black text-slate-900">{rule.math.value.split(' ')[0]}</p>
                                           </div>
                                        </div>
                                        <div className="bg-slate-900 rounded-2xl p-3 md:p-4 flex flex-col justify-center items-center text-center">
                                           <p className="text-[7px] md:text-[8px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-1.5">The Reward Formula</p>
                                           <p className="text-base md:text-lg font-black text-white font-mono break-words">{rule.math.formula}</p>
                                           <div className="mt-1.5 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                              = {rule.maxReward} Total Value
                                           </div>
                                        </div>
                                     </div>
                                    <div className="mt-4 flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest justify-center">
                                       <Sparkles className="h-3 w-3 text-emerald-500" />
                                       Optimized for Travel Partner Transfers
                                    </div>
                                 </div>
                              </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                    );
                 })}
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

              {/* <div className="rounded-3xl border border-slate-100 p-6 space-y-6">
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
              </div> */}
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
