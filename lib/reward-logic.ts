export type CardIssuer = 'HDFC' | 'AMEX' | 'AXIS' | 'ICICI' | 'SBI' | 'IDFC' | 'KOTAK' | 'YES BANK' | 'INDUSIND' | 'RBL';

export interface RedemptionRate {
  category: string;
  rate: number; // in INR
  unit?: string;
}

export interface Card {
  id: string;
  issuer: CardIssuer;
  name: string;
  last4: string;
  color: string;
  baseRewardRate: number; // percentage
  smartBuyMultiplier?: number;
  milestoneTargets?: {
    spendAmount: number;
    rewardValue: number;
    label: string;
  }[];
  pointsToRupees: number; // default/average conversion factor
  currentPoints: number;
  expiryPoints?: number;
  expiryDate?: string;
  annualFee: number;
  isAnnualFeeWaived: boolean;
  spendThresholdForWaiver: number;
  rewardsBreakdown: {
    cashback: number;
    airmiles: number;
    cash: number;
    vouchers: number;
  };
  redemptionRules: RedemptionRate[];
}

export const INDIAN_BANKS = [
  { id: 'HDFC', name: 'HDFC Bank', cards: ['Infinia', 'Diners Black', 'Regalia Gold', 'Millennia', 'Tata Neu Infinity'] },
  { id: 'AMEX', name: 'American Express', cards: ['Platinum Card', 'Gold Card', 'MRCC'] },
  { id: 'AXIS', name: 'Axis Bank', cards: ['Atlas', 'Vistara Infinite', 'Ace', 'Select'] },
  { id: 'ICICI', name: 'ICICI Bank', cards: ['Emeralde', 'Sapphiro', 'Rubyx', 'Amazon Pay ICICI'] },
  { id: 'SBI', name: 'SBI Card', cards: ['Aurum', 'Elite', 'Prime', 'Cashback SBI', 'SimplyClick'] },
  { id: 'IDFC', name: 'IDFC First Bank', cards: ['First Private', 'First Wealth', 'First Select', 'First Millennia'] },
  { id: 'KOTAK', name: 'Kotak Mahindra', cards: ['White Reserve', 'Zen Signature', 'League Platinum'] },
  { id: 'YES BANK', name: 'Yes Bank', cards: ['Reserv', 'Marquee', 'BYOC'] },
  { id: 'INDUSIND', name: 'IndusInd Bank', cards: ['Pinnacle', 'Legend', 'Platinum'] },
  { id: 'RBL', name: 'RBL Bank', cards: ['World Safari', 'Shoprite', 'Platinum'] },
];

export const CARDS_DATA: Card[] = [
  {
    id: '1',
    issuer: 'HDFC',
    name: 'Infinia',
    last4: '4221',
    color: 'bg-slate-900',
    baseRewardRate: 3.33,
    smartBuyMultiplier: 5,
    pointsToRupees: 1,
    currentPoints: 124500,
    annualFee: 12500,
    isAnnualFeeWaived: false,
    spendThresholdForWaiver: 1000000,
    rewardsBreakdown: { cashback: 45000, airmiles: 60000, cash: 12000, vouchers: 7500 },
    redemptionRules: [
      { category: 'Travel (SmartBuy)', rate: 1.0 },
      { category: 'Airmiles Conversion', rate: 1.0, unit: 'Mile' },
      { category: 'Vouchers', rate: 0.5 },
      { category: 'Statement Credit', rate: 0.3 }
    ],
    milestoneTargets: [
      { spendAmount: 1000000, rewardValue: 12500, label: 'Annual Fee Waiver' }
    ]
  },
  {
    id: '2',
    issuer: 'HDFC',
    name: 'Regalia Gold',
    last4: '9901',
    color: 'bg-amber-500',
    baseRewardRate: 2.67,
    smartBuyMultiplier: 5,
    pointsToRupees: 0.5,
    currentPoints: 12000,
    annualFee: 2500,
    isAnnualFeeWaived: false,
    spendThresholdForWaiver: 400000,
    rewardsBreakdown: { cashback: 0, airmiles: 6000, cash: 0, vouchers: 6000 },
    redemptionRules: [
      { category: 'Travel', rate: 0.5 },
      { category: 'Gold Catalog', rate: 0.65 },
      { category: 'Vouchers', rate: 0.35 },
      { category: 'Statement Credit', rate: 0.2 }
    ],
    milestoneTargets: [
      { spendAmount: 150000, rewardValue: 1500, label: 'Quarterly Milestone' },
      { spendAmount: 400000, rewardValue: 2500, label: 'Annual Fee Waiver' },
      { spendAmount: 500000, rewardValue: 5000, label: 'Annual Milestone' }
    ]
  },

  {
    id: '4',
    issuer: 'AXIS',
    name: 'Atlas',
    last4: '1102',
    color: 'bg-indigo-900',
    baseRewardRate: 2.0, // 2 Miles per 100
    pointsToRupees: 1.0,
    currentPoints: 15000,
    annualFee: 5000,
    isAnnualFeeWaived: false,
    spendThresholdForWaiver: 1500000,
    rewardsBreakdown: { cashback: 0, airmiles: 15000, cash: 0, vouchers: 0 },
    redemptionRules: [
      { category: 'Travel', rate: 1.0 },
      { category: 'Airmiles (1:1)', rate: 1.0, unit: 'Mile' },
      { category: 'Vouchers', rate: 0.25 },
      { category: 'Statement Credit', rate: 0.2 }
    ],
    milestoneTargets: [
      { spendAmount: 300000, rewardValue: 2500, label: 'Tier 1 Milestone' },
      { spendAmount: 750000, rewardValue: 5000, label: 'Tier 2 Milestone' }
    ]
  },
  {
    id: '5',
    issuer: 'SBI',
    name: 'Elite',
    last4: '5541',
    color: 'bg-slate-700',
    baseRewardRate: 2.0,
    pointsToRupees: 0.25,
    currentPoints: 28000,
    annualFee: 4999,
    isAnnualFeeWaived: false,
    spendThresholdForWaiver: 1000000,
    rewardsBreakdown: { cashback: 0, airmiles: 0, cash: 0, vouchers: 7000 },
    redemptionRules: [
      { category: 'Travel/Vouchers/Catalog', rate: 0.25 },
      { category: 'Statement Credit', rate: 0.25 }
    ],
    milestoneTargets: [
      { spendAmount: 300000, rewardValue: 10000, label: 'Milestone Reward' },
      { spendAmount: 400000, rewardValue: 10000, label: 'Milestone Reward' }
    ]
  },
  {
    id: '6',
    issuer: 'ICICI',
    name: 'Sapphiro',
    last4: '7721',
    color: 'bg-blue-800',
    baseRewardRate: 2.0,
    pointsToRupees: 0.25,
    currentPoints: 18500,
    annualFee: 3500,
    isAnnualFeeWaived: true,
    spendThresholdForWaiver: 600000,
    rewardsBreakdown: { cashback: 0, airmiles: 0, cash: 0, vouchers: 4625 },
    redemptionRules: [
      { category: 'Travel/Vouchers/Catalog', rate: 0.25 },
      { category: 'Statement Credit', rate: 0.2 }
    ],
    milestoneTargets: []
  },
  {
    id: '7',
    issuer: 'AMEX',
    name: 'Platinum Travel',
    last4: '1004',
    color: 'bg-sky-600',
    baseRewardRate: 2.0, // 1 MR per 50
    pointsToRupees: 0.5,
    currentPoints: 42000,
    annualFee: 5000,
    isAnnualFeeWaived: true,
    spendThresholdForWaiver: 400000,
    rewardsBreakdown: { cashback: 0, airmiles: 34000, cash: 0, vouchers: 8000 },
    redemptionRules: [
      { category: 'Travel', rate: 0.5 },
      { category: 'Airmiles (1:1)', rate: 1.0, unit: 'Mile' },
      { category: 'Vouchers', rate: 0.4 },
      { category: 'Statement Credit', rate: 0.3 }
    ],
    milestoneTargets: [
      { spendAmount: 190000, rewardValue: 15000, label: 'First Milestone' },
      { spendAmount: 400000, rewardValue: 25000, label: 'Grand Milestone' }
    ]
  }
];

export function calculateReward(card: Card, amount: number, category?: string, isSmartBuy: boolean = false): number {
  if (card.issuer === 'HDFC' && card.name === 'Infinia') {
    const rate = isSmartBuy ? (card.baseRewardRate * (card.smartBuyMultiplier || 1)) : card.baseRewardRate;
    return (amount * rate) / 100;
  }
  
  // Check redemption rules for specific rates if available, otherwise use baseRewardRate
  const rule = card.redemptionRules.find(r => r.category.toLowerCase().includes((category || '').toLowerCase()));
  const rate = rule ? (rule.rate / 100) : (card.baseRewardRate / 100); // This logic needs to be careful about rate vs percentage
  
  // For simplicity in this mock, we'll stick to a slightly improved version of baseRewardRate
  return (amount * card.baseRewardRate) / 100;
}

export function getBestCardForTransaction(cards: Card[], amount: number, category: string): { card: Card, reward: number } {
  let bestCard = cards[0];
  let maxReward = -1;

  cards.forEach(card => {
    const reward = calculateReward(card, amount, category);
    if (reward > maxReward) {
      maxReward = reward;
      bestCard = card;
    }
  });

  return { card: bestCard, reward: maxReward };
}

export function calculateROI(card: Card, totalSpend: number): number {
  if (totalSpend === 0) return 0;
  const totalRewardsValue = (card.currentPoints * card.pointsToRupees);
  return ((totalRewardsValue - card.annualFee) / totalSpend) * 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}
