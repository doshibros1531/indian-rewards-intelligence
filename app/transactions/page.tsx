"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  TrendingDown, 
  ChevronRight, 
  ShieldCheck, 
  Plane, 
  ShoppingBag, 
  Coffee, 
  Fuel,
  CreditCard,
  Download,
  Calendar,
  Zap,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRANSACTIONS } from '@/lib/mock-transactions';
import { formatCurrency } from '@/lib/reward-logic';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Transactions</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Track every swipe and its impact on your total rewards.</p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-100 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm hover:shadow-md transition-all w-full md:w-auto">
             <Download className="h-4 w-4" />
             Export Data
          </button>
        </div>

        {/* Transaction Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           <div className="bg-white border border-slate-100 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm">
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 md:mb-2">Total Managed</p>
              <p className="text-lg md:text-2xl font-black text-slate-900 leading-none">₹84.2k</p>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-500 mt-2">Last 30 Days</p>
           </div>
           <div className="bg-white border border-slate-100 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm">
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 md:mb-2 text-blue-600">Points Earned</p>
              <p className="text-lg md:text-2xl font-black text-blue-600 leading-none">12,450</p>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-500 mt-2">IROS Verified</p>
           </div>
           <div className="hidden md:block bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-emerald-600">Avg. Reward Rate</p>
              <p className="text-2xl font-black text-emerald-600">3.8%</p>
              <p className="text-[10px] font-bold text-slate-500 mt-2">Top decile</p>
           </div>
           <div className="hidden md:block bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Efficiency</p>
              <p className="text-2xl font-black text-slate-900">94.2%</p>
              <p className="text-[10px] font-bold text-slate-500 mt-2">Optimization ratio</p>
           </div>
        </div>

        {/* History Table/List */}
        <div className="space-y-4">
           {/* Filters & Search - Floating or Sticky Header for table could be nice, but simple for now */}
           <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search merchants..."
                   className="w-full h-12 rounded-2xl border border-slate-100 bg-white pl-12 pr-4 font-bold text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <button className="h-12 px-6 rounded-2xl bg-white border border-slate-100 font-bold text-sm text-slate-900 shadow-sm flex items-center justify-center gap-2">
                 <Filter className="h-4 w-4" />
                 Filters
              </button>
           </div>

           <div className="space-y-4">
              {TRANSACTIONS.map((tx) => (
                <div 
                  key={tx.id} 
                  className="premium-card rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div className="flex items-center gap-4 md:gap-6 flex-1">
                     <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Tag className="h-5 w-5" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-sm md:text-base font-black text-slate-900 truncate">{tx.merchant}</h3>
                           <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md hidden md:inline">{tx.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <p className="text-xs font-bold text-slate-500">{tx.date}</p>
                           <div className="h-1 w-1 rounded-full bg-slate-200" />
                           <p className="text-[10px] font-bold text-blue-600 italic tracking-tighter uppercase">{tx.cardId === '1' ? 'HDFC INFINIA' : tx.cardId === '2' ? 'AMEX PLAT' : 'AXIS MAGNUS'}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex md:flex-row items-center justify-between md:justify-end gap-6 md:gap-12 border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                     <div className="text-left md:text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Amount</p>
                        <p className="text-base md:text-lg font-black text-slate-900">{formatCurrency(tx.amount)}</p>
                     </div>
                     <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider leading-none">Rewards Earned</p>
                        <p className="text-base md:text-lg font-black text-emerald-600">+{tx.pointsEarned} <span className="text-[10px] md:text-xs">Pts</span></p>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
