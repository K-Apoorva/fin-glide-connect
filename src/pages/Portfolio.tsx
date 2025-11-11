import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, TrendingUp, AlertCircle, Info, Calculator, Target, DollarSign } from "lucide-react";
import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Portfolio = () => {
  // Current portfolio values (realistic data)
  const totalPortfolioValue = 2850000; // ₹28.5L
  
  const [currentAllocation] = useState([
    { name: "Equity", value: 52, amount: 1482000, target: 45, color: "hsl(217, 91%, 60%)" },
    { name: "Debt", value: 23, amount: 655500, target: 30, color: "hsl(142, 71%, 45%)" },
    { name: "Real Estate", value: 15, amount: 427500, target: 15, color: "hsl(38, 92%, 50%)" },
    { name: "Gold", value: 7, amount: 199500, target: 8, color: "hsl(45, 93%, 47%)" },
    { name: "Cash", value: 3, amount: 85500, target: 2, color: "hsl(215, 20%, 65%)" }
  ]);

  // Simulator state
  const [simulatorAllocation, setSimulatorAllocation] = useState({
    equity: 45,
    debt: 30,
    realEstate: 15,
    gold: 8,
    cash: 2
  });

  const [simulationResults, setSimulationResults] = useState({
    expectedReturn: 0,
    risk: 0,
    projectedValue: 0,
    rebalancingCost: 0
  });

  // Calculate rebalancing status
  const getRebalancingStatus = () => {
    const deviations = currentAllocation.map(asset => ({
      name: asset.name,
      deviation: Math.abs(asset.value - asset.target),
      status: Math.abs(asset.value - asset.target) > 5 ? 'high' : Math.abs(asset.value - asset.target) > 2 ? 'medium' : 'low'
    }));

    const maxDeviation = Math.max(...deviations.map(d => d.deviation));
    const needsRebalancing = maxDeviation > 5;

    return {
      needsRebalancing,
      maxDeviation,
      deviations,
      status: maxDeviation > 10 ? 'critical' : maxDeviation > 5 ? 'moderate' : 'good'
    };
  };

  const rebalancingStatus = getRebalancingStatus();

  // Simulator calculations
  const calculateSimulation = () => {
    const allocation = simulatorAllocation;
    const total = allocation.equity + allocation.debt + allocation.realEstate + allocation.gold + allocation.cash;
    
    if (total !== 100) {
      toast.error("Total allocation must equal 100%");
      return;
    }

    // Expected returns for each asset class
    const returns = {
      equity: 14.5,
      debt: 7.2,
      realEstate: 9.8,
      gold: 6.5,
      cash: 4.0
    };

    // Risk (volatility) for each asset class
    const risks = {
      equity: 18.5,
      debt: 4.2,
      realEstate: 12.0,
      gold: 15.8,
      cash: 1.0
    };

    // Calculate weighted expected return
    const expectedReturn = (
      (allocation.equity / 100) * returns.equity +
      (allocation.debt / 100) * returns.debt +
      (allocation.realEstate / 100) * returns.realEstate +
      (allocation.gold / 100) * returns.gold +
      (allocation.cash / 100) * returns.cash
    );

    // Calculate portfolio risk (simplified)
    const portfolioRisk = Math.sqrt(
      Math.pow((allocation.equity / 100) * risks.equity, 2) +
      Math.pow((allocation.debt / 100) * risks.debt, 2) +
      Math.pow((allocation.realEstate / 100) * risks.realEstate, 2) +
      Math.pow((allocation.gold / 100) * risks.gold, 2) +
      Math.pow((allocation.cash / 100) * risks.cash, 2)
    );

    // Calculate rebalancing cost (0.5% of amount to be moved)
    let rebalancingCost = 0;
    currentAllocation.forEach(asset => {
      const currentAmount = asset.amount;
      const targetAmount = (allocation[asset.name.toLowerCase()] / 100) * totalPortfolioValue;
      const difference = Math.abs(currentAmount - targetAmount);
      rebalancingCost += difference * 0.005; // 0.5% transaction cost
    });

    // Project value after 5 years
    const projectedValue = totalPortfolioValue * Math.pow(1 + expectedReturn / 100, 5);

    setSimulationResults({
      expectedReturn: Math.round(expectedReturn * 100) / 100,
      risk: Math.round(portfolioRisk * 100) / 100,
      projectedValue: Math.round(projectedValue),
      rebalancingCost: Math.round(rebalancingCost)
    });

    toast.success("Simulation calculated successfully!");
  };

  const handleAllocationChange = (asset: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setSimulatorAllocation(prev => ({
      ...prev,
      [asset]: numValue
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted/50 border-muted';
    }
  };

  const simulatorData = [
    { name: "Equity", value: simulatorAllocation.equity, color: "hsl(217, 91%, 60%)" },
    { name: "Debt", value: simulatorAllocation.debt, color: "hsl(142, 71%, 45%)" },
    { name: "Real Estate", value: simulatorAllocation.realEstate, color: "hsl(38, 92%, 50%)" },
    { name: "Gold", value: simulatorAllocation.gold, color: "hsl(45, 93%, 47%)" },
    { name: "Cash", value: simulatorAllocation.cash, color: "hsl(215, 20%, 65%)" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
          <p className="text-muted-foreground mt-1">Monitor allocation, rebalance, and simulate scenarios</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalPortfolioValue / 100000).toFixed(1)}L</div>
              <p className="text-xs text-success">+8.2% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expected Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8%</div>
              <p className="text-xs text-muted-foreground">Weighted CAGR</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.2%</div>
              <p className="text-xs text-muted-foreground">Portfolio volatility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rebalancing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${rebalancingStatus.status === 'good' ? 'text-success' : rebalancingStatus.status === 'moderate' ? 'text-warning' : 'text-destructive'}`}>
                {rebalancingStatus.status.toUpperCase()}
              </div>
              <p className="text-xs text-muted-foreground">Max deviation: {rebalancingStatus.maxDeviation.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Portfolio</TabsTrigger>
            <TabsTrigger value="simulator">Allocation Simulator</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {/* Rebalancing Status */}
            <Card className={`border-l-4 ${rebalancingStatus.needsRebalancing ? 'border-l-warning' : 'border-l-success'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Rebalancing Status
                  </CardTitle>
                  <Badge variant={rebalancingStatus.needsRebalancing ? "destructive" : "default"}>
                    {rebalancingStatus.needsRebalancing ? "Action Required" : "Well Balanced"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rebalancingStatus.deviations.map((deviation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{deviation.name}</span>
                        <Badge variant={deviation.status === 'high' ? 'destructive' : deviation.status === 'medium' ? 'secondary' : 'outline'}>
                          {deviation.deviation.toFixed(1)}% deviation
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current: {currentAllocation.find(a => a.name === deviation.name)?.value}% | 
                        Target: {currentAllocation.find(a => a.name === deviation.name)?.target}%
                      </div>
                    </div>
                  ))}
                </div>
                {rebalancingStatus.needsRebalancing && (
                  <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-sm text-warning-foreground">
                      <AlertCircle className="h-4 w-4 inline mr-2" />
                      Your portfolio has drifted from target allocation. Consider rebalancing to optimize returns and manage risk.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Allocation Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Allocation</CardTitle>
                  <CardDescription>Your actual portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie
                        data={currentAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                      >
                        {currentAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Breakdown</CardTitle>
                  <CardDescription>Value and allocation details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentAllocation.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: asset.color }}></div>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{(asset.amount / 100000).toFixed(1)}L</div>
                          <div className="text-sm text-muted-foreground">{asset.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Allocation Simulator
                </CardTitle>
                <CardDescription>
                  Simulate different allocation scenarios and see projected outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Controls */}
                  <div className="space-y-6">
                    <h4 className="font-semibold">Adjust Allocation (%)</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="equity">Equity</Label>
                        <Input
                          id="equity"
                          type="number"
                          min="0"
                          max="100"
                          value={simulatorAllocation.equity}
                          onChange={(e) => handleAllocationChange('equity', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="debt">Debt</Label>
                        <Input
                          id="debt"
                          type="number"
                          min="0"
                          max="100"
                          value={simulatorAllocation.debt}
                          onChange={(e) => handleAllocationChange('debt', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="realEstate">Real Estate</Label>
                        <Input
                          id="realEstate"
                          type="number"
                          min="0"
                          max="100"
                          value={simulatorAllocation.realEstate}
                          onChange={(e) => handleAllocationChange('realEstate', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gold">Gold</Label>
                        <Input
                          id="gold"
                          type="number"
                          min="0"
                          max="100"
                          value={simulatorAllocation.gold}
                          onChange={(e) => handleAllocationChange('gold', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cash">Cash</Label>
                        <Input
                          id="cash"
                          type="number"
                          min="0"
                          max="100"
                          value={simulatorAllocation.cash}
                          onChange={(e) => handleAllocationChange('cash', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total:</span>
                        <span className={`font-bold ${Object.values(simulatorAllocation).reduce((a, b) => a + b, 0) === 100 ? 'text-success' : 'text-destructive'}`}>
                          {Object.values(simulatorAllocation).reduce((a, b) => a + b, 0)}%
                        </span>
                      </div>
                      <Button onClick={calculateSimulation} className="w-full">
                        Calculate Scenario
                      </Button>
                    </div>
                  </div>

                  {/* Visualization and Results */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Simulated Allocation</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPie>
                          <Pie
                            data={simulatorData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={100}
                            dataKey="value"
                          >
                            {simulatorData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>

                    {simulationResults.expectedReturn > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Simulation Results</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm text-muted-foreground">Expected Return</div>
                            <div className="text-lg font-bold text-primary">{simulationResults.expectedReturn}%</div>
                          </div>
                          <div className="p-3 bg-warning/10 rounded-lg">
                            <div className="text-sm text-muted-foreground">Risk Level</div>
                            <div className="text-lg font-bold text-warning">{simulationResults.risk}%</div>
                          </div>
                          <div className="p-3 bg-success/10 rounded-lg">
                            <div className="text-sm text-muted-foreground">5-Year Value</div>
                            <div className="text-lg font-bold text-success">₹{(simulationResults.projectedValue / 100000).toFixed(1)}L</div>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="text-sm text-muted-foreground">Rebalancing Cost</div>
                            <div className="text-lg font-bold">₹{simulationResults.rebalancingCost.toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-900 mb-2">Scenario Analysis</h5>
                          <div className="text-sm text-blue-800 space-y-1">
                            <p>• Expected annual return: {simulationResults.expectedReturn}% CAGR</p>
                            <p>• Portfolio volatility: {simulationResults.risk}% (risk measure)</p>
                            <p>• Projected growth: ₹{((simulationResults.projectedValue - totalPortfolioValue) / 100000).toFixed(1)}L over 5 years</p>
                            <p>• One-time rebalancing cost: ₹{simulationResults.rebalancingCost.toLocaleString()}</p>
                          </div>
                        </div>
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

export default Portfolio;
