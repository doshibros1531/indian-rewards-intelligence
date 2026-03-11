"use client";

import React, { useState } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  Search,
  CreditCard as CreditCardIcon
} from 'lucide-react';
import { formatCurrency, CardIssuer, Card, INDIAN_BANKS } from '@/lib/reward-logic';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewardStore } from '@/lib/store';

export default function InventoryPage() {
  const { cards, addCard } = useRewardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bankId: '' as any,
    cardName: '',
    last4: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPortfolioValue = cards.reduce((acc, card) => acc + (card.currentPoints * card.pointsToRupees), 0);

  const selectedBank = INDIAN_BANKS.find(b => b.id === formData.bankId);

  const handleNext = () => {
    if (step === 1 && formData.bankId && formData.cardName) {
      setStep(2);
    } else if (step === 2 && formData.last4.length === 4) {
      simulateVerification();
    }
  };

  const simulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const newCard: Card = {
        id: Math.random().toString(36).substr(2, 9),
        issuer: formData.bankId as CardIssuer,
        name: formData.cardName,
        last4: formData.last4,
        color: formData.bankId === 'AMEX' ? 'bg-amber-600' : 'bg-slate-900',
        baseRewardRate: 2.0,
        pointsToRupees: 0.25,
        currentPoints: 2400,
        annualFee: 0,
        isAnnualFeeWaived: true,
        spendThresholdForWaiver: 0,
        rewardsBreakdown: { cashback: 0, airmiles: 0, cash: 0, vouchers: 0 },
        redemptionRules: [{ category: 'General', rate: 0.25 }]
      };
      
      addCard(newCard);
      setIsVerifying(false);
      setIsSuccess(true);
    }, 2000);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setFormData({ bankId: '', cardName: '', last4: '' });
    setIsSuccess(false);
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 md:gap-8 pb-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Card Inventory</h1>
            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium tracking-tight">Your connected financial arsenal, optimized by IROS.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all w-full md:w-auto"
          >
             <Plus className="h-4 w-4" />
             Link New Card
          </button>
        </div>

        {/* Secure Connection Hero */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-80 transition-opacity" />
           
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="max-w-xl space-y-4">
                 <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4">
                    <ShieldCheck className="h-4 w-4 fill-current" />
                    Bank-Grade Security
                 </div>
                 <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">Connect your entire credit card arsenal.</h2>
                 <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed tracking-tight">
                    IROS uses <span className="text-slate-900 font-bold">256-bit AES encryption</span> to securely link your accounts. We never store your credentials. Get a 360° view of your rewards in seconds.
                 </p>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                 <button className="h-14 px-8 rounded-xl bg-slate-900 text-white font-bold tracking-tight shadow-xl hover:bg-slate-800 transition-all">Link via Account Aggregator</button>
                 <button className="h-14 px-8 rounded-xl bg-white border border-slate-100 text-slate-900 font-bold tracking-tight hover:bg-slate-50 transition-all">Connect Credit Bureau</button>
              </div>
           </div>
        </div>

        {/* Existing Arsenal */}
        <div>
           <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              Your Current Arsenal
              <div className="h-1 flex-1 bg-slate-100 rounded-full" />
           </h2>

           <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
              {cards.map((card) => (
                 <div key={card.id} className="premium-card rounded-3xl p-6 flex items-center justify-between group overflow-hidden relative">
                    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity", card.color)} />
                    
                    <div className="flex items-center gap-4 md:gap-6 relative z-10">
                       <div className={cn("h-10 w-14 md:h-12 md:w-16 rounded-xl flex items-center justify-center text-[8px] md:text-[10px] font-black italic tracking-tighter text-white", card.color)}>{card.issuer}</div>
                       <div>
                          <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight">{card.name}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">•••• {card.last4}</p>
                       </div>
                    </div>

                    <div className="text-right relative z-10">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 leading-none">Reward Balance</p>
                       <p className="text-lg md:text-xl font-black text-slate-900">{formatCurrency(card.currentPoints * card.pointsToRupees)}</p>
                       <div className="flex items-center justify-end gap-2 mt-2">
                          <span className="text-[10px] font-bold text-emerald-600">Active</span>
                          <button className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                             <ChevronRight className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* AI Insight */}
        <div className="rounded-2xl md:rounded-3xl bg-slate-900 p-0.5 shadow-xl my-6">
           <div className="bg-slate-900 rounded-[14px] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-emerald-400 fill-current" />
                 </div>
                 <p className="text-white text-sm font-medium">
                   <span className="text-emerald-400 font-bold">Security Tip:</span> Connect your credit bureau once a month to automatically sync all your cards without manual entry.
                 </p>
              </div>
              <button className="text-xs font-bold text-slate-900 bg-emerald-500 px-6 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors w-full md:w-auto uppercase tracking-wider">
                 Sync Now
              </button>
           </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-xl bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
               {!isSuccess && (
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500" 
                      style={{ width: `${(step / 2) * 100}%` }} 
                    />
                 </div>
               )}

               {!isSuccess ? (
                 <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                          {step === 1 ? 'Add Your Arsenal' : 'Secure Verification'}
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                          {step === 1 ? 'Select your bank and card model.' : 'Confirm ownership of your card.'}
                        </p>
                      </div>
                      <button onClick={resetModal} className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <Plus className="h-5 w-5 rotate-45" />
                      </button>
                   </div>

                   {step === 1 ? (
                     <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Issuer Bank</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                             {INDIAN_BANKS.map(bank => (
                               <button 
                                 key={bank.id}
                                 onClick={() => setFormData({ ...formData, bankId: bank.id as CardIssuer, cardName: '' })}
                                 className={cn(
                                   "p-4 rounded-xl border-2 text-center transition-all",
                                   formData.bankId === bank.id 
                                     ? "border-emerald-500 bg-emerald-50/50" 
                                     : "border-slate-100 hover:border-emerald-100"
                                 )}
                               >
                                 <p className="text-xs font-black text-slate-900 tracking-tight">{bank.name}</p>
                               </button>
                             ))}
                          </div>
                       </div>

                       {formData.bankId && (
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Card Model</label>
                            <select 
                              className="w-full h-14 rounded-xl border-2 border-slate-100 bg-white px-6 font-bold text-slate-900 focus:outline-none focus:border-emerald-500 appearance-none"
                              value={formData.cardName}
                              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            >
                              <option value="">Select your card</option>
                              {selectedBank?.cards.map(card => (
                                <option key={card} value={card}>{card}</option>
                              ))}
                            </select>
                         </div>
                       )}

                       <button 
                         disabled={!formData.bankId || !formData.cardName}
                         onClick={handleNext}
                         className="w-full h-16 rounded-xl bg-emerald-500 text-slate-900 font-bold tracking-tight shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                       >
                          Next Step
                          <ArrowRight className="h-5 w-5" />
                       </button>
                     </div>
                   ) : (
                     <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                           <div className="h-12 w-16 bg-slate-900 rounded-xl flex items-center justify-center text-[8px] font-black italic text-white">
                              {formData.bankId}
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900">{formData.cardName}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting for verification</p>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Last 4 Digits</label>
                           <input 
                             type="text" 
                             maxLength={4}
                             placeholder="0000"
                             className="w-full h-16 rounded-xl border-2 border-slate-100 bg-white px-8 font-black text-2xl text-slate-900 text-center tracking-[0.5em] focus:outline-none focus:border-emerald-500"
                             value={formData.last4}
                             onChange={(e) => setFormData({ ...formData, last4: e.target.value.replace(/\D/g, '') })}
                           />
                        </div>

                        <button 
                          disabled={formData.last4.length < 4 || isVerifying}
                          onClick={handleNext}
                          className="w-full h-16 rounded-xl bg-slate-900 text-white font-bold tracking-tight shadow-xl hover:bg-slate-800 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                        >
                           {isVerifying ? (
                             <>
                               <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               Verifying...
                             </>
                           ) : (
                             <>
                               Link Card Securely
                               <ShieldCheck className="h-5 w-5" />
                             </>
                           )}
                        </button>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="py-10 text-center space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                       <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight">Arsenal Updated!</h2>
                       <p className="text-slate-500 font-medium">Your <span className="text-slate-900 font-bold">{formData.cardName}</span> has been linked.</p>
                    </div>
                    <button 
                      onClick={resetModal}
                      className="w-full h-16 rounded-xl bg-emerald-500 text-slate-900 font-bold tracking-tight shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
                    >
                       Done
                    </button>
                 </div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LayoutWrapper>
  );
}
