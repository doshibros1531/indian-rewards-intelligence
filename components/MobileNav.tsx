'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CreditCard, 
  ShieldCheck, 
  Wallet, 
  ShoppingBag,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileItems = [
  { name: 'Home', icon: LayoutDashboard, href: '/' },
  { name: 'Cards', icon: CreditCard, href: '/inventory' },
  { name: 'Rewards', icon: Wallet, href: '/wallet' },
  { name: 'Shop', icon: ShoppingBag, href: '/marketplace' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t bg-white/80 backdrop-blur-lg px-2 lg:hidden">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              isActive ? "text-blue-600 scale-110" : "text-slate-400"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px] font-semibold">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
