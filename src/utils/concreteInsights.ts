import { UserRole } from '@/types/user';

export interface ConcreteInsight {
  id: string;
  type: 'positive' | 'warning' | 'recommendation';
  title: string;
  description: string;
  details: string;
  actionItems: string[];
  specificSuggestions: string[];
  timeframe: string;
  expectedReturn?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export const getConcreteInsights = (role: UserRole): ConcreteInsight[] => {
  const baseInsights: ConcreteInsight[] = [
    {
      id: 'equity-investment',
      type: 'recommendation',
      title: 'Long-term Equity Investment Opportunity',
      description: 'Market conditions favor quality large-cap stocks for long-term wealth creation.',
      details: 'Current market valuations present attractive entry points for fundamentally strong companies. Large-cap stocks are trading at reasonable P/E ratios with strong earnings growth prospects.',
      actionItems: [
        'Allocate 15-20% of monthly savings to equity investments',
        'Start SIP in recommended stocks through your broker',
        'Review and rebalance quarterly'
      ],
      specificSuggestions: [
        'Reliance Industries (RIL) - Strong fundamentals, diversified business model, target: ₹3,200',
        'HDFC Bank - Banking sector leader, consistent growth, target: ₹1,850',
        'Infosys (INFY) - IT sector stability, dividend yield 2.8%, target: ₹2,100',
        'Asian Paints - Market leader in paints, strong moat, target: ₹3,800',
        'Bajaj Finance - NBFC leader, strong growth trajectory, target: ₹8,500'
      ],
      timeframe: '3-5 years',
      expectedReturn: '12-15% CAGR',
      riskLevel: 'medium'
    },
    {
      id: 'quick-growth-stocks',
      type: 'recommendation',
      title: 'High-Growth Stocks for Quick Returns',
      description: 'Emerging sectors and mid-cap stocks showing strong momentum for 1-2 year horizon.',
      details: 'Technology, renewable energy, and digital transformation themes are driving growth in select mid-cap stocks. These carry higher risk but offer potential for accelerated returns.',
      actionItems: [
        'Limit exposure to 5-10% of total portfolio',
        'Set stop-loss at 15% below purchase price',
        'Book partial profits at 25-30% gains'
      ],
      specificSuggestions: [
        'Zomato - Food delivery growth, expanding into quick commerce, target: ₹280',
        'Paytm - Digital payments recovery story, improving unit economics, target: ₹950',
        'Adani Green Energy - Renewable energy expansion, government support, target: ₹1,400',
        'Dixon Technologies - Electronics manufacturing, PLI scheme beneficiary, target: ₹18,000',
        'Nykaa - Beauty e-commerce leader, omnichannel expansion, target: ₹200'
      ],
      timeframe: '1-2 years',
      expectedReturn: '20-35% potential',
      riskLevel: 'high'
    },
    {
      id: 'mutual-fund-sip',
      type: 'recommendation',
      title: 'Diversified Mutual Fund SIP Strategy',
      description: 'Systematic investment in professionally managed diversified funds for steady wealth building.',
      details: 'Mutual funds offer professional management and diversification. Current market conditions favor starting or increasing SIP amounts in quality funds with consistent track records.',
      actionItems: [
        'Start SIP on 1st of every month',
        'Increase SIP amount by 10% annually',
        'Review fund performance every 6 months'
      ],
      specificSuggestions: [
        'Axis Bluechip Fund - Large cap fund, 5-year return: 14.2% CAGR',
        'Mirae Asset Large Cap Fund - Consistent performer, low expense ratio 1.8%',
        'SBI Small Cap Fund - For aggressive growth, 5-year return: 18.5% CAGR',
        'HDFC Balanced Advantage Fund - Dynamic asset allocation, lower volatility',
        'Parag Parikh Flexi Cap Fund - International exposure, value investing approach'
      ],
      timeframe: '5+ years',
      expectedReturn: '12-16% CAGR',
      riskLevel: 'medium'
    },
    {
      id: 'debt-optimization',
      type: 'warning',
      title: 'High-Interest Debt Alert',
      description: 'Credit card debt is costing you significantly. Immediate action required.',
      details: 'Your credit card debt at 18% interest is eroding wealth faster than most investments can build it. This is the highest priority financial issue to address.',
      actionItems: [
        'Pay minimum 3x the minimum amount due',
        'Consider personal loan at lower interest rate',
        'Stop using credit cards for new purchases'
      ],
      specificSuggestions: [
        'HDFC Personal Loan - 11.5% interest rate, up to ₹40L, quick approval',
        'SBI Personal Loan - 10.9% interest rate for salary account holders',
        'Bajaj Finserv Personal Loan - 11% interest rate, minimal documentation',
        'Consider balance transfer to ICICI Bank - 0% interest for 6 months',
        'Use debt avalanche method - pay highest interest debt first'
      ],
      timeframe: '6-12 months',
      expectedReturn: 'Save ₹15,000+ annually in interest',
      riskLevel: 'low'
    },
    {
      id: 'emergency-fund',
      type: 'warning',
      title: 'Emergency Fund Shortfall',
      description: 'Your emergency fund covers only 3 months of expenses. Increase to 6 months for financial security.',
      details: 'An adequate emergency fund prevents debt accumulation during financial crises. Current inflation and job market volatility make 6 months of expenses essential.',
      actionItems: [
        'Automate ₹15,000 monthly transfer to emergency fund',
        'Keep funds in high-yield savings account',
        'Do not invest emergency funds in market-linked products'
      ],
      specificSuggestions: [
        'HDFC Bank Savings Max - 3.5% interest rate, no minimum balance',
        'ICICI Bank Money2India - 4% interest rate for NRI accounts',
        'SBI Savings Plus - 3.25% interest rate, wide ATM network',
        'Kotak 811 Digital Account - 3.5% interest rate, zero charges',
        'Fixed Deposit ladder - 6.5% interest rate, staggered maturity'
      ],
      timeframe: '12 months',
      expectedReturn: 'Financial security worth ₹3L+',
      riskLevel: 'low'
    }
  ];

  // Role-specific insights
  const roleSpecificInsights: Record<UserRole, ConcreteInsight[]> = {
    student: [
      {
        id: 'student-investment',
        type: 'recommendation',
        title: 'Student-Friendly Investment Start',
        description: 'Begin your investment journey with small amounts in growth-oriented assets.',
        details: 'Starting early gives you a 40+ year investment horizon. Even small amounts can compound to significant wealth through the power of time and compounding.',
        actionItems: [
          'Start with ₹1,000 monthly SIP',
          'Open demat account with zero brokerage',
          'Learn about investing through free resources'
        ],
        specificSuggestions: [
          'Zerodha Coin - Zero commission mutual fund platform',
          'Groww App - User-friendly interface for beginners',
          'SIP in Axis Bluechip Fund - ₹500/month minimum',
          'Buy 1 share of TCS monthly - Learn stock investing gradually',
          'ELSS funds for tax saving - Axis Long Term Equity Fund'
        ],
        timeframe: '20+ years',
        expectedReturn: '₹1,000/month can become ₹2.5Cr by retirement',
        riskLevel: 'medium'
      }
    ],
    professional: [
      {
        id: 'professional-portfolio',
        type: 'recommendation',
        title: 'Aggressive Wealth Building Strategy',
        description: 'Your earning peak years require aggressive investment approach for maximum wealth creation.',
        details: 'Professionals in their 30s should maximize equity exposure while maintaining adequate insurance and emergency funds. This is the prime wealth accumulation phase.',
        actionItems: [
          'Increase equity allocation to 70-80%',
          'Maximize ELSS investment for tax benefits',
          'Consider international diversification'
        ],
        specificSuggestions: [
          'Motilal Oswal Nasdaq 100 Fund - US market exposure, 5-year return: 22% CAGR',
          'PPFAS Flexi Cap Fund - International stocks exposure up to 35%',
          'Direct stock investment: TCS, Infosys, HUL, HDFC Bank',
          'Real estate investment through REITs - Embassy Office Parks REIT',
          'Gold ETF allocation 5-10% - SBI Gold ETF, Nippon India Gold ETF'
        ],
        timeframe: '15-20 years',
        expectedReturn: '15-18% CAGR potential',
        riskLevel: 'medium'
      }
    ],
    high_networth: [
      {
        id: 'hnw-diversification',
        type: 'recommendation',
        title: 'Sophisticated Portfolio Diversification',
        description: 'Advanced investment strategies for wealth preservation and tax-efficient growth.',
        details: 'High net worth individuals need sophisticated strategies including alternative investments, international exposure, and tax optimization through various instruments.',
        actionItems: [
          'Diversify across asset classes and geographies',
          'Implement tax-loss harvesting strategies',
          'Consider private equity and AIF investments'
        ],
        specificSuggestions: [
          'Portfolio Management Services - IIFL, Kotak, HDFC Securities',
          'Alternative Investment Funds - Edelweiss AIF, IIFL AIF',
          'International stocks - Apple, Microsoft, Google through LRS',
          'Real estate investment - Commercial properties in Tier-1 cities',
          'Art and collectibles - 2-5% allocation for ultra-HNI'
        ],
        timeframe: '10+ years',
        expectedReturn: '12-15% post-tax returns',
        riskLevel: 'medium'
      }
    ],
    retiree: [
      {
        id: 'retiree-income',
        type: 'recommendation',
        title: 'Stable Income Generation Strategy',
        description: 'Focus on capital preservation with steady income generation for retirement years.',
        details: 'Retirees need a balance between capital preservation and income generation. The strategy should provide regular cash flows while protecting against inflation.',
        actionItems: [
          'Shift to 60% debt, 40% equity allocation',
          'Focus on dividend-paying stocks',
          'Consider monthly income plans'
        ],
        specificSuggestions: [
          'Dividend-paying stocks - ITC (5.2% yield), Coal India (7.8% yield)',
          'Monthly Income Plans - HDFC MIP, ICICI Pru MIP',
          'Senior Citizen Savings Scheme - 8.2% interest rate',
          'Post Office Monthly Income Scheme - 7.4% interest',
          'Corporate bonds - HDFC, Bajaj Finance bonds 8-9% yield'
        ],
        timeframe: '15-20 years',
        expectedReturn: '7-9% with capital protection',
        riskLevel: 'low'
      }
    ],
    admin: [
      {
        id: 'admin-tech-investment',
        type: 'recommendation',
        title: 'Technology Sector Investment Focus',
        description: 'Leverage your tech industry knowledge for targeted investment opportunities.',
        details: 'Your understanding of technology trends provides an edge in identifying promising tech investments. Focus on companies you understand and believe in.',
        actionItems: [
          'Invest in technology stocks you understand',
          'Consider global tech exposure',
          'Monitor emerging tech trends for investment opportunities'
        ],
        specificSuggestions: [
          'Indian IT stocks - TCS, Infosys, HCL Tech, Wipro',
          'US tech stocks via mutual funds - Motilal Oswal Nasdaq 100',
          'Emerging tech themes - AI, Cloud, Cybersecurity focused funds',
          'Startup investments through Angel networks - LetsVenture, AngelList',
          'Crypto allocation 2-5% - Bitcoin, Ethereum through WazirX, CoinDCX'
        ],
        timeframe: '5-10 years',
        expectedReturn: '18-25% potential in tech growth',
        riskLevel: 'high'
      }
    ]
  };

  return [...baseInsights, ...roleSpecificInsights[role]];
};
