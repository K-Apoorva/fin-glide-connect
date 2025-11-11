import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Calculator, TrendingUp, CreditCard, PieChart, Target, DollarSign, Percent } from "lucide-react";
import { toast } from "sonner";

const Tools = () => {
  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState("");
  const [sipRate, setSipRate] = useState("");
  const [sipYears, setSipYears] = useState("");
  const [sipResult, setSipResult] = useState<{maturityAmount: number, invested: number, gains: number} | null>(null);

  // EMI Calculator State
  const [emiPrincipal, setEmiPrincipal] = useState("");
  const [emiRate, setEmiRate] = useState("");
  const [emiTenure, setEmiTenure] = useState("");
  const [emiResult, setEmiResult] = useState<{emi: number, totalPayment: number, totalInterest: number} | null>(null);

  // CAGR Calculator State
  const [cagrInitial, setCagrInitial] = useState("");
  const [cagrFinal, setCagrFinal] = useState("");
  const [cagrYears, setCagrYears] = useState("");
  const [cagrResult, setCagrResult] = useState<number | null>(null);

  // Lumpsum Calculator State
  const [lumpsumAmount, setLumpsumAmount] = useState("");
  const [lumpsumRate, setLumpsumRate] = useState("");
  const [lumpsumYears, setLumpsumYears] = useState("");
  const [lumpsumResult, setLumpsumResult] = useState<{maturityAmount: number, gains: number} | null>(null);

  // FD Calculator State
  const [fdPrincipal, setFdPrincipal] = useState("");
  const [fdRate, setFdRate] = useState("");
  const [fdYears, setFdYears] = useState("");
  const [fdCompounding, setFdCompounding] = useState("4"); // Quarterly
  const [fdResult, setFdResult] = useState<{maturityAmount: number, interest: number} | null>(null);

  // PPF Calculator State
  const [ppfAmount, setPpfAmount] = useState("");
  const [ppfYears, setPpfYears] = useState("15");
  const [ppfResult, setPpfResult] = useState<{maturityAmount: number, invested: number, interest: number} | null>(null);

  // Retirement Calculator State
  const [retirementAge, setRetirementAge] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflationRate, setInflationRate] = useState("6");
  const [retirementResult, setRetirementResult] = useState<{corpusNeeded: number, monthlySIP: number} | null>(null);

  // Tax Calculator State
  const [taxIncome, setTaxIncome] = useState("");
  const [taxDeductions, setTaxDeductions] = useState("");
  const [taxRegime, setTaxRegime] = useState("old");
  const [taxResult, setTaxResult] = useState<{taxableIncome: number, tax: number, netIncome: number} | null>(null);

  // IRR Calculator State
  const [irrCashFlows, setIrrCashFlows] = useState("");
  const [irrResult, setIrrResult] = useState<number | null>(null);

  // SIP Calculator
  const calculateSIP = () => {
    const monthlyAmount = parseFloat(sipAmount);
    const annualRate = parseFloat(sipRate);
    const years = parseFloat(sipYears);
    
    if (!monthlyAmount || !annualRate || !years) {
      toast.error("Please fill all SIP calculator fields");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = monthlyAmount * months;
    const gains = maturityAmount - invested;

    setSipResult({ maturityAmount, invested, gains });
    toast.success("SIP calculation completed!");
  };

  // EMI Calculator
  const calculateEMI = () => {
    const principal = parseFloat(emiPrincipal);
    const annualRate = parseFloat(emiRate);
    const years = parseFloat(emiTenure);
    
    if (!principal || !annualRate || !years) {
      toast.error("Please fill all EMI calculator fields");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setEmiResult({ emi, totalPayment, totalInterest });
    toast.success("EMI calculation completed!");
  };

  // CAGR Calculator
  const calculateCAGR = () => {
    const initial = parseFloat(cagrInitial);
    const final = parseFloat(cagrFinal);
    const years = parseFloat(cagrYears);
    
    if (!initial || !final || !years) {
      toast.error("Please fill all CAGR calculator fields");
      return;
    }

    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    setCagrResult(cagr);
    toast.success("CAGR calculation completed!");
  };

  // Lumpsum Calculator
  const calculateLumpsum = () => {
    const amount = parseFloat(lumpsumAmount);
    const rate = parseFloat(lumpsumRate);
    const years = parseFloat(lumpsumYears);
    
    if (!amount || !rate || !years) {
      toast.error("Please fill all lumpsum calculator fields");
      return;
    }

    const maturityAmount = amount * Math.pow(1 + rate / 100, years);
    const gains = maturityAmount - amount;

    setLumpsumResult({ maturityAmount, gains });
    toast.success("Lumpsum calculation completed!");
  };

  // FD Calculator
  const calculateFD = () => {
    const principal = parseFloat(fdPrincipal);
    const rate = parseFloat(fdRate);
    const years = parseFloat(fdYears);
    const compounding = parseFloat(fdCompounding);
    
    if (!principal || !rate || !years) {
      toast.error("Please fill all FD calculator fields");
      return;
    }

    const maturityAmount = principal * Math.pow(1 + (rate / 100) / compounding, compounding * years);
    const interest = maturityAmount - principal;

    setFdResult({ maturityAmount, interest });
    toast.success("FD calculation completed!");
  };

  // PPF Calculator
  const calculatePPF = () => {
    const annualAmount = parseFloat(ppfAmount);
    const years = parseFloat(ppfYears);
    
    if (!annualAmount || !years) {
      toast.error("Please fill all PPF calculator fields");
      return;
    }

    const rate = 7.1; // Current PPF rate
    let maturityAmount = 0;
    
    for (let i = 1; i <= years; i++) {
      maturityAmount = (maturityAmount + annualAmount) * (1 + rate / 100);
    }
    
    const invested = annualAmount * years;
    const interest = maturityAmount - invested;

    setPpfResult({ maturityAmount, invested, interest });
    toast.success("PPF calculation completed!");
  };

  // Retirement Calculator
  const calculateRetirement = () => {
    const retAge = parseFloat(retirementAge);
    const curAge = parseFloat(currentAge);
    const expenses = parseFloat(monthlyExpenses);
    const inflation = parseFloat(inflationRate);
    
    if (!retAge || !curAge || !expenses || !inflation) {
      toast.error("Please fill all retirement calculator fields");
      return;
    }

    const yearsToRetirement = retAge - curAge;
    const futureExpenses = expenses * Math.pow(1 + inflation / 100, yearsToRetirement);
    const corpusNeeded = futureExpenses * 12 * 25; // 25x annual expenses rule
    
    // Assuming 12% return on SIP
    const monthlyRate = 12 / 12 / 100;
    const months = yearsToRetirement * 12;
    const monthlySIP = corpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    setRetirementResult({ corpusNeeded, monthlySIP });
    toast.success("Retirement calculation completed!");
  };

  // Tax Calculator
  const calculateTax = () => {
    const income = parseFloat(taxIncome);
    const deductions = parseFloat(taxDeductions) || 0;
    
    if (!income) {
      toast.error("Please enter your annual income");
      return;
    }

    const taxableIncome = Math.max(0, income - deductions);
    let tax = 0;

    if (taxRegime === "old") {
      // Old tax regime slabs
      if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    } else {
      // New tax regime slabs
      if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 300000) * 0.05;
      if (taxableIncome > 600000) tax += Math.min(taxableIncome - 600000, 300000) * 0.10;
      if (taxableIncome > 900000) tax += Math.min(taxableIncome - 900000, 300000) * 0.15;
      if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    }

    // Add 4% cess
    tax = tax * 1.04;
    const netIncome = income - tax;

    setTaxResult({ taxableIncome, tax, netIncome });
    toast.success("Tax calculation completed!");
  };

  // IRR Calculator
  const calculateIRR = () => {
    try {
      const cashFlows = irrCashFlows.split(',').map(cf => parseFloat(cf.trim()));
      
      if (cashFlows.length < 2) {
        toast.error("Please enter at least 2 cash flows separated by commas");
        return;
      }

      if (cashFlows.some(cf => isNaN(cf))) {
        toast.error("Please enter valid numbers for cash flows");
        return;
      }

      // Newton-Raphson method for IRR calculation
      let rate = 0.1; // Initial guess
      let iteration = 0;
      const maxIterations = 100;
      const tolerance = 0.0001;

      while (iteration < maxIterations) {
        let npv = 0;
        let dnpv = 0;

        for (let i = 0; i < cashFlows.length; i++) {
          npv += cashFlows[i] / Math.pow(1 + rate, i);
          if (i > 0) {
            dnpv -= i * cashFlows[i] / Math.pow(1 + rate, i + 1);
          }
        }

        if (Math.abs(npv) < tolerance) break;
        
        const newRate = rate - npv / dnpv;
        if (Math.abs(newRate - rate) < tolerance) break;
        
        rate = newRate;
        iteration++;
      }

      if (iteration >= maxIterations) {
        toast.error("IRR calculation did not converge. Please check your cash flows.");
        return;
      }

      setIrrResult(rate * 100);
      toast.success("IRR calculation completed!");
    } catch (error) {
      toast.error("Error calculating IRR. Please check your input format.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Calculators</h1>
          <p className="text-muted-foreground mt-1">Comprehensive tools for financial planning and analysis</p>
        </div>

        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="sip">SIP</TabsTrigger>
            <TabsTrigger value="emi">EMI</TabsTrigger>
            <TabsTrigger value="cagr">CAGR</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
            <TabsTrigger value="fd">FD</TabsTrigger>
            <TabsTrigger value="ppf">PPF</TabsTrigger>
            <TabsTrigger value="retirement">Retirement</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="irr">IRR</TabsTrigger>
          </TabsList>

          {/* SIP Calculator */}
          <TabsContent value="sip" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  SIP Calculator
                </CardTitle>
                <CardDescription>Calculate returns on Systematic Investment Plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sip-amount">Monthly Investment (₹)</Label>
                      <Input
                        id="sip-amount"
                        type="number"
                        value={sipAmount}
                        onChange={(e) => setSipAmount(e.target.value)}
                        placeholder="e.g., 5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sip-rate">Expected Annual Return (%)</Label>
                      <Input
                        id="sip-rate"
                        type="number"
                        step="0.1"
                        value={sipRate}
                        onChange={(e) => setSipRate(e.target.value)}
                        placeholder="e.g., 12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sip-years">Investment Period (Years)</Label>
                      <Input
                        id="sip-years"
                        type="number"
                        value={sipYears}
                        onChange={(e) => setSipYears(e.target.value)}
                        placeholder="e.g., 10"
                      />
                    </div>
                    <Button onClick={calculateSIP} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate SIP
                    </Button>
                  </div>
                  
                  {sipResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Maturity Amount</p>
                          <p className="text-2xl font-bold text-primary">₹{sipResult.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Invested</p>
                          <p className="text-lg font-semibold">₹{sipResult.invested.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Gains</p>
                          <p className="text-lg font-semibold text-success">₹{sipResult.gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EMI Calculator */}
          <TabsContent value="emi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>Calculate Equated Monthly Installments for loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emi-principal">Loan Amount (₹)</Label>
                      <Input
                        id="emi-principal"
                        type="number"
                        value={emiPrincipal}
                        onChange={(e) => setEmiPrincipal(e.target.value)}
                        placeholder="e.g., 1000000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emi-rate">Interest Rate (% per annum)</Label>
                      <Input
                        id="emi-rate"
                        type="number"
                        step="0.1"
                        value={emiRate}
                        onChange={(e) => setEmiRate(e.target.value)}
                        placeholder="e.g., 8.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emi-tenure">Loan Tenure (Years)</Label>
                      <Input
                        id="emi-tenure"
                        type="number"
                        value={emiTenure}
                        onChange={(e) => setEmiTenure(e.target.value)}
                        placeholder="e.g., 20"
                      />
                    </div>
                    <Button onClick={calculateEMI} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate EMI
                    </Button>
                  </div>
                  
                  {emiResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Monthly EMI</p>
                          <p className="text-2xl font-bold text-primary">₹{emiResult.emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Payment</p>
                          <p className="text-lg font-semibold">₹{emiResult.totalPayment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Interest</p>
                          <p className="text-lg font-semibold text-destructive">₹{emiResult.totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CAGR Calculator */}
          <TabsContent value="cagr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  CAGR Calculator
                </CardTitle>
                <CardDescription>Calculate Compound Annual Growth Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cagr-initial">Initial Investment (₹)</Label>
                      <Input
                        id="cagr-initial"
                        type="number"
                        value={cagrInitial}
                        onChange={(e) => setCagrInitial(e.target.value)}
                        placeholder="e.g., 100000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cagr-final">Final Value (₹)</Label>
                      <Input
                        id="cagr-final"
                        type="number"
                        value={cagrFinal}
                        onChange={(e) => setCagrFinal(e.target.value)}
                        placeholder="e.g., 200000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cagr-years">Investment Period (Years)</Label>
                      <Input
                        id="cagr-years"
                        type="number"
                        value={cagrYears}
                        onChange={(e) => setCagrYears(e.target.value)}
                        placeholder="e.g., 5"
                      />
                    </div>
                    <Button onClick={calculateCAGR} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate CAGR
                    </Button>
                  </div>
                  
                  {cagrResult !== null && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Compound Annual Growth Rate</p>
                        <p className="text-3xl font-bold text-primary">{cagrResult.toFixed(2)}%</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Your investment grew at an average rate of {cagrResult.toFixed(2)}% per year.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lumpsum Calculator */}
          <TabsContent value="lumpsum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Lumpsum Calculator
                </CardTitle>
                <CardDescription>Calculate returns on one-time investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lumpsum-amount">Investment Amount (₹)</Label>
                      <Input
                        id="lumpsum-amount"
                        type="number"
                        value={lumpsumAmount}
                        onChange={(e) => setLumpsumAmount(e.target.value)}
                        placeholder="e.g., 100000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lumpsum-rate">Expected Annual Return (%)</Label>
                      <Input
                        id="lumpsum-rate"
                        type="number"
                        step="0.1"
                        value={lumpsumRate}
                        onChange={(e) => setLumpsumRate(e.target.value)}
                        placeholder="e.g., 12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lumpsum-years">Investment Period (Years)</Label>
                      <Input
                        id="lumpsum-years"
                        type="number"
                        value={lumpsumYears}
                        onChange={(e) => setLumpsumYears(e.target.value)}
                        placeholder="e.g., 10"
                      />
                    </div>
                    <Button onClick={calculateLumpsum} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Returns
                    </Button>
                  </div>
                  
                  {lumpsumResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Maturity Amount</p>
                          <p className="text-2xl font-bold text-primary">₹{lumpsumResult.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Gains</p>
                          <p className="text-lg font-semibold text-success">₹{lumpsumResult.gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FD Calculator */}
          <TabsContent value="fd" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fixed Deposit Calculator</CardTitle>
                <CardDescription>Calculate FD maturity amount with compound interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fd-principal">Principal Amount (₹)</Label>
                      <Input
                        id="fd-principal"
                        type="number"
                        value={fdPrincipal}
                        onChange={(e) => setFdPrincipal(e.target.value)}
                        placeholder="e.g., 100000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fd-rate">Interest Rate (% per annum)</Label>
                      <Input
                        id="fd-rate"
                        type="number"
                        step="0.1"
                        value={fdRate}
                        onChange={(e) => setFdRate(e.target.value)}
                        placeholder="e.g., 6.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fd-years">Tenure (Years)</Label>
                      <Input
                        id="fd-years"
                        type="number"
                        value={fdYears}
                        onChange={(e) => setFdYears(e.target.value)}
                        placeholder="e.g., 5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fd-compounding">Compounding Frequency</Label>
                      <select
                        id="fd-compounding"
                        value={fdCompounding}
                        onChange={(e) => setFdCompounding(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="1">Annually</option>
                        <option value="2">Half-yearly</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                      </select>
                    </div>
                    <Button onClick={calculateFD} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate FD
                    </Button>
                  </div>
                  
                  {fdResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Maturity Amount</p>
                          <p className="text-2xl font-bold text-primary">₹{fdResult.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Interest Earned</p>
                          <p className="text-lg font-semibold text-success">₹{fdResult.interest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PPF Calculator */}
          <TabsContent value="ppf" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PPF Calculator</CardTitle>
                <CardDescription>Calculate Public Provident Fund maturity (Current rate: 7.1%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ppf-amount">Annual Investment (₹)</Label>
                      <Input
                        id="ppf-amount"
                        type="number"
                        value={ppfAmount}
                        onChange={(e) => setPpfAmount(e.target.value)}
                        placeholder="e.g., 150000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Maximum: ₹1,50,000 per year</p>
                    </div>
                    <div>
                      <Label htmlFor="ppf-years">Investment Period (Years)</Label>
                      <Input
                        id="ppf-years"
                        type="number"
                        value={ppfYears}
                        onChange={(e) => setPpfYears(e.target.value)}
                        placeholder="15"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum: 15 years</p>
                    </div>
                    <Button onClick={calculatePPF} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate PPF
                    </Button>
                  </div>
                  
                  {ppfResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Maturity Amount</p>
                          <p className="text-2xl font-bold text-primary">₹{ppfResult.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Invested</p>
                          <p className="text-lg font-semibold">₹{ppfResult.invested.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Interest Earned</p>
                          <p className="text-lg font-semibold text-success">₹{ppfResult.interest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Retirement Calculator */}
          <TabsContent value="retirement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Retirement Calculator
                </CardTitle>
                <CardDescription>Plan your retirement corpus and monthly SIP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-age">Current Age</Label>
                      <Input
                        id="current-age"
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retirement-age">Retirement Age</Label>
                      <Input
                        id="retirement-age"
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="e.g., 60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-expenses">Current Monthly Expenses (₹)</Label>
                      <Input
                        id="monthly-expenses"
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                        placeholder="e.g., 50000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inflation-rate">Expected Inflation (%)</Label>
                      <Input
                        id="inflation-rate"
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        placeholder="6"
                      />
                    </div>
                    <Button onClick={calculateRetirement} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Retirement
                    </Button>
                  </div>
                  
                  {retirementResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Corpus Needed</p>
                          <p className="text-2xl font-bold text-primary">₹{(retirementResult.corpusNeeded / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div className="p-4 bg-warning/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Monthly SIP Required</p>
                          <p className="text-lg font-semibold text-warning">₹{retirementResult.monthlySIP.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Calculator */}
          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Tax Calculator</CardTitle>
                <CardDescription>Calculate tax liability for FY 2023-24</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tax-income">Annual Income (₹)</Label>
                      <Input
                        id="tax-income"
                        type="number"
                        value={taxIncome}
                        onChange={(e) => setTaxIncome(e.target.value)}
                        placeholder="e.g., 1200000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tax-deductions">Total Deductions (₹)</Label>
                      <Input
                        id="tax-deductions"
                        type="number"
                        value={taxDeductions}
                        onChange={(e) => setTaxDeductions(e.target.value)}
                        placeholder="e.g., 150000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tax-regime">Tax Regime</Label>
                      <select
                        id="tax-regime"
                        value={taxRegime}
                        onChange={(e) => setTaxRegime(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="old">Old Tax Regime</option>
                        <option value="new">New Tax Regime</option>
                      </select>
                    </div>
                    <Button onClick={calculateTax} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Tax
                    </Button>
                  </div>
                  
                  {taxResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Taxable Income</p>
                          <p className="text-lg font-semibold">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Tax Liability</p>
                          <p className="text-2xl font-bold text-destructive">₹{taxResult.tax.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Net Income</p>
                          <p className="text-lg font-semibold text-success">₹{taxResult.netIncome.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IRR Calculator */}
          <TabsContent value="irr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>IRR Calculator</CardTitle>
                <CardDescription>Calculate Internal Rate of Return for cash flows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="irr-cashflows">Cash Flows (comma separated)</Label>
                      <Input
                        id="irr-cashflows"
                        type="text"
                        value={irrCashFlows}
                        onChange={(e) => setIrrCashFlows(e.target.value)}
                        placeholder="e.g., -100000, 25000, 30000, 35000, 40000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter cash flows separated by commas. First value is typically negative (initial investment).
                      </p>
                    </div>
                    <Button onClick={calculateIRR} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate IRR
                    </Button>
                  </div>
                  
                  {irrResult !== null && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Results</h4>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Internal Rate of Return</p>
                        <p className="text-3xl font-bold text-primary">{irrResult.toFixed(2)}%</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>This is the discount rate that makes the NPV of cash flows equal to zero.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Tools;
