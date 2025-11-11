import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CreditCard, PieChart, Target } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User } from "@/types/user";

const netWorthData = [
  { month: "Jan", value: 450000 },
  { month: "Feb", value: 475000 },
  { month: "Mar", value: 462000 },
  { month: "Apr", value: 495000 },
  { month: "May", value: 520000 },
  { month: "Jun", value: 548000 }
];

const debtData = [
  { name: "Home Loan", amount: 3200000, emi: 44986, rate: 8.5 },
  { name: "Car Loan", amount: 450000, emi: 15200, rate: 9.2 },
  { name: "Credit Card", amount: 85000, emi: 8500, rate: 18.0 }
];

interface Props {
  user: User;
}

const ProfessionalDashboard = ({ user }: Props) => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name}! 💼
          </h1>
          <p className="text-muted-foreground mt-1">
            Your portfolio is up 8.2% this month. EMI-to-income ratio is healthy at 35%.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹5,48,000</div>
              <p className="text-xs text-success">+8.2% this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly EMIs</CardTitle>
              <CreditCard className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹68,686</div>
              <p className="text-xs text-muted-foreground">35% of income</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Investments</CardTitle>
              <PieChart className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹2,85,000</div>
              <p className="text-xs text-success">+12.5% YTD</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Goal Progress</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">68%</div>
              <p className="text-xs text-primary">House down payment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Net Worth Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Net Worth Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={netWorthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Net Worth']} />
                  <Area type="monotone" dataKey="value" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Debt Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Debt Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {debtData.map((debt, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{debt.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{debt.emi.toLocaleString()}/month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(debt.amount / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-muted-foreground">{debt.rate}% APR</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-warning/10 rounded-lg">
              <h4 className="font-semibold text-warning">Rebalance Portfolio</h4>
              <p className="text-sm text-muted-foreground">
                Your equity allocation is 65% vs target 60%. Consider booking some profits.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-primary">Tax Saving Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                You can save ₹46,800 in taxes by investing ₹1.5L more in ELSS funds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfessionalDashboard;
