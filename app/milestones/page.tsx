"use client";

import React from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Plus, 
  CircleCheck, 
  Clock, 
  ChevronRight, 
  Gift, 
  Sparkles, 
  ArrowRight,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CARDS_DATA, formatCurrency } from '@/lib/reward-logic';
import { cn } from '@/lib/utils';

export default function MilestonesPage() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Milestone Trackers</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Automatic tracking of annual fees, vouchers, and reward tiers.</p>
          </div>
          <button className="h-14 px-8 rounded-2xl bg-white border border-slate-100 font-bold text-slate-900 shadow-sm hover:shadow-md transition-all w-full md:w-auto">Setting Targets</button>
        </div>

        {/* Highlighted Goal */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
              <div className="md:w-1/3 flex flex-col items-center justify-center p-6 md:p-8 bg-white/5 rounded-[2rem] border border-white/5 relative shadow-inner">
                 <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-blue-600/30 flex items-center justify-center mb-6 relative group">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} />
                    <Gift className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:scale-110 transition-transform" />
                 </div>
                 <h2 className="text-lg md:text-xl font-black text-center mb-1 md:mb-2 leading-tight">Grand Milestone</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">32,000 Bonus Pts</p>
              </div>

              <div className="flex-1 space-y-6 md:space-y-8">
                 <div className="flex items-center gap-3">
                    <div className="h-8 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-[8px] font-black italic tracking-tighter">AMEX</div>
                    <span className="text-lg font-black tracking-tight text-white mb-1">Platinum Travel Progress</span>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none">Current Spend</p>
                          <p className="text-3xl md:text-4xl font-black text-white">{formatCurrency(358000)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none">Target Goal</p>
                          <p className="text-lg md:text-xl font-bold text-slate-400">{formatCurrency(400000)}</p>
                       </div>
                    </div>
                    <div className="h-3 md:h-4 w-full rounded-full bg-white/5 border border-white/5 shadow-inner relative overflow-hidden">
                       <div className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all rounded-full" style={{ width: '89%' }} />
                    </div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                       <span className="text-emerald-400">89% Achieved</span>
                       <span className="text-slate-500">₹42,000 Remaining</span>
                    </div>
                 </div>

                 <div className="bg-white/5 p-4 md:p-5 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-start md:items-center gap-3">
                       <Sparkles className="h-5 w-5 text-blue-400 fill-current flex-shrink-0" />
                       <p className="text-xs font-medium text-slate-300 leading-relaxed md:leading-none">Strategy Alert: Spending <span className="text-white font-bold">₹2,800</span> on Hotels this week will unlock 5X points!</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
                 </div>
              </div>
           </div>
        </div>

        {/* Milestone Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
           {CARDS_DATA.map(card => (
             <div key={card.id} className="premium-card rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between group">
                <div>
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className={cn("h-10 w-14 rounded-xl flex items-center justify-center text-[8px] font-black italic tracking-tighter text-white", card.color)}>{card.issuer}</div>
                         <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{card.name}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                   </div>

                   <div className="space-y-8">
                      {/* Fee Waiver */}
                      <div>
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Fee Waiver Tracker</p>
                            <div className="flex items-center gap-2 text-[10px] font-black italic tracking-tighter text-slate-400">
                               {card.isAnnualFeeWaived ? <CircleCheck className="h-3 w-3 text-emerald-500" /> : <Clock className="h-3 w-3" />}
                               {card.isAnnualFeeWaived ? 'Waived' : 'Active'}
                            </div>
                         </div>
                         <div className="h-2 w-full rounded-full bg-slate-50 border border-slate-100 shadow-inner overflow-hidden">
                            <div className={cn("h-full transition-all group-hover:scale-x-105 origin-left", card.color)} style={{ width: `${Math.floor(Math.random() * 40 + 10)}%` }} />
                         </div>
                         <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 leading-none">
                            <span>₹2.4L Spent</span>
                            <span>Target: {formatCurrency(card.spendThresholdForWaiver)}</span>
                         </div>
                      </div>

                      {/* Reward Tier */}
                      <div className="bg-slate-50 rounded-3xl p-5 md:p-6 border border-slate-50 group-hover:bg-white transition-all">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                               <Target className="h-4 w-4" />
                            </div>
                            <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Next Reward Tier</p>
                         </div>
                         <p className="text-[10px] md:text-xs font-medium text-slate-500 leading-relaxed tracking-tight">
                            Unlock <span className="text-slate-900 font-bold">Priority Pass+</span> by spending <span className="text-blue-600 font-black">₹45,000</span> more on Travel before the end of the quarter.
                         </p>
                      </div>
                   </div>
                </div>

                <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all">
                   Manage Alerts
                   <ChevronRight className="h-4 w-4" />
                </button>
             </div>
           ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}
