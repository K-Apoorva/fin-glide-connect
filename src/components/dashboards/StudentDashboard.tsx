import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Target, TrendingUp, BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { User } from "@/types/user";

const savingsData = [
  { name: "Emergency Fund", value: 5000, color: "hsl(217, 91%, 60%)" },
  { name: "Education", value: 8000, color: "hsl(142, 71%, 45%)" },
  { name: "Travel", value: 3000, color: "hsl(38, 92%, 50%)" },
  { name: "Gadgets", value: 2000, color: "hsl(215, 20%, 65%)" }
];

const monthlyData = [
  { month: "Jan", income: 15000, expense: 12000, savings: 3000 },
  { month: "Feb", income: 18000, expense: 13500, savings: 4500 },
  { month: "Mar", income: 16000, expense: 11800, savings: 4200 },
  { month: "Apr", income: 20000, expense: 14000, savings: 6000 }
];

interface Props {
  user: User;
}

const StudentDashboard = ({ user }: Props) => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Good morning, {user.name}! 📚
          </h1>
          <p className="text-muted-foreground mt-1">
            Your savings rate is 28% - excellent for a student! Keep building those financial habits.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
              <PiggyBank className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹18,000</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹20,000</div>
              <p className="text-xs text-success">Part-time + allowance</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">28%</div>
              <p className="text-xs text-success">Above average!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Financial Score</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">78/100</div>
              <p className="text-xs text-primary">Building strong habits</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings Goals */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={savingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {savingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Bar dataKey="income" fill="hsl(142, 71%, 45%)" name="Income" />
                  <Bar dataKey="expense" fill="hsl(0, 84%, 60%)" name="Expenses" />
                  <Bar dataKey="savings" fill="hsl(217, 91%, 60%)" name="Savings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-primary">Start a SIP</h4>
              <p className="text-sm text-muted-foreground">
                Consider starting a ₹1,000 monthly SIP in a diversified equity fund to build long-term wealth.
              </p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg">
              <h4 className="font-semibold text-success">Emergency Fund Goal</h4>
              <p className="text-sm text-muted-foreground">
                You're 50% towards your ₹10,000 emergency fund goal. Great progress!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
