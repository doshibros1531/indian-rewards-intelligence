'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CreditCard, 
  Wallet, 
  ShoppingBag,
  History,
  Sparkles,
  Target,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const mainItems = [
  { name: 'Home', icon: LayoutDashboard, href: '/' },
  { name: 'Cards', icon: CreditCard, href: '/inventory' },
  { name: 'Ledger', icon: History, href: '/transactions' },
  { name: 'Optimize', icon: Sparkles, href: '/optimization' },
  { name: 'Wallet', icon: Wallet, href: '/wallet' },
];

const moreItems = [
  { name: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
  { name: 'Milestones', icon: Target, href: '/milestones' },
  { name: 'Case Studies', icon: Sparkles, href: '/case-studies' },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 z-[70] w-full bg-white rounded-t-[2.5rem] shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">Menu</span>
                  </div>
                  <button 
                    onClick={toggleMenu}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-3">
                  {[...mainItems, ...moreItems].map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={toggleMenu}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-all duration-200",
                          isActive 
                            ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={cn(
                            "h-5 w-5",
                            isActive ? "text-emerald-600" : "text-slate-400"
                          )} />
                          <span className="font-bold text-sm tracking-tight">{item.name}</span>
                        </div>
                        <ChevronRight className={cn("h-4 w-4 opacity-30", isActive && "opacity-100")} />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                    <div className="h-10 w-10 rounded-full bg-slate-200 shadow-inner" />
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">Rutvij Doshi</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Power User</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Primary Bottom Bar */}
      <div className="fixed bottom-0 left-0 z-50 flex h-[4.5rem] w-full items-center justify-between border-t bg-white/80 backdrop-blur-xl px-1 sm:px-2 pb-safe lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {mainItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-[1_1_0] flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-emerald-600 -translate-y-1" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn(
                "p-1.5 sm:p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-emerald-50 shadow-sm" : ""
              )}>
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter truncate w-full text-center px-0.5">{item.name}</span>
            </Link>
          );
        })}
        
        <button
          onClick={toggleMenu}
          className={cn(
            "flex flex-[1_1_0] flex-col items-center gap-1 transition-all duration-300",
            isMenuOpen ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
          )}
        >
          <div className={cn(
            "p-1.5 sm:p-2 rounded-xl transition-all duration-300",
            isMenuOpen ? "bg-emerald-50 shadow-sm" : ""
          )}>
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter truncate w-full text-center px-0.5">More</span>
        </button>
      </div>
    </>
  );
}
