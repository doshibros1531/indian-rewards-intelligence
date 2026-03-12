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
      bestCategory: bestRule?.category || 'General'
    };
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Good Morning, Rutvij Doshi
            </h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">
              You're currently optimizing <span className="text-emerald-600 font-bold">₹14.2L</span> in annual spend.
            </p>
          </div>
          <div className="flex items-center gap-3">
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
        </div>

        {/* Premium Reward Optimizer Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10 group-hover:bg-emerald-500/20 transition-all duration-700" />

            <div className="h-full rounded-[2.5rem] bg-slate-900 border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-50" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">IROS Optimizer Console v2.0</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-tighter">
                    Active Optimization
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                  <div className="space-y-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Reward Earn Rate</p>
                    <div className="flex items-baseline gap-3">
                       <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                         {currentSavingsRate}<span className="text-2xl md:text-3xl text-emerald-500">%</span>
                       </h2>
                      <div className="flex flex-col">
                        <span className="text-emerald-400 text-xs font-black flex items-center gap-1">
                          <ArrowUpRight className="h-3 w-3" /> +1.2%
                        </span>
                        <span className="text-slate-600 text-[9px] font-bold uppercase">vs. Industry Avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Efficiency Index</p>
                      <p className="text-white text-xs font-black tracking-tight">84 / 100</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "84%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-16 pt-10 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Annual Spend</p>
                  <p className="text-xl font-black text-white">₹14.2<span className="text-slate-500 text-xs font-bold ml-1">L</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Rewards Gained</p>
                  <p className="text-xl font-black text-white">{formatCurrency(totalEarnedValue)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-emerald-500/50 text-[9px] font-bold uppercase tracking-widest">Missing Savings</p>
                  <p className="text-xl font-black text-emerald-400">{formatCurrency(potentialRewards)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-rose-500/50 text-[9px] font-bold uppercase tracking-widest">Rewards Lost</p>
                  <p className="text-xl font-black text-rose-500">{formatCurrency(rewardsLost)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex-1 rounded-[2.5rem] bg-white border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="font-black text-slate-900 tracking-tight uppercase text-xs">Priority Actions</h3>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                </div>

                <div className="space-y-8">
                  <div className="group cursor-pointer">
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 flex-shrink-0 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                         <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 mb-1 leading-none">SmartBuy Multiplier</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          You're <span className="text-slate-900 font-bold">₹8,500</span> away from your monthly 5X points cap on Infinia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => router.push('/case-studies')}
                    className="group cursor-pointer"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 flex-shrink-0 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                         <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                       <div>
                        <p className="text-sm font-black text-slate-900 mb-1 leading-none italic uppercase">Bonus Savings</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          See how power users save an extra <span className="text-emerald-600 font-bold underline underline-offset-4">₹32,000+</span> annually.
                        </p>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/optimization')}
                className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 text-xs font-black text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest"
              >
                Launch Optimizer
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
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
              {cards.map((card) => {
                const { totalSpend, earnedValue, bestCategory } = getStatsForCard(card.id);
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

        {/* Category-Wise Strategy Section */}
        <div className="mt-8">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">Optimization Strategies</h2>
               <p className="text-sm text-slate-500 font-medium">Category-wise maximization plans curated for your arsenal.</p>
             </div>
           </div>

           <div className="grid gap-6 md:grid-cols-2">
             {[
               {
                 category: 'Fuel & Logistics',
                 bestCards: 'SBI Elite, HDFC Infinia',
                 strategy: 'Use fuel-specific cards for all petrol/diesel purchases via partner stations for 5X points. Combine with IOCL/HPCL loyalty programs.',
                 savings: '₹3,000 - ₹8,000',
                 accent: 'bg-amber-100 text-amber-700 border-amber-200 border-l-amber-500',
                 icon: <Zap className="h-5 w-5" />
               },
               {
                 category: 'Luxury Travel',
                 bestCards: 'HDFC Infinia, Axis Atlas',
                 strategy: 'Book exclusively via SmartBuy/Magnificent Travel portals for 10X multipliers. Transfer points to Airmiles during 1:1 or 1:2 bonus windows.',
                 savings: '₹45,000 - ₹1,20,000',
                 accent: 'bg-indigo-100 text-indigo-700 border-indigo-200 border-l-indigo-500',
                 icon: <TrendingUp className="h-5 w-5" />
               },
               {
                 category: 'Premium Dining',
                 bestCards: 'ICICI Sapphiro, HDFC Regalia Gold',
                 strategy: 'Use Swiggy/Zomato via Regalia Gold for accelerated 5X points. Sapphiro offers Buy 1 Get 1 on premium movies/dining via BookMyShow.',
                 savings: '₹12,000 - ₹25,000',
                 accent: 'bg-rose-100 text-rose-700 border-rose-200 border-l-rose-500',
                 icon: <Sparkles className="h-5 w-5" />
               },
               {
                 category: 'Online Shopping',
                 bestCards: 'HDFC Infinia, Amex Plat Travel',
                 strategy: 'Leverage HDFC SmartBuy vouchers for Amazon/Flipkart (5X). Amex Platinum Travel milestones give 40,000 MR points on ₹4L annual spend.',
                 accent: 'bg-emerald-100 text-emerald-700 border-emerald-200 border-l-emerald-500',
                 icon: <ArrowUpRight className="h-5 w-5" />
               }
             ].map((strat, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={cn("bg-white border rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-4 group flex flex-col justify-between", strat.accent)}
               >
                 <div>
                   <div className="flex items-start justify-between mb-6">
                     <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                       {strat.icon}
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Est. Savings</p>
                       <p className="text-lg font-black text-slate-900">{strat.savings}</p>
                     </div>
                   </div>

                   <h3 className="text-xl font-black text-slate-900 mb-2">{strat.category}</h3>
                   <div className="flex flex-wrap gap-2 mb-4">
                     {strat.bestCards.split(', ').map((card, j) => (
                       <span key={j} className="px-2 py-0.5 bg-white/50 text-slate-600 rounded text-[10px] font-bold border border-slate-200">
                         {card}
                       </span>
                     ))}
                   </div>

                   <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                     {strat.strategy}
                   </p>
                 </div>

                 <button className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest hover:gap-3 transition-all mt-auto">
                   Activate Strategy <ChevronRight className="h-4 w-4 text-emerald-500" />
                 </button>
               </motion.div>
             ))}
           </div>
        </div>


        {/* Live Recommendation Ticker */}
        <div className="mt-12 rounded-2xl bg-slate-900 p-0.5 shadow-xl border border-white/5">
           <div className="bg-slate-900 rounded-[14px] px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start md:items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                 </div>
                  <p className="text-white text-xs md:text-sm font-medium leading-relaxed">
                    <span className="text-emerald-400 font-bold">Smart Tip:</span> Using <span className="font-extrabold text-white underline decoration-emerald-500/50 underline-offset-4">HDFC Infinia</span> for SmartBuy vouchers gives a massive 16.5% return.
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
