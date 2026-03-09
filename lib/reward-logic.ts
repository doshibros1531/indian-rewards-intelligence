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
  { id: 'AMEX', name: 'American Express', cards: ['Platinum Travel', 'Platinum Card', 'Gold Card', 'MRCC'] },
  { id: 'AXIS', name: 'Axis Bank', cards: ['Magnus', 'Atlas', 'Vistara Infinite', 'Ace', 'Select'] },
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
    pointsToRupees: 1, // Max potential
    currentPoints: 124500,
    annualFee: 12500,
    isAnnualFeeWaived: false,
    spendThresholdForWaiver: 1000000,
    rewardsBreakdown: {
      cashback: 45000,
      airmiles: 60000,
      cash: 12000,
      vouchers: 7500
    },
    redemptionRules: [
      { category: 'Apple & Tanishq (SmartBuy)', rate: 1.0 },
      { category: 'Flights & Hotels', rate: 1.0 },
      { category: 'Airmiles Conversion', rate: 1.0, unit: 'Mile' },
      { category: 'Products & Vouchers', rate: 0.5 },
      { category: 'Statement Cashback', rate: 0.3 }
    ]
  }
];

export function calculateReward(card: Card, amount: number, isSmartBuy: boolean = false): number {
  if (card.issuer === 'HDFC' && card.name === 'Infinia') {
    const rate = isSmartBuy ? (card.baseRewardRate * (card.smartBuyMultiplier || 1)) : card.baseRewardRate;
    return (amount * rate) / 100;
  }
  
  return (amount * card.baseRewardRate) / 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}
