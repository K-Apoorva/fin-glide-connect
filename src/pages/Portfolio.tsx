import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PieChart, TrendingUp, AlertCircle, Info } from "lucide-react";
import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useState } from "react";

const Portfolio = () => {
  const [equityTarget, setEquityTarget] = useState(40);
  const [debtTarget, setDebtTarget] = useState(30);
  const [cashTarget, setCashTarget] = useState(15);
  const [realEstateTarget, setRealEstateTarget] = useState(10);
  const [alternativesTarget, setAlternativesTarget] = useState(5);

  const currentAllocation = [
    { name: "Equity", value: 45, color: "hsl(var(--primary))" },
    { name: "Debt", value: 28, color: "hsl(var(--success))" },
    { name: "Cash", value: 12, color: "hsl(var(--warning))" },
    { name: "Real Estate", value: 10, color: "hsl(var(--accent-foreground))" },
    { name: "Alternatives", value: 5, color: "hsl(var(--muted-foreground))" },
  ];

  const targetAllocation = [
    { name: "Equity", value: equityTarget, color: "hsl(var(--primary))" },
    { name: "Debt", value: debtTarget, color: "hsl(var(--success))" },
    { name: "Cash", value: cashTarget, color: "hsl(var(--warning))" },
    { name: "Real Estate", value: realEstateTarget, color: "hsl(var(--accent-foreground))" },
    { name: "Alternatives", value: alternativesTarget, color: "hsl(var(--muted-foreground))" },
  ];

  const calculateDeviation = (current: number, target: number) => {
    return Math.abs(((current - target) / target) * 100);
  };

  const projectedCAGR = 12.5;
  const projectedIRR = 14.2;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Allocation</h1>
          <p className="text-muted-foreground mt-1">Monitor and rebalance your investment portfolio</p>
        </div>

        {/* Current vs Target Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
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
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {currentAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Target Allocation</CardTitle>
              <CardDescription>Your desired portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={targetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {targetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Rebalancing Alerts */}
        <Card className="shadow-card border-warning/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle>Rebalancing Status</CardTitle>
            </div>
            <CardDescription>Portfolio deviation from target allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentAllocation.map((asset, index) => {
              const targetValue = targetAllocation[index].value;
              const deviation = calculateDeviation(asset.value, targetValue);
              const needsRebalancing = deviation > 20;

              return (
                <div key={asset.name} className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{asset.name}</span>
                      {needsRebalancing && (
                        <Badge className="bg-warning/20 text-warning border-0">
                          Rebalance Suggested
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current: {asset.value}% | Target: {targetValue}% | Deviation: {deviation.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Allocation Simulator */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Allocation Simulator</CardTitle>
            </div>
            <CardDescription>Adjust target allocations and see projected returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Equity</span>
                  <span className="text-sm text-muted-foreground">{equityTarget}%</span>
                </div>
                <Slider value={[equityTarget]} onValueChange={(v) => setEquityTarget(v[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Debt</span>
                  <span className="text-sm text-muted-foreground">{debtTarget}%</span>
                </div>
                <Slider value={[debtTarget]} onValueChange={(v) => setDebtTarget(v[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Cash</span>
                  <span className="text-sm text-muted-foreground">{cashTarget}%</span>
                </div>
                <Slider value={[cashTarget]} onValueChange={(v) => setCashTarget(v[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Real Estate</span>
                  <span className="text-sm text-muted-foreground">{realEstateTarget}%</span>
                </div>
                <Slider value={[realEstateTarget]} onValueChange={(v) => setRealEstateTarget(v[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Alternatives</span>
                  <span className="text-sm text-muted-foreground">{alternativesTarget}%</span>
                </div>
                <Slider value={[alternativesTarget]} onValueChange={(v) => setAlternativesTarget(v[0])} max={100} step={1} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Projected CAGR</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-2xl font-bold text-primary">{projectedCAGR}%</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Projected IRR</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="text-2xl font-bold text-success">{projectedIRR}%</p>
                </div>
              </div>
            </div>

            <Button className="w-full">
              Apply Allocation
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Note */}
        <Card className="shadow-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Investment insights provided by FinPilot adhere to AMFI guidelines and follow SEBI-compliant parameters.
                All recommendations are based on your risk profile and financial goals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
