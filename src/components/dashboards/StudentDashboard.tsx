import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Target, TrendingUp, BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { User } from "@/types/user";
import { getFinancialProfile } from "@/data/financialProfiles";

interface Props {
  user: User;
}

const StudentDashboard = ({ user }: Props) => {
  const profile = getFinancialProfile(user.role);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Good morning, {user.name}! 📚
          </h1>
          <p className="text-muted-foreground mt-1">
            Your savings rate is {profile.savings.rate}% - excellent for a student! Keep building those financial habits.
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
              <div className="text-2xl font-bold text-foreground">₹{profile.savings.total.toLocaleString()}</div>
              <p className="text-xs text-success">+{profile.netWorth.growth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{profile.income.monthly.toLocaleString()}</div>
              <p className="text-xs text-success">{profile.income.sources.join(' + ')}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{profile.savings.rate}%</div>
              <p className="text-xs text-success">Above average!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Investment Returns</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{profile.investments.returns}%</div>
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
                    data={profile.savings.goals}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="current"
                  >
                    {profile.savings.goals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Current Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Net Worth Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Net Worth Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profile.netWorth.trend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Net Worth']} />
                  <Bar dataKey="value" fill="hsl(217, 91%, 60%)" name="Net Worth" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Goal Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.savings.goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      backgroundColor: goal.color
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

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
                You're {Math.round((profile.savings.goals[0].current / profile.savings.goals[0].target) * 100)}% towards your emergency fund goal. Great progress!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
