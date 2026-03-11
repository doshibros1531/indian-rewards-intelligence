"use client";

import React from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  CircleCheck, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Target,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/reward-logic';
import { cn } from '@/lib/utils';
import { useRewardStore } from '@/lib/store';

export default function MilestonesPage() {
  const { cards, transactions } = useRewardStore();
  
  // Calculate spend per card from actual transactions
  const getSpendForCard = (cardId: string) => {
    return transactions
      .filter(tx => tx.cardId === cardId)
      .reduce((acc, tx) => acc + tx.amount, 0);
  };

  // Identify the "Grand Milestone" (usually the largest target found)
  const allMilestones = cards.flatMap(card => 
    (card.milestoneTargets || []).map(m => ({ 
      ...m, 
      cardIssuer: card.issuer, 
      cardName: card.name, 
      cardColor: card.color, 
      cardId: card.id 
    }))
  );
  
  const grandMilestone = allMilestones.length > 0 
    ? allMilestones.reduce((prev, current) => (prev.spendAmount > current.spendAmount) ? prev : current)
    : { spendAmount: 1000000, label: 'Annual Fee Waiver', rewardValue: 12500, cardIssuer: 'HDFC', cardName: 'Infinia', cardColor: 'bg-slate-900', cardId: '1' };

  const grandSpend = getSpendForCard(grandMilestone.cardId);
  const grandProgress = Math.min(Math.round((grandSpend / grandMilestone.spendAmount) * 100), 100);

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Milestone Trackers</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Automatic tracking of annual fees, vouchers, and reward tiers.</p>
          </div>
        </div>

        {/* Grand Milestone Hero Card */}
        {/* <div className="rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-900 to-slate-900 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
              <div className="md:w-1/4 flex flex-col items-center justify-center p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 relative shadow-inner backdrop-blur-sm">
                 <div className="h-20 w-20 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" style={{ clipPath: `inset(${100 - grandProgress}% 0 0 0)` }} />
                    <Trophy className="h-10 w-10 text-emerald-400" />
                 </div>
                 <h2 className="text-lg font-black text-center mb-1 leading-tight">{grandMilestone.label}</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{grandMilestone.rewardValue.toLocaleString()} Bonus Pts</p>
              </div>

              <div className="flex-1 space-y-6 md:space-y-8">
                 <div className="flex items-center gap-3">
                    <div className={cn("h-8 w-12 rounded-lg text-white flex items-center justify-center text-[8px] font-black italic tracking-tighter shadow-lg", grandMilestone.cardColor)}>
                      {grandMilestone.cardIssuer}
                    </div>
                    <span className="text-xl font-black tracking-tight text-white mb-1 uppercase leading-none">{grandMilestone.cardName}</span>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 leading-none">Total Progress</p>
                          <p className="text-3xl md:text-5xl font-black text-white">{formatCurrency(grandSpend)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 leading-none">Target Goal</p>
                          <p className="text-lg md:text-xl font-bold text-slate-400">{formatCurrency(grandMilestone.spendAmount)}</p>
                       </div>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-800 border border-white/5 shadow-inner relative overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${grandProgress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-full" 
                        />
                    </div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                       <span className="text-emerald-400 font-black">{grandProgress}% Achieved</span>
                       <span className="text-slate-500">{formatCurrency(Math.max(grandMilestone.spendAmount - grandSpend, 0))} Remaining</span>
                    </div>
                 </div>


              </div>
           </div>
        </div> */}

        {/* All Active Trackers */}
        <div>
           <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8 flex items-center gap-3 px-2">
              All Active Trackers
              <div className="h-1 flex-1 bg-slate-100 rounded-full" />
           </h2>

           <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {cards.map(card => {
                const cardSpend = getSpendForCard(card.id);
                const waiverProgress = Math.min(Math.round((cardSpend / card.spendThresholdForWaiver) * 100), 100);
                
                return (
                  <div key={card.id} className="premium-card rounded-3xl p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative">
                    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 rounded-full", card.color)} />
                    
                    <div>
                       <div className="flex items-center justify-between mb-8 relative z-10">
                          <div className="flex items-center gap-4">
                             <div className={cn("h-10 w-14 rounded-xl flex items-center justify-center text-[8px] font-black italic tracking-tighter text-white", card.color)}>{card.issuer}</div>
                             <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{card.name}</h3>
                          </div>
                       </div>

                       <div className="space-y-8 relative z-10">
                          {/* Fee Waiver Tracker */}
                          <div>
                             <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Annual Fee Waiver</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900">
                                   {card.isAnnualFeeWaived || waiverProgress >= 100 ? <CircleCheck className="h-4 w-4 text-emerald-500" /> : <Clock className="h-4 w-4 text-slate-400" />}
                                   <span>{formatCurrency(card.spendThresholdForWaiver)} Goal</span>
                                </div>
                             </div>
                             <div className="h-2 w-full rounded-full bg-slate-50 border border-slate-100 shadow-inner overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${waiverProgress}%` }}
                                  className={cn("h-full transition-all", card.color)} 
                                />
                             </div>
                             <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 leading-none">
                                <span>{formatCurrency(cardSpend)} Spent</span>
                                <span className={cn(waiverProgress >= 100 ? "text-emerald-600" : "")}>{waiverProgress}% Achieved</span>
                             </div>
                          </div>

                          {/* Next Milestone */}
                          {card.milestoneTargets && card.milestoneTargets.length > 0 && (
                            <div className="bg-slate-50/50 rounded-2xl p-4 md:p-5 border border-slate-100">
                               <div className="flex items-center gap-3 mb-3">
                                  <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                     <Target className="h-4 w-4" />
                                  </div>
                                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Upcoming Reward</p>
                               </div>
                               <p className="text-xs font-medium text-slate-500 leading-relaxed tracking-tight">
                                  Spend <span className="text-slate-900 font-bold">{formatCurrency(Math.max(card.milestoneTargets[0].spendAmount - cardSpend, 0))}</span> more to unlock <span className="text-blue-600 font-black">{card.milestoneTargets[0].rewardValue.toLocaleString()} points</span>.
                               </p>
                            </div>
                          )}
                       </div>
                    </div>

                    <button 
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all relative z-10"
                    >
                       Manage Alert Rules
                       <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
