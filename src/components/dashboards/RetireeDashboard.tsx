import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, TrendingDown, Clock } from "lucide-react";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { User } from "@/types/user";

const withdrawalData = [
  { month: "Jan", withdrawal: 45000, balance: 2800000 },
  { month: "Feb", withdrawal: 42000, balance: 2785000 },
  { month: "Mar", withdrawal: 48000, balance: 2770000 },
  { month: "Apr", withdrawal: 45000, balance: 2755000 },
  { month: "May", withdrawal: 50000, balance: 2740000 },
  { month: "Jun", withdrawal: 47000, balance: 2725000 }
];

const longevityData = [
  { year: 2024, balance: 2800000 },
  { year: 2029, balance: 2650000 },
  { year: 2034, balance: 2480000 },
  { year: 2039, balance: 2290000 },
  { year: 2044, balance: 2080000 }
];

interface Props {
  user: User;
}

const RetireeDashboard = ({ user }: Props) => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Hello, {user.name}! 🌅
          </h1>
          <p className="text-muted-foreground mt-1">
            Your withdrawal rate is 20% - well within safe limits. Portfolio longevity: 25+ years.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹27.25L</div>
              <p className="text-xs text-success">Stable & protected</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
              <Heart className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹47,000</div>
              <p className="text-xs text-muted-foreground">Pension + withdrawals</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Withdrawal Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2.1%</div>
              <p className="text-xs text-success">Safe & sustainable</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Longevity</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">25+ years</div>
              <p className="text-xs text-primary">Excellent outlook</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Withdrawals */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Monthly Withdrawals & Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={withdrawalData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'withdrawal' ? `₹${Number(value).toLocaleString()}` : `₹${(Number(value) / 100000).toFixed(1)}L`,
                    name === 'withdrawal' ? 'Withdrawal' : 'Balance'
                  ]} />
                  <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.3} />
                  <Line type="monotone" dataKey="withdrawal" stroke="hsl(142, 71%, 45%)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Longevity Projection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Portfolio Longevity Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={longevityData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Portfolio Value']} />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="hsl(142, 71%, 45%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(142, 71%, 45%)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Health & Lifestyle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Income Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Pension</span>
                  <span className="font-semibold">₹25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Portfolio Withdrawal</span>
                  <span className="font-semibold">₹22,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Fixed Deposits</span>
                  <span className="font-semibold">₹8,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Monthly</span>
                  <span>₹55,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Expense Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Healthcare</span>
                  <span className="text-warning">₹12,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Living Expenses</span>
                  <span>₹28,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Leisure & Travel</span>
                  <span>₹8,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span>Expense Ratio</span>
                  <span className="text-success">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Safety Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <h4 className="font-semibold text-success">Emergency Fund</h4>
                  <p className="text-sm">₹2.5L - 6 months covered</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary">Health Insurance</h4>
                  <p className="text-sm">₹10L coverage active</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <h4 className="font-semibold text-warning">Estate Planning</h4>
                  <p className="text-sm">Will updated 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg">
              <h4 className="font-semibold text-success">Excellent Financial Health</h4>
              <p className="text-sm text-muted-foreground">
                Your withdrawal rate is conservative and sustainable. Portfolio is well-positioned for longevity.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-primary">Healthcare Planning</h4>
              <p className="text-sm text-muted-foreground">
                Consider increasing healthcare allocation to 25% of expenses as medical costs tend to rise with age.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RetireeDashboard;
