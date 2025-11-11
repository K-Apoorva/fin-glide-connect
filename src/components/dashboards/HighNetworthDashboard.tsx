import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Globe, BarChart3 } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { User } from "@/types/user";

const portfolioData = [
  { month: "Jan", value: 25000000 },
  { month: "Feb", value: 26200000 },
  { month: "Mar", value: 25800000 },
  { month: "Apr", value: 27500000 },
  { month: "May", value: 28900000 },
  { month: "Jun", value: 30200000 }
];

const assetAllocation = [
  { name: "Equity", value: 45, color: "hsl(217, 91%, 60%)" },
  { name: "Real Estate", value: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Fixed Income", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Alternative", value: 10, color: "hsl(215, 20%, 65%)" },
  { name: "Cash", value: 5, color: "hsl(0, 0%, 50%)" }
];

interface Props {
  user: User;
}

const HighNetworthDashboard = ({ user }: Props) => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Good evening, {user.name}! 🏆
          </h1>
          <p className="text-muted-foreground mt-1">
            Your portfolio stability score is 92%. Diversification across 8 asset classes is optimal.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total AUM</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹3.02Cr</div>
              <p className="text-xs text-success">+4.5% this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Annual Returns</CardTitle>
              <BarChart3 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">14.8%</div>
              <p className="text-xs text-success">vs 12.2% benchmark</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">92/100</div>
              <p className="text-xs text-primary">Excellent stability</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Global Exposure</CardTitle>
              <Globe className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">28%</div>
              <p className="text-xs text-muted-foreground">International assets</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Growth */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(217, 91%, 60%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 2, r: 4 }}
                  />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 10000000).toFixed(2)}Cr`, 'Portfolio Value']} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Tax Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>LTCG Harvesting</span>
                  <span className="text-success">₹2.8L saved</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Loss Harvesting</span>
                  <span className="text-success">₹1.2L saved</span>
                </div>
                <div className="flex justify-between">
                  <span>Effective Tax Rate</span>
                  <span className="font-semibold">18.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sharpe Ratio</span>
                  <span className="font-semibold">1.85</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Drawdown</span>
                  <span className="text-warning">-8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Beta</span>
                  <span className="font-semibold">0.92</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Wealth Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Retirement Fund</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Legacy Planning</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HighNetworthDashboard;
