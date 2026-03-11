'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  Wallet, 
  ShoppingBag, 
  Target, 
  Sparkles,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Card Inventory', icon: CreditCard, href: '/inventory' },
  { name: 'Spend Optimization', icon: Sparkles, href: '/optimization' },
  { name: 'Rewards Wallet', icon: Wallet, href: '/wallet' },
  { name: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
  { name: 'Milestones', icon: Target, href: '/milestones' },
  { name: 'Transactions', icon: History, href: '/transactions' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-white sidebar-gradient lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">IROS</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto pt-6 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/5" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <Settings className="h-5 w-5 text-slate-400" />
          Settings
        </button>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200 shadow-inner" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-semibold text-slate-900">Minto Ak.</p>
            <p className="truncate text-[10px] text-slate-500 font-medium">Power User</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
