'use client';

import React from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Zap,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CaseStudiesPage() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-12 pb-20 overflow-x-hidden">
        {/* Header Section */}
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
               <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Verified Proof of Concept</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]"
          >
            The Optimization <span className="text-emerald-500 italic">Edge.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 font-medium leading-relaxed"
          >
            Real-world data showcasing the drastic financial difference between standard card usage and the IROS Optimized Strategy.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Case Study 1: The Optimizer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="h-full bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 relative flex flex-col justify-between overflow-hidden">
              {/* Profile Card */}
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Optimizer</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tech Professional • Pune</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                    Winner
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                   <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50 relative">
                     <div className="absolute top-4 right-4 text-emerald-500">
                        <Sparkles className="h-5 w-5" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Master Strategy</p>
                     <p className="text-sm font-bold text-slate-900 leading-relaxed pr-6">
                       Orchestrates 3 specialized cards with SmartBuy multipliers. Systematically liquidates points for high-tier travel.
                     </p>
                   </div>

                   <div className="grid gap-4">
                     {[
                       { label: 'Fuel & Utility', value: '₹12,000', delta: '+₹10k', color: 'text-emerald-500' },
                       { label: 'Fine Dining', value: '₹8,000', delta: '+₹6.5k', color: 'text-emerald-500' },
                       { label: 'Global Travel', value: '₹12,000', delta: '+₹9k', color: 'text-emerald-500' }
                     ].map((stat, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                         <div className="flex items-center gap-3">
                           <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                           <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                         </div>
                         <div className="text-right">
                           <p className="text-sm font-black text-slate-900 leading-none">{stat.value}</p>
                           <p className={cn("text-[9px] font-black uppercase mt-1", stat.color)}>{stat.delta} Gain</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-between bg-emerald-500 -m-8 -mt-0 p-8 md:-m-12 md:-mt-0 md:p-12 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Total Annual Gain</p>
                  <p className="text-4xl font-black tracking-tighter">₹32,000</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 2: The Loser */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative h-full"
          >
            <div className="h-full bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl hover:border-rose-200 transition-all duration-500 relative flex flex-col justify-between overflow-hidden">
              {/* Profile Card */}
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Casualty</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Business Owner • Delhi</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">
                    Baseline
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                   <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Critical Errors</p>
                     <p className="text-sm font-bold text-slate-900 leading-relaxed pr-6">
                       Uses a single high-fee card for all categories. Zero awareness of expiry or rewards-per-rupee optimization.
                     </p>
                   </div>

                   <div className="grid gap-4">
                     {[
                       { label: 'Expired Rewards', value: '₹8,000', status: 'Lost Value', color: 'text-rose-500' },
                       { label: 'Optimization Gap', value: '₹7,000', status: 'Missed Alpha', color: 'text-rose-500' },
                       { label: 'Poor Redemption', value: '₹3,000', status: 'Value Leakage', color: 'text-rose-500' }
                     ].map((stat, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                         <div className="flex items-center gap-3">
                           <XCircle className="h-4 w-4 text-rose-400" />
                           <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                         </div>
                         <div className="text-right">
                           <p className="text-sm font-black text-slate-900 leading-none">{stat.value}</p>
                           <p className={cn("text-[9px] font-black uppercase mt-1", stat.color)}>{stat.status}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-between bg-slate-900 -m-8 -mt-0 p-8 md:-m-12 md:-mt-0 md:p-12 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Total Annual Leakage</p>
                  <p className="text-4xl font-black tracking-tighter text-rose-500">-₹18,000</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                  <TrendingDown className="h-6 w-6 text-rose-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Ticker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-[2.5rem] bg-emerald-500 p-1 shadow-2xl shadow-emerald-500/20"
        >
          <div className="bg-white rounded-[2.2rem] px-8 py-10 md:py-12 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <Zap className="h-8 w-8 fill-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Ready to stop the leakage?</h2>
            <p className="text-slate-500 max-w-xl font-medium mb-10">
              Join 50,000+ power users tracking their Indian card portfolio with IROS. Start optimizing your spend categories today.
            </p>
            <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
              Analyze My Arsenal Now
            </button>
          </div>
        </motion.div>
      </div>
    </LayoutWrapper>
  );
}
