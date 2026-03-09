export type Category = 'Dining' | 'Travel' | 'Grocery' | 'Shopping' | 'Utilities' | 'Other';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: Category;
  date: string;
  cardId: string;
  pointsEarned: number;
  rupeeValue: number;
  status: 'Completed' | 'Pending';
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    merchant: 'Taj Hotels',
    amount: 12500,
    category: 'Travel',
    date: '2026-03-01',
    cardId: '1', // Infinia
    pointsEarned: 2083,
    rupeeValue: 2083,
    status: 'Completed',
  },
  {
    id: 't2',
    merchant: 'Amazon.in',
    amount: 5400,
    category: 'Shopping',
    date: '2026-03-02',
    cardId: '1', // Infinia (SmartBuy)
    pointsEarned: 900,
    rupeeValue: 900,
    status: 'Completed',
  },
  {
    id: 't3',
    merchant: 'Blinkit',
    amount: 1450,
    category: 'Grocery',
    date: '2026-03-03',
    cardId: '3', // Magnus
    pointsEarned: 17,
    rupeeValue: 17 * 0.2,
    status: 'Completed',
  },
  {
    id: 't4',
    merchant: 'Air India',
    amount: 8500,
    category: 'Travel',
    date: '2026-03-04',
    cardId: '2', // Amex Plat Travel
    pointsEarned: 170,
    rupeeValue: 170 * 0.4,
    status: 'Completed',
  },
  {
    id: 't5',
    merchant: 'Indigo',
    amount: 12000,
    category: 'Travel',
    date: '2026-03-05',
    cardId: '1',
    pointsEarned: 2000,
    rupeeValue: 2000,
    status: 'Completed',
  }
];
