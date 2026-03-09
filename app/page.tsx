'use client';

import React from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  ArrowUpRight, 
  TrendingUp, 
  ChevronRight, 
  Info, 
  Zap, 
  Wallet,
  Calendar,
  Gift,
  ArrowRight,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatCompactNumber, cn } from '@/lib/utils';
import { CARDS_DATA } from '@/lib/reward-logic';

export default function DashboardPage() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Good Morning, Minto
            </h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">
              You're currently optimizing <span className="text-blue-600 font-bold">₹14.2L</span> in annual spend.
            </p>
          </div>
          <div className="hidden rounded-2xl bg-white border border-slate-100 p-3 shadow-sm lg:flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Snapshot</p>
              <p className="text-sm font-bold text-slate-900">7th March, 2026</p>
            </div>
          </div>
        </div>

        {/* Reward Optimizer Visualizer */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[2rem] md:rounded-3xl bg-slate-900 p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
             {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">
                <Zap className="h-4 w-4 fill-current" />
                IROS Reward Optimizer
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end md:gap-12 gap-8">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Reward Rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">3.12%</span>
                    <span className="text-emerald-400 font-bold text-xs md:text-sm bg-emerald-500/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
                       <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" /> 
                       +1.9%
                    </span>
                  </div>
                </div>

                <div className="flex-1 max-w-full md:max-w-xs space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-wider">Performance</span>
                      <span className="text-white">Active</span>
                    </div>
                    <div className="h-2 md:h-3 w-full rounded-full bg-slate-800 overflow-hidden shadow-inner flex">
                      <div className="h-full w-[38%] bg-slate-700" title="Market Baseline (1.2%)" />
                      <div className="h-full w-[62%] bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]" title="IROS Optimized (3.12%)" />
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <span>Baseline (1.2%)</span>
                      <span className="text-blue-400">Target (4.5%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 md:pt-8 border-t border-white/5">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Value Back</p>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tight">{formatCurrency(44320)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Portfolio</p>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tight">₹1.4<span className="text-slate-500 text-xs md:text-sm font-bold"> Cr</span></p>
                </div>
                <div className="hidden md:block">
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Active Cards</p>
                   <p className="text-xl md:text-2xl font-black text-white">08</p>
                </div>
                <div className="hidden md:block">
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Efficiency</p>
                   <p className="text-xl md:text-2xl font-black text-emerald-400">92%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] md:rounded-3xl bg-white border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-slate-900 tracking-tight">Next Action</h3>
                 <button className="h-8 w-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                 </button>
               </div>
               <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600">
                       <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-none">SmartBuy Milestone</p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed tracking-tight">
                        Spend <span className="font-bold text-slate-900">₹8,500</span> more via SmartBuy to hit your monthly <span className="font-bold text-emerald-600">5X points cap</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-600">
                       <Gift className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-none">Redemption Alert</p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed tracking-tight">
                        Your Infinia points are worth <span className="font-bold text-blue-600">₹1.2L</span> for Flights/Hotels. Best value alert!
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              Optimization Console
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Portfolio Mini Grid */}
        <div>
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-black tracking-tight text-slate-900">Your Financial Arsenal</h2>
             <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
               View All <ArrowRight className="h-4 w-4" />
             </button>
           </div>
           
           <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
             {CARDS_DATA.slice(0, 3).map((card) => (
               <div key={card.id} className="premium-card rounded-2xl md:rounded-3xl p-5 md:p-6 group cursor-pointer overflow-hidden relative">
                  <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity", card.color)} />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-8 w-12 md:h-10 md:w-14 rounded-lg shadow-sm flex items-center justify-center text-[8px] md:text-[10px] font-black italic tracking-tighter text-white", card.color)}>
                        {card.issuer}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-none">{card.name}</h4>
                        <p className="text-[10px] font-medium text-slate-400 tracking-widest uppercase mt-1">•••• {card.last4}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base md:text-lg font-black text-slate-900 leading-none">{card.currentPoints.toLocaleString()}</p>
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Points</p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 relative z-10">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wide">
                      <span>Waiver Progress</span>
                      <span className="text-slate-900">42%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full w-[42%] bg-slate-900" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-5 border-t border-slate-50 relative z-10">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Liquid Value</p>
                      <p className="text-sm font-black text-emerald-600">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                    </div>
                    <button className="h-8 w-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
               </div>
             ))}

             <button 
               onClick={() => window.location.href = '/inventory'}
               className="rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-blue-200 transition-all text-slate-400 hover:text-blue-600 group"
             >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold tracking-tight">Expand Arsenal</p>
             </button>
           </div>
        </div>

        {/* Live Recommendation Ticker */}
        <div className="rounded-2xl bg-blue-600 p-0.5 shadow-lg shadow-blue-200">
           <div className="bg-slate-900 rounded-[14px] px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start md:items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-blue-400 fill-current" />
                 </div>
                 <p className="text-white text-xs md:text-sm font-medium leading-relaxed">
                   <span className="text-blue-400 font-bold">Smart Hint:</span> Use <span className="font-extrabold text-white underline decoration-blue-500 underline-offset-4">HDFC Infinia</span> for fuel at Indian Oil to earn 6.6% back.
                 </p>
              </div>
              <button className="text-[10px] md:text-xs font-bold text-white bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors w-full md:w-auto uppercase tracking-wider">
                 Analyze More
              </button>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
