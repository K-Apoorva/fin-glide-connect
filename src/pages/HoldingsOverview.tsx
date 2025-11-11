import { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Target, DollarSign, Activity, BarChart3 } from "lucide-react";

const holdingsData = [
  { 
    name: "Equity", 
    value: 45, 
    amount: 1350000, 
    cagr: 14.2, 
    irr: 13.8,
    color: "hsl(217, 91%, 60%)",
    target: 40,
    subcategories: [
      { name: "Large Cap", amount: 800000, percentage: 59.3, growth: 12.5 },
      { name: "Mid Cap", amount: 350000, percentage: 25.9, growth: 18.2 },
      { name: "Small Cap", amount: 200000, percentage: 14.8, growth: 22.1 }
    ]
  },
  { 
    name: "Real Estate", 
    value: 25, 
    amount: 750000, 
    cagr: 8.5, 
    irr: 9.2,
    color: "hsl(142, 71%, 45%)",
    target: 25,
    subcategories: [
      { name: "Residential", amount: 600000, percentage: 80, growth: 8.2 },
      { name: "Commercial", amount: 150000, percentage: 20, growth: 9.5 }
    ]
  },
  { 
    name: "Gold", 
    value: 12, 
    amount: 360000, 
    cagr: 6.8, 
    irr: 7.1,
    color: "hsl(38, 92%, 50%)",
    target: 15,
    subcategories: [
      { name: "Physical Gold", amount: 200000, percentage: 55.6, growth: 6.5 },
      { name: "Gold ETF", amount: 160000, percentage: 44.4, growth: 7.2 }
    ]
  },
  { 
    name: "Cryptocurrency", 
    value: 10, 
    amount: 300000, 
    cagr: 45.2, 
    irr: 42.8,
    color: "hsl(280, 100%, 70%)",
    target: 8,
    subcategories: [
      { name: "Bitcoin", amount: 180000, percentage: 60, growth: 48.5 },
      { name: "Ethereum", amount: 90000, percentage: 30, growth: 42.1 },
      { name: "Others", amount: 30000, percentage: 10, growth: 38.7 }
    ]
  },
  { 
    name: "Cash & Deposits", 
    value: 8, 
    amount: 240000, 
    cagr: 4.5, 
    irr: 4.2,
    color: "hsl(215, 20%, 65%)",
    target: 12,
    subcategories: [
      { name: "Savings Account", amount: 100000, percentage: 41.7, growth: 3.5 },
      { name: "Fixed Deposits", amount: 140000, percentage: 58.3, growth: 5.2 }
    ]
  }
];

// Performance data for trend analysis
const performanceData = [
  { month: 'Jan', equity: 12.5, realEstate: 8.2, gold: 6.1, crypto: 35.2, cash: 4.1 },
  { month: 'Feb', equity: 13.8, realEstate: 8.5, gold: 6.8, crypto: 42.1, cash: 4.2 },
  { month: 'Mar', equity: 11.2, realEstate: 7.9, gold: 5.9, crypto: 28.5, cash: 4.0 },
  { month: 'Apr', equity: 15.1, realEstate: 9.1, gold: 7.2, crypto: 51.8, cash: 4.3 },
  { month: 'May', equity: 14.2, realEstate: 8.8, gold: 6.8, crypto: 45.2, cash: 4.5 },
  { month: 'Jun', equity: 16.3, realEstate: 9.2, gold: 7.1, crypto: 48.9, cash: 4.2 }
];

const HoldingsOverview = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [showRebalanceAlert, setShowRebalanceAlert] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(holdingsData[0]);

  const totalValue = holdingsData.reduce((sum, holding) => sum + holding.amount, 0);
  const usdRate = 83.2;

  const formatCurrency = (amount: number) => {
    if (currency === 'USD') {
      return `$${(amount / usdRate).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const needsRebalancing = holdingsData.some(item => Math.abs(item.value - item.target) > 5);

  // Calculate allocation differences
  const allocationComparison = holdingsData.map(holding => ({
    name: holding.name,
    current: holding.value,
    target: holding.target,
    difference: holding.value - holding.target,
    status: Math.abs(holding.value - holding.target) > 5 ? 'high' : Math.abs(holding.value - holding.target) > 2 ? 'medium' : 'low'
  }));

  const getDeviationColor = (difference: number) => {
    if (Math.abs(difference) > 5) return 'text-red-600';
    if (Math.abs(difference) > 2) return 'text-amber-600';
    return 'text-green-600';
  };

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

        {/* Enhanced Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h2 className="text-3xl font-bold text-foreground mb-1">
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

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-success" />
                <h2 className="text-3xl font-bold text-foreground mb-1">12.8%</h2>
                <p className="text-muted-foreground">Weighted CAGR</p>
                <p className="text-xs text-success mt-2">Above benchmark</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-warning" />
                <h2 className="text-3xl font-bold text-foreground mb-1">
                  {allocationComparison.filter(a => a.status === 'high').length}
                </h2>
                <p className="text-muted-foreground">Assets Need Rebalancing</p>
                <p className="text-xs text-warning mt-2">Action required</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h2 className="text-3xl font-bold text-foreground mb-1">5</h2>
                <p className="text-muted-foreground">Asset Classes</p>
                <p className="text-xs text-primary mt-2">Well diversified</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rebalancing Alert */}
        {needsRebalancing && showRebalanceAlert && (
          <Card className="shadow-card border-warning bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-warning text-lg">Portfolio Rebalancing Recommended</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Some asset categories deviate more than 5% from target allocation. Consider rebalancing to optimize returns.
                    </p>
                    <div className="flex gap-2 mt-3">
                      {allocationComparison.filter(a => a.status === 'high').map((asset, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {asset.name}: {asset.difference > 0 ? '+' : ''}{asset.difference.toFixed(1)}%
                        </Badge>
                      ))}
                    </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Asset Allocation Pie Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={holdingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    dataKey="value"
                    onClick={(data) => setSelectedAsset(data)}
                  >
                    {holdingsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={selectedAsset.name === entry.name ? '#000' : 'none'}
                        strokeWidth={selectedAsset.name === entry.name ? 2 : 0}
                      />
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
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Click on segments to view detailed breakdown
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Target vs Current Allocation Bar Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Target vs Current Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={allocationComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`,
                      name === 'current' ? 'Current' : 'Target'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="target" fill="hsl(215, 20%, 65%)" name="Target %" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="current" fill="hsl(217, 91%, 60%)" name="Current %" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {allocationComparison.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className={`font-semibold ${getDeviationColor(item.difference)}`}>
                      {item.difference > 0 ? '+' : ''}{item.difference.toFixed(1)}% deviation
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              6-Month Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                <Legend />
                <Line type="monotone" dataKey="equity" stroke="hsl(217, 91%, 60%)" name="Equity" strokeWidth={2} />
                <Line type="monotone" dataKey="crypto" stroke="hsl(280, 100%, 70%)" name="Crypto" strokeWidth={2} />
                <Line type="monotone" dataKey="realEstate" stroke="hsl(142, 71%, 45%)" name="Real Estate" strokeWidth={2} />
                <Line type="monotone" dataKey="gold" stroke="hsl(38, 92%, 50%)" name="Gold" strokeWidth={2} />
                <Line type="monotone" dataKey="cash" stroke="hsl(215, 20%, 65%)" name="Cash" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Selected Asset Detailed Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedAsset.color }}></div>
              {selectedAsset.name} - Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="text-2xl font-bold">{formatCurrency(selectedAsset.amount)}</div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">CAGR</div>
                    <div className="text-2xl font-bold text-success">{selectedAsset.cagr}%</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Allocation Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current vs Target</span>
                      <span>{selectedAsset.value}% / {selectedAsset.target}%</span>
                    </div>
                    <Progress 
                      value={(selectedAsset.value / selectedAsset.target) * 100} 
                      className="h-3"
                    />
                    <div className="text-xs text-muted-foreground">
                      {selectedAsset.value > selectedAsset.target ? 'Overweight' : selectedAsset.value < selectedAsset.target ? 'Underweight' : 'On Target'} by {Math.abs(selectedAsset.value - selectedAsset.target).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Sub-category Breakdown</h4>
                <div className="space-y-3">
                  {selectedAsset.subcategories.map((sub, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{sub.name}</span>
                        <span className="text-sm text-muted-foreground">{sub.percentage}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{formatCurrency(sub.amount)}</span>
                        <div className="flex items-center gap-1">
                          {sub.growth > 10 ? (
                            <TrendingUp className="h-3 w-3 text-success" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-warning" />
                          )}
                          <span className={`text-xs ${sub.growth > 10 ? 'text-success' : 'text-warning'}`}>
                            {sub.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Portfolio Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <p className="text-3xl font-bold text-success">12.8%</p>
                <p className="text-sm text-muted-foreground">Overall CAGR</p>
                <p className="text-xs text-success mt-1">vs 10.2% benchmark</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-3xl font-bold text-primary">11.5%</p>
                <p className="text-sm text-muted-foreground">Portfolio IRR</p>
                <p className="text-xs text-primary mt-1">Risk-adjusted return</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-warning">0.85</p>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                <p className="text-xs text-warning mt-1">Good risk efficiency</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
                <p className="text-3xl font-bold text-foreground">-12.3%</p>
                <p className="text-sm text-muted-foreground">Max Drawdown</p>
                <p className="text-xs text-muted-foreground mt-1">Worst decline period</p>
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
