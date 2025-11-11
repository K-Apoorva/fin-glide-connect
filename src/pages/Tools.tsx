import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calculator, TrendingUp, CreditCard, PieChart } from "lucide-react";

const Tools = () => {
  const [cagrInitial, setCagrInitial] = useState("");
  const [cagrFinal, setCagrFinal] = useState("");
  const [cagrYears, setCagrYears] = useState("");
  const [cagrResult, setCagrResult] = useState<number | null>(null);

  const [emiPrincipal, setEmiPrincipal] = useState("");
  const [emiRate, setEmiRate] = useState("");
  const [emiTenure, setEmiTenure] = useState("");
  const [emiResult, setEmiResult] = useState<number | null>(null);

  const [debtIncome, setDebtIncome] = useState("");
  const [debtTotal, setDebtTotal] = useState("");
  const [debtRatio, setDebtRatio] = useState<number | null>(null);

  const calculateCAGR = () => {
    const initial = parseFloat(cagrInitial);
    const final = parseFloat(cagrFinal);
    const years = parseFloat(cagrYears);
    
    if (initial && final && years) {
      const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
      setCagrResult(cagr);
    }
  };

  const calculateEMI = () => {
    const principal = parseFloat(emiPrincipal);
    const rate = parseFloat(emiRate) / 12 / 100;
    const tenure = parseFloat(emiTenure);
    
    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      setEmiResult(emi);
    }
  };

  const calculateDebtRatio = () => {
    const income = parseFloat(debtIncome);
    const debt = parseFloat(debtTotal);
    
    if (income && debt) {
      const ratio = (debt / income) * 100;
      setDebtRatio(ratio);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Tools</h1>
          <p className="text-muted-foreground mt-1">Calculate and analyze your financial metrics</p>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CAGR Calculator */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>CAGR Calculator</CardTitle>
              </div>
              <CardDescription>Calculate Compound Annual Growth Rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cagr-initial">Initial Value (₹)</Label>
                <Input
                  id="cagr-initial"
                  type="number"
                  placeholder="100000"
                  value={cagrInitial}
                  onChange={(e) => setCagrInitial(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cagr-final">Final Value (₹)</Label>
                <Input
                  id="cagr-final"
                  type="number"
                  placeholder="150000"
                  value={cagrFinal}
                  onChange={(e) => setCagrFinal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cagr-years">Time Period (Years)</Label>
                <Input
                  id="cagr-years"
                  type="number"
                  placeholder="5"
                  value={cagrYears}
                  onChange={(e) => setCagrYears(e.target.value)}
                />
              </div>
              <Button onClick={calculateCAGR} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate CAGR
              </Button>
              {cagrResult !== null && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">CAGR Result</p>
                  <p className="text-2xl font-bold text-primary">{cagrResult.toFixed(2)}%</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* EMI Calculator */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>EMI Calculator</CardTitle>
              </div>
              <CardDescription>Calculate Equated Monthly Installment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emi-principal">Loan Amount (₹)</Label>
                <Input
                  id="emi-principal"
                  type="number"
                  placeholder="1000000"
                  value={emiPrincipal}
                  onChange={(e) => setEmiPrincipal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emi-rate">Interest Rate (% per annum)</Label>
                <Input
                  id="emi-rate"
                  type="number"
                  placeholder="8.5"
                  step="0.1"
                  value={emiRate}
                  onChange={(e) => setEmiRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emi-tenure">Tenure (Months)</Label>
                <Input
                  id="emi-tenure"
                  type="number"
                  placeholder="240"
                  value={emiTenure}
                  onChange={(e) => setEmiTenure(e.target.value)}
                />
              </div>
              <Button onClick={calculateEMI} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate EMI
              </Button>
              {emiResult !== null && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-2xl font-bold text-primary">₹{emiResult.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Debt-to-Income Ratio */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <CardTitle>Debt-to-Income Ratio</CardTitle>
              </div>
              <CardDescription>Analyze your debt burden relative to income</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="debt-income">Gross Monthly Income (₹)</Label>
                <Input
                  id="debt-income"
                  type="number"
                  placeholder="98000"
                  value={debtIncome}
                  onChange={(e) => setDebtIncome(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt-total">Total Monthly Debt (₹)</Label>
                <Input
                  id="debt-total"
                  type="number"
                  placeholder="35000"
                  value={debtTotal}
                  onChange={(e) => setDebtTotal(e.target.value)}
                />
              </div>
              <Button onClick={calculateDebtRatio} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Ratio
              </Button>
              {debtRatio !== null && (
                <div className="space-y-2">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                    <p className="text-2xl font-bold text-primary">{debtRatio.toFixed(2)}%</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    debtRatio < 36 ? "bg-success/10 border border-success/20" :
                    debtRatio < 43 ? "bg-warning/10 border border-warning/20" :
                    "bg-destructive/10 border border-destructive/20"
                  }`}>
                    <p className="text-sm font-medium">
                      {debtRatio < 36 ? "✓ Healthy debt level" :
                       debtRatio < 43 ? "⚠ Moderate debt level" :
                       "⚠ High debt level - consider debt reduction"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* IRR Info Card */}
          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>IRR Calculator</CardTitle>
              </div>
              <CardDescription>Internal Rate of Return - Coming Soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-accent/50 border border-accent-foreground/20">
                <p className="text-sm text-muted-foreground">
                  IRR calculation for multiple cash flows is under development. 
                  This advanced tool will help you evaluate investment performance across irregular cash flow periods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tools;
