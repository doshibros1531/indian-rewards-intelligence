'use client';

import React, { useState } from 'react';
import { MessageCircle, Sparkles, X, Send, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your IROS AI Associate. How can I help you optimize your rewards today?" }
  ]);
  const [input, setInput] = useState('');

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simple mock response
    setTimeout(() => {
      setMessages(m => [...m, { 
        role: 'assistant', 
        content: input.toLowerCase().includes('iphone') 
          ? "For an ₹1.2L iPhone purchase, I recommend using your HDFC Infinia card via the SmartBuy portal to earn 5X points (₹12,000 value unlock). This would also complete 12% of your annual fee waiver target!" 
          : "That's a great question! Based on your current card stack, I recommend using Amex Platinum Travel for this to hit your next ₹1.9L milestone."
      }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-20 right-6 z-[60] lg:bottom-10">
        <button
          onClick={toggleOpen}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 ring-[6px] ring-blue-100"
        >
          {isOpen ? <X className="h-6 w-6" /> : <BrainCircuit className="h-6 w-6 animate-pulse" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-36 right-6 z-[60] flex h-[500px] w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 lg:bottom-28"
          >
            <div className="flex items-center gap-3 bg-slate-900 p-5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">IROS AI Associate</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-slate-400">Card Expert Online</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-1 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm font-medium",
                      msg.role === 'user'
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white text-slate-700 shadow-sm border border-slate-100"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t bg-white p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask about your cards or milestones..."
                  className="w-full rounded-2xl bg-slate-100 py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/10 placeholder:text-slate-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-2 h-8 w-8 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
