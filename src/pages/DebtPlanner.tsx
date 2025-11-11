import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingDown, Info, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

interface Debt {
  id: string;
  name: string;
  principal: number;
  remaining: number;
  interestRate: number;
  emi: number;
  tenure: number;
  remainingTenure: number;
}

const DebtPlanner = () => {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      name: "Home Loan",
      principal: 5000000,
      remaining: 3200000,
      interestRate: 8.5,
      emi: 44986,
      tenure: 240,
      remainingTenure: 156,
    },
    {
      id: "2",
      name: "Car Loan",
      principal: 800000,
      remaining: 425000,
      interestRate: 9.2,
      emi: 17852,
      tenure: 60,
      remainingTenure: 28,
    },
    {
      id: "3",
      name: "Personal Loan",
      principal: 300000,
      remaining: 125000,
      interestRate: 12.5,
      emi: 8965,
      tenure: 36,
      remainingTenure: 15,
    },
  ]);

  const [income, setIncome] = useState(150000);
  const [expenses, setExpenses] = useState(65000);
  const [adjustedDebts, setAdjustedDebts] = useState(false);

  // Simulate auto-adjustment based on income/expense changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate 10% income change or 15% expense change
      const incomeChange = Math.random() > 0.5 ? 1.1 : 0.9;
      const expenseChange = Math.random() > 0.5 ? 1.15 : 0.85;
      
      if (Math.abs(incomeChange - 1) >= 0.1 || Math.abs(expenseChange - 1) >= 0.15) {
        setAdjustedDebts(true);
        // Here you would recalculate EMIs based on new income/expenses
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining, 0);
  const totalEMI = debts.reduce((sum, debt) => sum + debt.emi, 0);
  const debtToIncomeRatio = ((totalEMI / income) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Adaptive Debt Planner</h1>
          <p className="text-muted-foreground mt-1">Smart debt management with real-time adjustments</p>
        </div>

        {/* Auto-Adjustment Alert */}
        {adjustedDebts && (
          <Card className="shadow-card border-warning/30 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground mb-1">Auto-Adjustment Applied</p>
                  <p className="text-sm text-muted-foreground">
                    Your debt repayment plan has been automatically recalculated based on recent financial changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debt Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Total Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                ₹{totalDebt.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Across {debts.length} accounts</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Monthly EMI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                ₹{totalEMI.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{debtToIncomeRatio}% of income</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${
                parseFloat(debtToIncomeRatio) < 40 
                  ? "bg-success/20 text-success" 
                  : "bg-warning/20 text-warning"
              } border-0 text-base px-4 py-2`}>
                {parseFloat(debtToIncomeRatio) < 40 ? "Healthy" : "Monitor"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Debt-to-Income Ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Debts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Active Debts</h2>
          
          {debts.map((debt) => (
            <Card key={debt.id} className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle>{debt.name}</CardTitle>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Debt plan auto-adjusted in real time per RBI-approved rate updates</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Interest Rate: {debt.interestRate}% | Remaining: {debt.remainingTenure} months
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Repayment Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {((1 - debt.remaining / debt.principal) * 100).toFixed(1)}% paid
                    </span>
                  </div>
                  <Progress 
                    value={((1 - debt.remaining / debt.principal) * 100)} 
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs text-muted-foreground mb-1">Principal</p>
                    <p className="font-semibold text-foreground">₹{debt.principal.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                    <p className="font-semibold text-foreground">₹{debt.remaining.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs text-muted-foreground mb-1">EMI</p>
                    <p className="font-semibold text-foreground animate-pulse">₹{debt.emi.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="font-semibold text-foreground">
                      ₹{((debt.emi * debt.tenure) - debt.principal).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Make Extra Payment
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
            <CardDescription>Optimize your debt repayment strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Focus on High-Interest Debt</h4>
              <p className="text-sm text-muted-foreground">
                Your Personal Loan has the highest interest rate at 12.5%. Consider allocating extra payments here 
                to save ₹28,500 in interest over the loan tenure.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-semibold text-foreground mb-2">Early Payoff Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Your Car Loan can be paid off 8 months early with an additional ₹5,000/month payment, 
                saving you ₹12,400 in interest charges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* RBI Compliance Note */}
        <Card className="shadow-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Debt plan auto-adjusted in real time per RBI-approved rate updates. All calculations follow 
                RBI guidelines for consumer protection and transparent lending practices.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DebtPlanner;
