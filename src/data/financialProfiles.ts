import { UserRole } from '@/types/user';

export interface FinancialProfile {
  income: {
    monthly: number;
    sources: string[];
    trend: number; // percentage change
  };
  expenses: {
    monthly: number;
    breakdown: { category: string; amount: number; color: string }[];
  };
  savings: {
    total: number;
    rate: number; // percentage
    goals: { name: string; target: number; current: number; color: string }[];
  };
  investments: {
    total: number;
    allocation: { name: string; value: number; amount: number; cagr: number; color: string }[];
    returns: number; // percentage
  };
  debts: {
    total: number;
    items: { name: string; amount: number; emi: number; rate: number }[];
    emiToIncomeRatio: number;
  };
  netWorth: {
    current: number;
    trend: { month: string; value: number }[];
    growth: number; // percentage
  };
}

export const getFinancialProfile = (role: UserRole): FinancialProfile => {
  const profiles: Record<UserRole, FinancialProfile> = {
    student: {
      income: {
        monthly: 18000,
        sources: ['Part-time job', 'Family allowance', 'Freelancing'],
        trend: 8.5
      },
      expenses: {
        monthly: 14000,
        breakdown: [
          { category: 'Food & Dining', amount: 4500, color: 'hsl(217, 91%, 60%)' },
          { category: 'Transport', amount: 2500, color: 'hsl(142, 71%, 45%)' },
          { category: 'Education', amount: 3000, color: 'hsl(38, 92%, 50%)' },
          { category: 'Entertainment', amount: 2000, color: 'hsl(280, 100%, 70%)' },
          { category: 'Others', amount: 2000, color: 'hsl(215, 20%, 65%)' }
        ]
      },
      savings: {
        total: 18000,
        rate: 22,
        goals: [
          { name: 'Emergency Fund', target: 25000, current: 8000, color: 'hsl(217, 91%, 60%)' },
          { name: 'Laptop Fund', target: 80000, current: 6000, color: 'hsl(142, 71%, 45%)' },
          { name: 'Travel Fund', target: 15000, current: 4000, color: 'hsl(38, 92%, 50%)' }
        ]
      },
      investments: {
        total: 12000,
        allocation: [
          { name: 'SIP Mutual Funds', value: 70, amount: 8400, cagr: 12.5, color: 'hsl(217, 91%, 60%)' },
          { name: 'Fixed Deposits', value: 30, amount: 3600, cagr: 6.5, color: 'hsl(142, 71%, 45%)' }
        ],
        returns: 10.2
      },
      debts: {
        total: 15000,
        items: [
          { name: 'Education Loan', amount: 15000, emi: 2500, rate: 8.5 }
        ],
        emiToIncomeRatio: 14
      },
      netWorth: {
        current: 15000,
        trend: [
          { month: 'Jan', value: 8000 },
          { month: 'Feb', value: 10500 },
          { month: 'Mar', value: 12200 },
          { month: 'Apr', value: 13800 },
          { month: 'May', value: 14500 },
          { month: 'Jun', value: 15000 }
        ],
        growth: 87.5
      }
    },

    professional: {
      income: {
        monthly: 95000,
        sources: ['Salary', 'Bonus', 'Freelancing'],
        trend: 12.5
      },
      expenses: {
        monthly: 62000,
        breakdown: [
          { category: 'Housing', amount: 28000, color: 'hsl(217, 91%, 60%)' },
          { category: 'Food & Dining', amount: 12000, color: 'hsl(142, 71%, 45%)' },
          { category: 'Transport', amount: 8000, color: 'hsl(38, 92%, 50%)' },
          { category: 'Healthcare', amount: 5000, color: 'hsl(280, 100%, 70%)' },
          { category: 'Entertainment', amount: 6000, color: 'hsl(0, 84%, 60%)' },
          { category: 'Others', amount: 3000, color: 'hsl(215, 20%, 65%)' }
        ]
      },
      savings: {
        total: 285000,
        rate: 35,
        goals: [
          { name: 'House Down Payment', target: 1500000, current: 850000, color: 'hsl(217, 91%, 60%)' },
          { name: 'Emergency Fund', target: 500000, current: 380000, color: 'hsl(142, 71%, 45%)' },
          { name: 'Vacation Fund', target: 200000, current: 120000, color: 'hsl(38, 92%, 50%)' }
        ]
      },
      investments: {
        total: 548000,
        allocation: [
          { name: 'Equity Mutual Funds', value: 45, amount: 246600, cagr: 14.2, color: 'hsl(217, 91%, 60%)' },
          { name: 'ELSS', value: 20, amount: 109600, cagr: 13.8, color: 'hsl(142, 71%, 45%)' },
          { name: 'Debt Funds', value: 25, amount: 137000, cagr: 8.5, color: 'hsl(38, 92%, 50%)' },
          { name: 'Gold ETF', value: 10, amount: 54800, cagr: 6.8, color: 'hsl(280, 100%, 70%)' }
        ],
        returns: 12.8
      },
      debts: {
        total: 3735000,
        items: [
          { name: 'Home Loan', amount: 3200000, emi: 44986, rate: 8.5 },
          { name: 'Car Loan', amount: 450000, emi: 15200, rate: 9.2 },
          { name: 'Credit Card', amount: 85000, emi: 8500, rate: 18.0 }
        ],
        emiToIncomeRatio: 72
      },
      netWorth: {
        current: 548000,
        trend: [
          { month: 'Jan', value: 450000 },
          { month: 'Feb', value: 475000 },
          { month: 'Mar', value: 462000 },
          { month: 'Apr', value: 495000 },
          { month: 'May', value: 520000 },
          { month: 'Jun', value: 548000 }
        ],
        growth: 21.8
      }
    },

    high_networth: {
      income: {
        monthly: 850000,
        sources: ['Business Income', 'Investment Returns', 'Rental Income', 'Dividends'],
        trend: 18.5
      },
      expenses: {
        monthly: 320000,
        breakdown: [
          { category: 'Lifestyle', amount: 120000, color: 'hsl(217, 91%, 60%)' },
          { category: 'Travel', amount: 80000, color: 'hsl(142, 71%, 45%)' },
          { category: 'Healthcare', amount: 45000, color: 'hsl(38, 92%, 50%)' },
          { category: 'Education', amount: 35000, color: 'hsl(280, 100%, 70%)' },
          { category: 'Charity', amount: 25000, color: 'hsl(0, 84%, 60%)' },
          { category: 'Others', amount: 15000, color: 'hsl(215, 20%, 65%)' }
        ]
      },
      savings: {
        total: 5200000,
        rate: 62,
        goals: [
          { name: 'Retirement Corpus', target: 100000000, current: 85000000, color: 'hsl(217, 91%, 60%)' },
          { name: 'Legacy Planning', target: 50000000, current: 30000000, color: 'hsl(142, 71%, 45%)' },
          { name: 'Real Estate', target: 20000000, current: 15000000, color: 'hsl(38, 92%, 50%)' }
        ]
      },
      investments: {
        total: 30200000,
        allocation: [
          { name: 'Equity Portfolio', value: 45, amount: 13590000, cagr: 16.2, color: 'hsl(217, 91%, 60%)' },
          { name: 'Real Estate', value: 25, amount: 7550000, cagr: 9.5, color: 'hsl(142, 71%, 45%)' },
          { name: 'Fixed Income', value: 15, amount: 4530000, cagr: 7.8, color: 'hsl(38, 92%, 50%)' },
          { name: 'Alternative Investments', value: 10, amount: 3020000, cagr: 12.5, color: 'hsl(280, 100%, 70%)' },
          { name: 'International Assets', value: 5, amount: 1510000, cagr: 11.2, color: 'hsl(0, 84%, 60%)' }
        ],
        returns: 14.8
      },
      debts: {
        total: 8500000,
        items: [
          { name: 'Property Loan', amount: 6500000, emi: 85000, rate: 7.5 },
          { name: 'Business Loan', amount: 2000000, emi: 35000, rate: 9.5 }
        ],
        emiToIncomeRatio: 14
      },
      netWorth: {
        current: 30200000,
        trend: [
          { month: 'Jan', value: 25000000 },
          { month: 'Feb', value: 26200000 },
          { month: 'Mar', value: 25800000 },
          { month: 'Apr', value: 27500000 },
          { month: 'May', value: 28900000 },
          { month: 'Jun', value: 30200000 }
        ],
        growth: 20.8
      }
    },

    retiree: {
      income: {
        monthly: 55000,
        sources: ['Pension', 'Investment Returns', 'Fixed Deposits'],
        trend: 4.2
      },
      expenses: {
        monthly: 48000,
        breakdown: [
          { category: 'Healthcare', amount: 15000, color: 'hsl(217, 91%, 60%)' },
          { category: 'Living Expenses', amount: 18000, color: 'hsl(142, 71%, 45%)' },
          { category: 'Utilities', amount: 6000, color: 'hsl(38, 92%, 50%)' },
          { category: 'Travel & Leisure', amount: 5000, color: 'hsl(280, 100%, 70%)' },
          { category: 'Family Support', amount: 3000, color: 'hsl(0, 84%, 60%)' },
          { category: 'Others', amount: 1000, color: 'hsl(215, 20%, 65%)' }
        ]
      },
      savings: {
        total: 2725000,
        rate: 13,
        goals: [
          { name: 'Healthcare Reserve', target: 1000000, current: 800000, color: 'hsl(217, 91%, 60%)' },
          { name: 'Emergency Fund', target: 500000, current: 480000, color: 'hsl(142, 71%, 45%)' },
          { name: 'Legacy Fund', target: 2000000, current: 1445000, color: 'hsl(38, 92%, 50%)' }
        ]
      },
      investments: {
        total: 2725000,
        allocation: [
          { name: 'Fixed Deposits', value: 40, amount: 1090000, cagr: 6.5, color: 'hsl(217, 91%, 60%)' },
          { name: 'Debt Mutual Funds', value: 30, amount: 817500, cagr: 7.2, color: 'hsl(142, 71%, 45%)' },
          { name: 'Dividend Stocks', value: 20, amount: 545000, cagr: 8.5, color: 'hsl(38, 92%, 50%)' },
          { name: 'Gold', value: 10, amount: 272500, cagr: 6.8, color: 'hsl(280, 100%, 70%)' }
        ],
        returns: 7.2
      },
      debts: {
        total: 0,
        items: [],
        emiToIncomeRatio: 0
      },
      netWorth: {
        current: 2725000,
        trend: [
          { month: 'Jan', value: 2800000 },
          { month: 'Feb', value: 2785000 },
          { month: 'Mar', value: 2770000 },
          { month: 'Apr', value: 2755000 },
          { month: 'May', value: 2740000 },
          { month: 'Jun', value: 2725000 }
        ],
        growth: -2.7
      }
    },

    admin: {
      income: {
        monthly: 150000,
        sources: ['Salary', 'System Admin Bonus'],
        trend: 10.0
      },
      expenses: {
        monthly: 85000,
        breakdown: [
          { category: 'Housing', amount: 35000, color: 'hsl(217, 91%, 60%)' },
          { category: 'Food', amount: 15000, color: 'hsl(142, 71%, 45%)' },
          { category: 'Transport', amount: 12000, color: 'hsl(38, 92%, 50%)' },
          { category: 'Tech & Tools', amount: 8000, color: 'hsl(280, 100%, 70%)' },
          { category: 'Healthcare', amount: 10000, color: 'hsl(0, 84%, 60%)' },
          { category: 'Others', amount: 5000, color: 'hsl(215, 20%, 65%)' }
        ]
      },
      savings: {
        total: 650000,
        rate: 43,
        goals: [
          { name: 'Tech Investments', target: 500000, current: 350000, color: 'hsl(217, 91%, 60%)' },
          { name: 'Emergency Fund', target: 300000, current: 300000, color: 'hsl(142, 71%, 45%)' }
        ]
      },
      investments: {
        total: 850000,
        allocation: [
          { name: 'Tech Stocks', value: 50, amount: 425000, cagr: 18.5, color: 'hsl(217, 91%, 60%)' },
          { name: 'Index Funds', value: 30, amount: 255000, cagr: 12.2, color: 'hsl(142, 71%, 45%)' },
          { name: 'Bonds', value: 20, amount: 170000, cagr: 7.5, color: 'hsl(38, 92%, 50%)' }
        ],
        returns: 14.2
      },
      debts: {
        total: 1200000,
        items: [
          { name: 'Home Loan', amount: 1200000, emi: 18000, rate: 8.0 }
        ],
        emiToIncomeRatio: 12
      },
      netWorth: {
        current: 850000,
        trend: [
          { month: 'Jan', value: 720000 },
          { month: 'Feb', value: 750000 },
          { month: 'Mar', value: 780000 },
          { month: 'Apr', value: 810000 },
          { month: 'May', value: 830000 },
          { month: 'Jun', value: 850000 }
        ],
        growth: 18.1
      }
    }
  };

  return profiles[role];
};
