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
    id: 't5',
    merchant: 'Indigo',
    amount: 12000,
    category: 'Travel',
    date: '2026-03-05',
    cardId: '1',
    pointsEarned: 2000,
    rupeeValue: 2000,
    status: 'Completed',
  },
  {
    id: 't6',
    merchant: 'Nykaa',
    amount: 3200,
    category: 'Shopping',
    date: '2026-03-06',
    cardId: '2', // Regalia Gold
    pointsEarned: 427,
    rupeeValue: 427 * 0.5,
    status: 'Completed',
  },
  {
    id: 't7',
    merchant: 'Indigo',
    amount: 45000,
    category: 'Travel',
    date: '2026-03-07',
    cardId: '4', // Axis Atlas
    pointsEarned: 2250, // 5X Miles on travel
    rupeeValue: 2250,
    status: 'Completed',
  },
  {
    id: 't8',
    merchant: 'Marriott',
    amount: 15000,
    category: 'Travel',
    date: '2026-03-08',
    cardId: '3', // Magnus
    pointsEarned: 900,
    rupeeValue: 900 * 0.2,
    status: 'Completed',
  },
  {
    id: 't9',
    merchant: 'Zomato',
    amount: 2500,
    category: 'Dining',
    date: '2026-03-09',
    cardId: '5', // SBI Elite
    pointsEarned: 125, // 5X on dining
    rupeeValue: 125 * 0.25,
    status: 'Completed',
  },
  {
    id: 't10',
    merchant: 'PVR Cinemas',
    amount: 1200,
    category: 'Shopping',
    date: '2026-03-10',
    cardId: '6', // ICICI Sapphiro
    pointsEarned: 60, // 5X on movies
    rupeeValue: 60 * 0.25,
    status: 'Completed',
  },
  {
    id: 't11',
    merchant: 'Apple India',
    amount: 89000,
    category: 'Shopping',
    date: '2026-03-11',
    cardId: '7', // Amex Plat Travel
    pointsEarned: 1780,
    rupeeValue: 1780 * 0.5,
    status: 'Completed',
  }
];
