'use client';

import React from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  ArrowUpRight, 
  TrendingUp, 
  ChevronRight, 
  Info, 
  Zap, 
  Calendar,
  Gift,
  ArrowRight,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, cn } from '@/lib/utils';
import { useRewardStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { cards, transactions } = useRewardStore();
  const router = useRouter();
  
  // Calculate real metrics based on cards
  const totalEarnedValue = cards.reduce((acc, card) => acc + (card.currentPoints * card.pointsToRupees), 0);
  
  // Logical calculations for portfolio summary
  const annualSpend = 1420000; 
  const potentialRewards = annualSpend * 0.05; // 5% optimal target
  const rewardsLost = potentialRewards - totalEarnedValue;
  const currentSavingsRate = totalEarnedValue > 0 ? ((totalEarnedValue / annualSpend) * 100).toFixed(2) : "0.00";

  const getStatsForCard = (cardId: string) => {
    const cardTxs = transactions.filter(tx => tx.cardId === cardId);
    const totalSpend = cardTxs.reduce((acc, tx) => acc + tx.amount, 0);
    const totalPointsEarned = cardTxs.reduce((acc, tx) => acc + tx.pointsEarned, 0);
    const card = cards.find(c => c.id === cardId);
    const earnedValue = totalPointsEarned * (card?.pointsToRupees || 0);
    
    // Find best category
    const bestRule = card?.redemptionRules.reduce((prev, current) => 
      (current.rate > prev.rate) ? current : prev
    );

    return { 
      totalSpend, 
      totalPointsEarned, 
      earnedValue, 
      bestCategory: bestRule?.category || 'General',
      roi: card ? ((earnedValue - card.annualFee) / (totalSpend || 1)) * 100 : 0
    };
  };

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
              You're currently optimizing <span className="text-emerald-600 font-bold">₹14.2L</span> in annual spend.
            </p>
          </div>
          <div className="hidden rounded-xl bg-white border border-slate-100 p-3 shadow-sm lg:flex items-center gap-3">
             <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
               <Calendar className="h-5 w-5" />
             </div>
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Snapshot</p>
               <p className="text-sm font-bold text-slate-900">10th March, 2026</p>
             </div>
          </div>
        </div>

        {/* Reward Optimizer Visualizer */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[2rem] md:rounded-3xl bg-slate-900 p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group border border-white/5">
             {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">
                <Zap className="h-4 w-4 fill-emerald-500/20" />
                IROS Reward Optimizer
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end md:gap-12 gap-8">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Your Savings Rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">{currentSavingsRate}%</span>
                    <span className="text-emerald-400 font-bold text-xs md:text-sm bg-emerald-500/10 px-2 py-0.5 rounded-lg flex items-center gap-1 border border-emerald-500/20">
                       <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" /> 
                       +₹4.2k
                    </span>
                  </div>
                </div>

                <div className="flex-1 max-w-full md:max-w-xs space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-wider">Performance Index</span>
                      <span className="text-emerald-400">Optimization Active</span>
                    </div>
                    <div className="h-2.5 md:h-3 w-full rounded-full bg-slate-800/80 overflow-hidden shadow-inner flex border border-white/5">
                      <div className="h-full bg-slate-700/50" style={{ width: '25%' }} title="Market Baseline (1.2%)" />
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" style={{ width: `${Math.min(Number(currentSavingsRate) * 10, 75)}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <span>Baseline (1.2%)</span>
                      <span className="text-emerald-400">Target (5.0%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 md:pt-8 border-t border-white/10">
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Annual Spend</p>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tight">₹14.2<span className="text-slate-500 text-xs md:text-sm font-bold"> L</span></p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Rewards Earned</p>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tight">{formatCurrency(totalEarnedValue)}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Potential Rewards</p>
                  <p className="text-xl md:text-2xl font-black text-emerald-400">{formatCurrency(potentialRewards)}</p>
                </div>
                <div>
                   <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Rewards Lost</p>
                   <p className="text-xl md:text-2xl font-black text-rose-500">{formatCurrency(rewardsLost)}</p>
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
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
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
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                       <Gift className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-none">Redemption Alert</p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed tracking-tight">
                        Your Infinia points are worth <span className="font-bold text-emerald-600">₹1.2L</span> for Flights/Hotels. Best value alert!
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            <button 
              onClick={() => router.push('/optimization')}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Optimization Console
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Portfolio Mini Grid */}
        <div>
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-black tracking-tight text-slate-900">Your Financial Portfolio</h2>
             <button 
               onClick={() => router.push('/inventory')}
               className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
               View All <ArrowRight className="h-4 w-4" />
             </button>
           </div>
                      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cards.slice(0, 3).map((card) => {
                const { totalSpend, totalPointsEarned, earnedValue, bestCategory, roi } = getStatsForCard(card.id);
                const milestone = card.milestoneTargets?.[0];
                const progress = milestone ? Math.min((totalSpend / milestone.spendAmount) * 100, 100) : 0;

                return (
                 <motion.div 
                   key={card.id} 
                   whileHover={{ y: -5 }}
                   onClick={() => router.push(`/transactions?cardId=${card.id}`)}
                   className="premium-card rounded-3xl p-6 group cursor-pointer overflow-hidden relative border border-slate-100 flex flex-col h-full"
                 >
                    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-5 group-hover:opacity-10 transition-opacity", card.color)} />
                    
                    <div className="flex items-start justify-between relative z-10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-10 w-14 rounded-xl shadow-sm flex items-center justify-center text-[10px] font-black italic tracking-tighter text-white", card.color)}>
                          {card.issuer}
                        </div>
                        <div>
                          <h4 className="text-base font-black text-slate-900 leading-none mb-1">{card.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase truncate w-32">•••• {card.last4}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Annual Fee</p>
                         <p className="text-sm font-black text-slate-900">{formatCurrency(card.annualFee)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative z-10 mb-6">
                       <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Spend YTD</p>
                          <p className="text-lg font-black text-slate-900">{formatCurrency(totalSpend)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Earned YTD</p>
                          <p className="text-lg font-black text-emerald-600">{formatCurrency(earnedValue)}</p>
                       </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative z-10 space-y-4">
                        <div className="flex flex-col gap-3">
                           <div className="flex items-center gap-2">
                              <Sparkles className="h-3 w-3 text-amber-500" />
                              <span className="text-[9px] font-black text-slate-700 uppercase tracking-wider">Best: {bestCategory}</span>
                           </div>
                           
                           <div className="flex flex-wrap gap-2">
                              {card.redemptionRules.slice(0, 3).map((rule, idx) => (
                                <div key={idx} className="bg-white/50 border border-slate-100 px-2 py-1 rounded-lg">
                                  <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">{rule.category.split(' ')[0]}</p>
                                  <p className="text-[10px] font-black text-slate-900 leading-none">₹{rule.rate.toFixed(2)}</p>
                                </div>
                              ))}
                           </div>
                        </div>

                       {milestone && (
                         <div className="space-y-1.5">
                            <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                               <span>{milestone.label}</span>
                               <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                               <div className={cn("h-full transition-all duration-1000", card.color)} style={{ width: `${progress}%` }} />
                            </div>
                         </div>
                       )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Live Points</p>
                        <p className="text-sm font-black text-slate-900">{card.currentPoints.toLocaleString()} <span className="text-[10px] text-slate-400 font-bold uppercase">Pts</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Current Value</p>
                        <p className="text-sm font-black text-emerald-600">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                      </div>
                    </div>
                 </motion.div>
                );
              })}

             <button 
               onClick={() => router.push('/inventory')}
               className="rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-emerald-200 transition-all text-slate-400 hover:text-emerald-600 group h-full min-h-[220px]"
             >
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-100 transition-all">
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold tracking-tight uppercase">Link Another Card</p>
             </button>
           </div>
        </div>

        {/* Live Recommendation Ticker */}
        <div className="rounded-2xl bg-slate-900 p-0.5 shadow-xl border border-white/5">
           <div className="bg-slate-900 rounded-[14px] px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start md:items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                 </div>
                 <p className="text-white text-xs md:text-sm font-medium leading-relaxed">
                   <span className="text-emerald-400 font-bold">Deep Strategy:</span> Using <span className="font-extrabold text-white underline decoration-emerald-500/50 underline-offset-4">HDFC Infinia</span> for SmartBuy multipliers yields a massive 16.5% net return.
                 </p>
              </div>
              <button 
                onClick={() => router.push('/optimization')}
                className="text-[10px] md:text-xs font-bold text-white bg-emerald-600 px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition-all w-full md:w-auto uppercase tracking-wider shadow-lg shadow-emerald-500/20"
              >
                 Analyze Arsenal
              </button>
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
