'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { AIChatBubble } from '@/components/AIChatBubble';
import { motion } from 'framer-motion';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/20">
      <Sidebar />
      <main className="min-h-screen lg:ml-64 pb-20 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      <MobileNav />
      <AIChatBubble />
    </div>
  );
}
