import { FinancialProfile } from '@/data/financialProfiles';
import { UserRole } from '@/types/user';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  insight: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  category: 'savings' | 'investment' | 'debt' | 'tax' | 'insurance';
  impact: string;
  timeframe: string;
}

export const generateRecommendations = (profile: FinancialProfile, role: UserRole): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Savings Rate Analysis
  if (profile.savings.rate < 20) {
    recommendations.push({
      id: 'savings-rate-low',
      title: 'Increase Your Savings Rate',
      description: `Your current savings rate of ${profile.savings.rate}% is below the recommended 20% minimum.`,
      insight: `Based on your monthly income of ₹${profile.income.monthly.toLocaleString()}, you could save an additional ₹${((profile.income.monthly * 0.2) - (profile.income.monthly * profile.savings.rate / 100)).toLocaleString()} per month.`,
      action: 'Review your expense breakdown and identify areas to cut back. Consider automating savings transfers.',
      priority: 'high',
      category: 'savings',
      impact: 'Could increase annual savings by ₹' + (((profile.income.monthly * 0.2) - (profile.income.monthly * profile.savings.rate / 100)) * 12).toLocaleString(),
      timeframe: '3-6 months'
    });
  }

  // Investment Diversification
  if (profile.investments.allocation.length < 3) {
    recommendations.push({
      id: 'diversify-portfolio',
      title: 'Diversify Your Investment Portfolio',
      description: 'Your portfolio lacks diversification across asset classes.',
      insight: 'Concentrated investments increase risk. A well-diversified portfolio can reduce volatility by 15-25%.',
      action: 'Consider adding international equity funds, REITs, or gold ETFs to your portfolio.',
      priority: 'medium',
      category: 'investment',
      impact: 'Potential risk reduction of 20%',
      timeframe: '1-3 months'
    });
  }

  // Debt Management
  if (profile.debts.emiToIncomeRatio > 40) {
    recommendations.push({
      id: 'debt-consolidation',
      title: 'High Debt-to-Income Ratio Alert',
      description: `Your EMI-to-income ratio of ${profile.debts.emiToIncomeRatio}% exceeds the safe limit of 40%.`,
      insight: 'High debt ratios can strain your finances and limit investment opportunities.',
      action: 'Consider debt consolidation or prepayment of high-interest loans. Prioritize credit card debt first.',
      priority: 'high',
      category: 'debt',
      impact: 'Could save ₹' + Math.round(profile.debts.total * 0.02).toLocaleString() + ' annually in interest',
      timeframe: '6-12 months'
    });
  }

  // Role-specific recommendations
  switch (role) {
    case 'student':
      recommendations.push({
        id: 'student-sip',
        title: 'Start Your Investment Journey',
        description: 'Begin with small, regular investments to build wealth over time.',
        insight: 'Starting early gives you a 40-year investment horizon. Even ₹1,000/month can grow to ₹1.2Cr by retirement.',
        action: 'Start a SIP in a diversified equity mutual fund with ₹1,000-2,000 monthly.',
        priority: 'medium',
        category: 'investment',
        impact: 'Potential corpus of ₹1.2Cr by age 60',
        timeframe: 'Start immediately'
      });
      break;

    case 'professional':
      if (profile.investments.total < profile.income.monthly * 12) {
        recommendations.push({
          id: 'professional-investment',
          title: 'Accelerate Wealth Building',
          description: 'Your investment corpus is less than your annual income.',
          insight: 'Professionals should aim for 3-5x annual income in investments by age 35.',
          action: 'Increase monthly SIP by ₹10,000-15,000. Consider ELSS for tax benefits.',
          priority: 'high',
          category: 'investment',
          impact: 'Additional ₹18L corpus in 10 years',
          timeframe: '1 month'
        });
      }
      break;

    case 'high_networth':
      recommendations.push({
        id: 'hnw-tax-optimization',
        title: 'Advanced Tax Optimization',
        description: 'Optimize your tax strategy with sophisticated instruments.',
        insight: 'High earners can save 20-30% in taxes through proper structuring.',
        action: 'Consider NPS Tier-II, international funds, and tax-efficient debt instruments.',
        priority: 'high',
        category: 'tax',
        impact: 'Potential tax savings of ₹2-5L annually',
        timeframe: '2-3 months'
      });
      break;

    case 'retiree':
      if (profile.netWorth.growth < 0) {
        recommendations.push({
          id: 'retiree-preservation',
          title: 'Wealth Preservation Strategy',
          description: 'Your portfolio is declining. Focus on capital preservation.',
          insight: 'Retirees need 4-6% annual growth to maintain purchasing power against inflation.',
          action: 'Rebalance to 60% debt, 30% equity, 10% gold. Consider dividend-paying stocks.',
          priority: 'high',
          category: 'investment',
          impact: 'Portfolio longevity extended by 5-8 years',
          timeframe: '1 month'
        });
      }
      break;
  }

  // Emergency Fund Check
  const emergencyFundTarget = profile.expenses.monthly * 6;
  const currentEmergencyFund = profile.savings.goals.find(g => g.name.toLowerCase().includes('emergency'))?.current || 0;
  
  if (currentEmergencyFund < emergencyFundTarget) {
    recommendations.push({
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      description: `Your emergency fund of ₹${currentEmergencyFund.toLocaleString()} is below the recommended 6 months of expenses.`,
      insight: 'An adequate emergency fund prevents debt accumulation during financial crises.',
      action: `Build emergency fund to ₹${emergencyFundTarget.toLocaleString()}. Save ₹${Math.round((emergencyFundTarget - currentEmergencyFund) / 12).toLocaleString()} monthly.`,
      priority: 'high',
      category: 'savings',
      impact: 'Financial security for 6 months',
      timeframe: '12 months'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};
