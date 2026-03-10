import { create } from 'zustand';
import { Card, CARDS_DATA } from './reward-logic';
import { TRANSACTIONS, Transaction } from './mock-transactions';

interface RewardStore {
  cards: Card[];
  transactions: Transaction[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  updatePoints: (id: string, points: number) => void;
  addTransaction: (tx: Transaction) => void;
}

export const useRewardStore = create<RewardStore>((set) => ({
  // Initialize with only Infinia as requested
  cards: CARDS_DATA.filter(card => card.issuer === 'HDFC'),
  
  // Initialize with transactions for the active card
  transactions: TRANSACTIONS.filter(tx => tx.cardId === '1'),
  
  addCard: (card) => set((state) => ({ 
    cards: [...state.cards, card] 
  })),
  
  removeCard: (id) => set((state) => ({ 
    cards: state.cards.filter(c => c.id !== id) 
  })),
  
  updatePoints: (id, points) => set((state) => ({
    cards: state.cards.map(c => c.id === id ? { ...c, currentPoints: points } : c)
  })),

  addTransaction: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions]
  })),
}));
