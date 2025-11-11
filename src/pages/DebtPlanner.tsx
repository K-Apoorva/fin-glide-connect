import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, TrendingDown, Info, AlertTriangle, Calendar, Monitor, Calculator, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Debt {
  id: string;
  name: string;
  principal: number;
  remaining: number;
  interestRate: number;
  emi: number;
  tenure: number;
  remainingTenure: number;
  nextPaymentDate: string;
}

interface PaymentSchedule {
  month: number;
  date: string;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const DebtPlanner = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(95000);
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
      nextPaymentDate: "2024-01-15"
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
      nextPaymentDate: "2024-01-12"
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
      nextPaymentDate: "2024-01-10"
    },
    {
      id: "4",
      name: "Credit Card",
      principal: 150000,
      remaining: 85000,
      interestRate: 18.0,
      emi: 8500,
      tenure: 24,
      remainingTenure: 12,
      nextPaymentDate: "2024-01-05"
    }
  ]);

  const [selectedDebt, setSelectedDebt] = useState(debts[0]);
  const [simulationScenario, setSimulationScenario] = useState({
    extraPayment: 0,
    newInterestRate: selectedDebt.interestRate
  });

  // Calculate debt metrics
  const totalEMI = debts.reduce((sum, debt) => sum + debt.emi, 0);
  const totalRemaining = debts.reduce((sum, debt) => sum + debt.remaining, 0);
  const debtToIncomeRatio = (totalEMI / monthlyIncome) * 100;

  // Generate payment schedule for selected debt
  const generatePaymentSchedule = (debt: Debt, extraPayment: number = 0): PaymentSchedule[] => {
    const schedule: PaymentSchedule[] = [];
    let balance = debt.remaining;
    const monthlyRate = debt.interestRate / 100 / 12;
    const adjustedEMI = debt.emi + extraPayment;
    
    for (let month = 1; month <= Math.min(debt.remainingTenure, 12); month++) {
      const interest = balance * monthlyRate;
      const principal = adjustedEMI - interest;
      balance = Math.max(0, balance - principal);
      
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + month);
      
      schedule.push({
        month,
        date: paymentDate.toISOString().split('T')[0],
        emi: adjustedEMI,
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.round(balance)
      });
      
      if (balance <= 0) break;
    }
    
    return schedule;
  };

  // Get debt plan recommendations based on debt-to-income ratio
  const getDebtPlanRecommendations = () => {
    if (debtToIncomeRatio > 50) {
      return {
        status: 'critical',
        message: 'Critical: Debt-to-income ratio is dangerously high',
        recommendations: [
          'Consider debt consolidation at lower interest rates',
          'Prioritize paying off high-interest credit card debt first',
          'Explore additional income sources',
          'Reduce discretionary spending by 30-40%'
        ],
        suggestedActions: [
          { action: 'Pay extra ₹5,000 on credit card', impact: 'Save ₹15,000 in interest' },
          { action: 'Consolidate personal loan', impact: 'Reduce EMI by ₹2,500' }
        ]
      };
    } else if (debtToIncomeRatio > 40) {
      return {
        status: 'warning',
        message: 'Warning: Debt-to-income ratio is above recommended levels',
        recommendations: [
          'Focus on paying off highest interest rate debts first',
          'Consider making extra payments when possible',
          'Avoid taking on new debt',
          'Build emergency fund alongside debt payments'
        ],
        suggestedActions: [
          { action: 'Pay extra ₹3,000 monthly', impact: 'Save ₹8,500 in interest' },
          { action: 'Refinance car loan', impact: 'Reduce rate to 8.5%' }
        ]
      };
    } else {
      return {
        status: 'good',
        message: 'Good: Debt-to-income ratio is within healthy limits',
        recommendations: [
          'Continue current payment schedule',
          'Consider investing surplus funds',
          'Maintain emergency fund',
          'Explore prepayment options for tax benefits'
        ],
        suggestedActions: [
          { action: 'Prepay home loan ₹50,000', impact: 'Save ₹1.2L in interest' },
          { action: 'Invest surplus in equity', impact: '12-15% potential returns' }
        ]
      };
    }
  };

  const debtPlan = getDebtPlanRecommendations();
  const paymentSchedule = generatePaymentSchedule(selectedDebt, simulationScenario.extraPayment);

  const handleIncomeChange = (newIncome: string) => {
    const income = parseInt(newIncome) || 0;
    setMonthlyIncome(income);
    toast.success("Debt plan updated based on new income!");
  };

  const simulateScenario = () => {
    const newSchedule = generatePaymentSchedule(selectedDebt, simulationScenario.extraPayment);
    const originalTenure = selectedDebt.remainingTenure;
    const newTenure = newSchedule.length;
    const interestSaved = (originalTenure - newTenure) * selectedDebt.emi * 0.6; // Approximate interest savings
    
    toast.success(`Scenario simulated! Tenure reduced by ${originalTenure - newTenure} months. Interest saved: ₹${Math.round(interestSaved).toLocaleString()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted/50 border-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Debt Planner</h1>
          <p className="text-muted-foreground mt-1">Manage your debts and optimize repayment strategies</p>
        </div>

        {/* Debt Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total EMI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEMI.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Monthly payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalRemaining / 100000).toFixed(1)}L</div>
              <p className="text-xs text-muted-foreground">Outstanding amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Debt-to-Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${debtToIncomeRatio > 40 ? 'text-destructive' : 'text-success'}`}>
                {debtToIncomeRatio.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Of monthly income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${debtPlan.status === 'good' ? 'text-success' : debtPlan.status === 'warning' ? 'text-warning' : 'text-destructive'}`}>
                {debtPlan.status.toUpperCase()}
              </div>
              <p className="text-xs text-muted-foreground">Debt health</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">View Schedule</TabsTrigger>
            <TabsTrigger value="monitor">Monitor & Simulate</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Debt Plan Status */}
            <Card className={`border-l-4 ${debtPlan.status === 'good' ? 'border-l-success' : debtPlan.status === 'warning' ? 'border-l-warning' : 'border-l-destructive'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Debt Management Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg border ${getStatusColor(debtPlan.status)}`}>
                  <h4 className="font-semibold mb-2">{debtPlan.message}</h4>
                  <ul className="space-y-1 text-sm">
                    {debtPlan.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 space-y-3">
                  <h4 className="font-semibold">Suggested Actions</h4>
                  {debtPlan.suggestedActions.map((action, index) => (
                    <div key={index} className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{action.action}</p>
                          <p className="text-sm text-success">{action.impact}</p>
                        </div>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Debt List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Debts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {debts.map((debt) => (
                    <div key={debt.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{debt.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Next payment: {new Date(debt.nextPaymentDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={debt.interestRate > 15 ? "destructive" : debt.interestRate > 10 ? "secondary" : "default"}>
                          {debt.interestRate}% APR
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Outstanding</p>
                          <p className="font-semibold">₹{(debt.remaining / 100000).toFixed(1)}L</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">EMI</p>
                          <p className="font-semibold">₹{debt.emi.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Remaining</p>
                          <p className="font-semibold">{debt.remainingTenure} months</p>
                        </div>
                      </div>
                      
                      <Progress value={(debt.principal - debt.remaining) / debt.principal * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((debt.principal - debt.remaining) / debt.principal * 100)}% paid off
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Payment Schedule
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="debt-select">Select Debt:</Label>
                    <select
                      id="debt-select"
                      value={selectedDebt.id}
                      onChange={(e) => setSelectedDebt(debts.find(d => d.id === e.target.value) || debts[0])}
                      className="px-3 py-1 border rounded-md"
                    >
                      {debts.map(debt => (
                        <option key={debt.id} value={debt.id}>{debt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <CardDescription>Next 12 months payment schedule for {selectedDebt.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>EMI</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentSchedule.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.month}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-semibold">₹{payment.emi.toLocaleString()}</TableCell>
                        <TableCell className="text-success">₹{payment.principal.toLocaleString()}</TableCell>
                        <TableCell className="text-destructive">₹{payment.interest.toLocaleString()}</TableCell>
                        <TableCell>₹{payment.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Debt Monitor & Simulator
                </CardTitle>
                <CardDescription>Adjust parameters to see how changes affect your debt plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Controls */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="income">Monthly Income (₹)</Label>
                      <Input
                        id="income"
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => handleIncomeChange(e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Current debt-to-income ratio: {debtToIncomeRatio.toFixed(1)}%
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="extra-payment">Extra Monthly Payment (₹)</Label>
                      <Input
                        id="extra-payment"
                        type="number"
                        value={simulationScenario.extraPayment}
                        onChange={(e) => setSimulationScenario(prev => ({ ...prev, extraPayment: parseInt(e.target.value) || 0 }))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="new-rate">Simulated Interest Rate (%)</Label>
                      <Input
                        id="new-rate"
                        type="number"
                        step="0.1"
                        value={simulationScenario.newInterestRate}
                        onChange={(e) => setSimulationScenario(prev => ({ ...prev, newInterestRate: parseFloat(e.target.value) || prev.newInterestRate }))}
                        className="mt-1"
                      />
                    </div>

                    <Button onClick={simulateScenario} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Run Simulation
                    </Button>
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Current Scenario Impact</h4>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Monthly EMI</p>
                          <p className="text-lg font-bold">₹{totalEMI.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                          <p className={`text-lg font-bold ${debtToIncomeRatio > 40 ? 'text-destructive' : 'text-success'}`}>
                            {debtToIncomeRatio.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Recommendations Based on Current Ratio:</h5>
                      {debtPlan.recommendations.map((rec, index) => (
                        <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>

                    {simulationScenario.extraPayment > 0 && (
                      <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                        <h5 className="font-medium text-success mb-2">Simulation Results</h5>
                        <p className="text-sm">
                          With ₹{simulationScenario.extraPayment.toLocaleString()} extra payment:
                        </p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Reduced tenure by ~{Math.round(simulationScenario.extraPayment / selectedDebt.emi * 12)} months</li>
                          <li>• Estimated interest savings: ₹{Math.round(simulationScenario.extraPayment * 12 * 0.6).toLocaleString()}</li>
                          <li>• New debt-to-income ratio: {((totalEMI + simulationScenario.extraPayment) / monthlyIncome * 100).toFixed(1)}%</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DebtPlanner;
