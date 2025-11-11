import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Lightbulb, Target, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Insights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Insights</h1>
          <p className="text-muted-foreground mt-1">AI-powered recommendations for better financial health</p>
        </div>

        {/* Key Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card border-success/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <CardTitle>Positive Trends</CardTitle>
              </div>
              <CardDescription>You're doing great in these areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Excellent Savings Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      Your savings rate of 32.7% is 9% higher than your target. You're building wealth effectively.
                    </p>
                    <Badge className="mt-2 bg-success/20 text-success border-0">+9% above goal</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Net Worth Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Your net worth has grown by 5.4% this month, indicating strong financial progress.
                    </p>
                    <Badge className="mt-2 bg-success/20 text-success border-0">+5.4% growth</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-warning/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <CardTitle>Areas to Watch</CardTitle>
              </div>
              <CardDescription>Opportunities for improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Food Spending Up 15%</h4>
                    <p className="text-sm text-muted-foreground">
                      Your food expenses increased significantly this month. Consider meal planning to reduce costs.
                    </p>
                    <Badge className="mt-2 bg-warning/20 text-warning border-0">+15% increase</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Entertainment Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      Entertainment spending is at 6.1% of income. Consider reducing to below 5% for optimal savings.
                    </p>
                    <Badge className="mt-2 bg-warning/20 text-warning border-0">6.1% of income</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Recommendations */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Smart Recommendations</CardTitle>
            </div>
            <CardDescription>Personalized actions to improve your financial health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Invest Your Surplus</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You have ₹32,000 surplus this month. Consider investing in low-cost index mutual funds for long-term wealth creation.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-background">Mutual Funds</Badge>
                <Badge variant="outline" className="bg-background">Index Funds</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Optimize Debt Payments</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your debt-to-income ratio is healthy at 35.7%. Consider making extra EMI payments to reduce interest burden.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-background">Debt Management</Badge>
                <Badge variant="outline" className="bg-background">Interest Savings</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Build Emergency Fund</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Aim for 6 months of expenses in liquid savings. You're at 3.5 months currently. Allocate ₹10,000/month to reach your goal.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-background">Emergency Fund</Badge>
                <Badge variant="outline" className="bg-background">Financial Security</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Spending Analysis</CardTitle>
            <CardDescription>Detailed breakdown of your expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Housing", amount: 28000, percent: 28.6, trend: "stable", color: "bg-primary" },
                { category: "Food & Dining", amount: 15000, percent: 15.3, trend: "up", color: "bg-success" },
                { category: "Transportation", amount: 8000, percent: 8.2, trend: "down", color: "bg-warning" },
                { category: "Entertainment", amount: 6000, percent: 6.1, trend: "up", color: "bg-destructive" },
                { category: "Shopping", amount: 5000, percent: 5.1, trend: "stable", color: "bg-accent-foreground" },
              ].map((item) => (
                <div key={item.category} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">₹{item.amount.toLocaleString("en-IN")}</span>
                        {item.trend === "up" && <TrendingUp className="h-4 w-4 text-destructive" />}
                        {item.trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
                      </div>
                    </div>
                    <div className="relative w-full h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
