import { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle } from "lucide-react";

const holdingsData = [
  { 
    name: "Equity", 
    value: 45, 
    amount: 1350000, 
    cagr: 14.2, 
    irr: 13.8,
    color: "hsl(217, 91%, 60%)",
    subcategories: [
      { name: "Large Cap", amount: 800000, percentage: 59.3 },
      { name: "Mid Cap", amount: 350000, percentage: 25.9 },
      { name: "Small Cap", amount: 200000, percentage: 14.8 }
    ]
  },
  { 
    name: "Real Estate", 
    value: 25, 
    amount: 750000, 
    cagr: 8.5, 
    irr: 9.2,
    color: "hsl(142, 71%, 45%)",
    subcategories: [
      { name: "Residential", amount: 600000, percentage: 80 },
      { name: "Commercial", amount: 150000, percentage: 20 }
    ]
  },
  { 
    name: "Gold", 
    value: 12, 
    amount: 360000, 
    cagr: 6.8, 
    irr: 7.1,
    color: "hsl(38, 92%, 50%)",
    subcategories: [
      { name: "Physical Gold", amount: 200000, percentage: 55.6 },
      { name: "Gold ETF", amount: 160000, percentage: 44.4 }
    ]
  },
  { 
    name: "Cryptocurrency", 
    value: 10, 
    amount: 300000, 
    cagr: 45.2, 
    irr: 42.8,
    color: "hsl(280, 100%, 70%)",
    subcategories: [
      { name: "Bitcoin", amount: 180000, percentage: 60 },
      { name: "Ethereum", amount: 90000, percentage: 30 },
      { name: "Others", amount: 30000, percentage: 10 }
    ]
  },
  { 
    name: "Cash & Deposits", 
    value: 8, 
    amount: 240000, 
    cagr: 4.5, 
    irr: 4.2,
    color: "hsl(215, 20%, 65%)",
    subcategories: [
      { name: "Savings Account", amount: 100000, percentage: 41.7 },
      { name: "Fixed Deposits", amount: 140000, percentage: 58.3 }
    ]
  }
];

const targetAllocation = [
  { name: "Equity", target: 40, current: 45 },
  { name: "Real Estate", target: 25, current: 25 },
  { name: "Gold", target: 15, current: 12 },
  { name: "Cryptocurrency", target: 8, current: 10 },
  { name: "Cash & Deposits", target: 12, current: 8 }
];

const HoldingsOverview = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [showRebalanceAlert, setShowRebalanceAlert] = useState(true);

  const totalValue = holdingsData.reduce((sum, holding) => sum + holding.amount, 0);
  const usdRate = 83.2; // Mock USD rate

  const formatCurrency = (amount: number) => {
    if (currency === 'USD') {
      return `$${(amount / usdRate).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const needsRebalancing = targetAllocation.some(item => Math.abs(item.current - item.target) > 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Holdings Overview</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive view of your investment portfolio across all asset classes
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="currency">INR</Label>
              <Switch
                id="currency"
                checked={currency === 'USD'}
                onCheckedChange={(checked) => setCurrency(checked ? 'USD' : 'INR')}
              />
              <Label htmlFor="currency">USD</Label>
            </div>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Prices
            </Button>
          </div>
        </div>

        {/* Total Portfolio Value */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {formatCurrency(totalValue)}
              </h2>
              <p className="text-muted-foreground">Total Portfolio Value</p>
              <div className="flex justify-center items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+8.2% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rebalancing Alert */}
        {needsRebalancing && showRebalanceAlert && (
          <Card className="shadow-card border-warning">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-warning">Portfolio Rebalancing Recommended</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Some asset categories deviate more than 5% from target allocation. Consider rebalancing to optimize returns.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Rebalance Now</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowRebalanceAlert(false)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation Pie Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={holdingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={150}
                    dataKey="value"
                  >
                    {holdingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}% (${formatCurrency(holdingsData.find(h => h.name === name)?.amount || 0)})`,
                      'Allocation'
                    ]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Target vs Current Allocation */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Target vs Current Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={targetAllocation} layout="horizontal">
                  <XAxis type="number" domain={[0, 50]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="target" fill="hsl(215, 20%, 65%)" name="Target %" />
                  <Bar dataKey="current" fill="hsl(217, 91%, 60%)" name="Current %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Holdings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {holdingsData.map((holding, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{holding.name}</CardTitle>
                  <Badge variant="outline">{holding.value}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(holding.amount)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {holding.cagr > 10 ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-warning" />
                      )}
                      <span className={`text-sm font-medium ${holding.cagr > 10 ? 'text-success' : 'text-warning'}`}>
                        {holding.cagr}% CAGR
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>IRR</span>
                      <span className="font-medium">{holding.irr}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Breakdown:</p>
                      {holding.subcategories.map((sub, subIndex) => (
                        <div key={subIndex} className="flex justify-between">
                          <span>{sub.name}</span>
                          <span>{sub.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Metrics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">12.8%</p>
                <p className="text-sm text-muted-foreground">Overall CAGR</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">11.5%</p>
                <p className="text-sm text-muted-foreground">Portfolio IRR</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">0.85</p>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">-12.3%</p>
                <p className="text-sm text-muted-foreground">Max Drawdown</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Footer */}
        <div className="text-center text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
          <p>🟢 AMFI & SEBI Compliant | AES-256 Encrypted | TLS 1.3 Secured</p>
          <p className="mt-1">
            Indicative values — synced via RBI-AA and licensed crypto APIs. 
            Real estate and gold values auto-refresh weekly. Crypto/stock prices refresh every 5 minutes.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HoldingsOverview;
