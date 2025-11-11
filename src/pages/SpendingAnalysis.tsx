import { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, CreditCard } from "lucide-react";

const spendingData = [
  { 
    category: 'Food & Dining', 
    amount: 18500, 
    budget: 15000, 
    transactions: 45,
    color: 'hsl(217, 91%, 60%)',
    trend: 12.5,
    insights: 'Spending 23% above budget. Consider meal planning and cooking at home more often.',
    dailyTransactions: [
      { date: '2024-01-10', merchant: 'Swiggy', amount: 485 },
      { date: '2024-01-09', merchant: 'Starbucks', amount: 320 },
      { date: '2024-01-08', merchant: 'McDonald\'s', amount: 280 },
      { date: '2024-01-07', merchant: 'Local Restaurant', amount: 850 },
      { date: '2024-01-06', merchant: 'Zomato', amount: 650 }
    ]
  },
  { 
    category: 'Transport', 
    amount: 8200, 
    budget: 10000, 
    transactions: 28,
    color: 'hsl(142, 71%, 45%)',
    trend: -8.2,
    insights: 'Good control on transport expenses. 18% under budget due to work from home.',
    dailyTransactions: [
      { date: '2024-01-10', merchant: 'Uber', amount: 320 },
      { date: '2024-01-09', merchant: 'Metro Card', amount: 200 },
      { date: '2024-01-08', merchant: 'Petrol Pump', amount: 2500 },
      { date: '2024-01-07', merchant: 'Ola', amount: 180 },
      { date: '2024-01-06', merchant: 'Bus Pass', amount: 150 }
    ]
  },
  { 
    category: 'Shopping', 
    amount: 12800, 
    budget: 8000, 
    transactions: 22,
    color: 'hsl(38, 92%, 50%)',
    trend: 35.8,
    insights: 'Significant overspending on shopping. Review impulse purchases and set spending limits.',
    dailyTransactions: [
      { date: '2024-01-10', merchant: 'Amazon', amount: 2499 },
      { date: '2024-01-09', merchant: 'Flipkart', amount: 1850 },
      { date: '2024-01-08', merchant: 'Big Bazaar', amount: 1200 },
      { date: '2024-01-07', merchant: 'Reliance Digital', amount: 3500 },
      { date: '2024-01-06', merchant: 'Local Store', amount: 450 }
    ]
  },
  { 
    category: 'Entertainment', 
    amount: 4500, 
    budget: 5000, 
    transactions: 15,
    color: 'hsl(280, 100%, 70%)',
    trend: -2.1,
    insights: 'Entertainment spending is well within budget. Good balance between fun and savings.',
    dailyTransactions: [
      { date: '2024-01-10', merchant: 'BookMyShow', amount: 600 },
      { date: '2024-01-09', merchant: 'Netflix', amount: 199 },
      { date: '2024-01-08', merchant: 'Gaming Store', amount: 1500 },
      { date: '2024-01-07', merchant: 'Mall', amount: 800 },
      { date: '2024-01-06', merchant: 'Spotify', amount: 119 }
    ]
  },
  { 
    category: 'Healthcare', 
    amount: 6200, 
    budget: 4000, 
    transactions: 8,
    color: 'hsl(0, 84%, 60%)',
    trend: 18.5,
    insights: 'Higher healthcare expenses this month. Consider health insurance coverage review.',
    dailyTransactions: [
      { date: '2024-01-10', merchant: 'Apollo Pharmacy', amount: 850 },
      { date: '2024-01-09', merchant: 'Clinic', amount: 1500 },
      { date: '2024-01-08', merchant: 'Lab Test', amount: 2200 },
      { date: '2024-01-07', merchant: 'Medicine', amount: 650 },
      { date: '2024-01-06', merchant: 'Hospital', amount: 1000 }
    ]
  }
];

const monthlyTrends = [
  { month: 'Jul', food: 16500, transport: 9200, shopping: 7800, entertainment: 4200, healthcare: 3500 },
  { month: 'Aug', food: 17200, transport: 8800, shopping: 9200, entertainment: 4800, healthcare: 4200 },
  { month: 'Sep', food: 18000, transport: 8500, shopping: 11500, entertainment: 4500, healthcare: 5800 },
  { month: 'Oct', food: 17800, transport: 8200, shopping: 10200, entertainment: 4200, healthcare: 4800 },
  { month: 'Nov', food: 18200, transport: 8000, shopping: 12000, entertainment: 4600, healthcare: 5500 },
  { month: 'Dec', food: 18500, transport: 8200, shopping: 12800, entertainment: 4500, healthcare: 6200 }
];

const SpendingAnalysis = () => {
  const [selectedCategory, setSelectedCategory] = useState(spendingData[0]);

  const totalSpent = spendingData.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = spendingData.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Spending Analysis</h1>
          <p className="text-muted-foreground mt-1">Detailed breakdown of your spending patterns and trends</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budgetUtilization.toFixed(1)}%</div>
              <Progress value={budgetUtilization} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories Over Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {spendingData.filter(cat => cat.amount > cat.budget).length}
              </div>
              <p className="text-xs text-destructive">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{Math.round(totalSpent / spendingData.reduce((sum, cat) => sum + cat.transactions, 0)).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="amount"
                    onClick={(data) => setSelectedCategory(data)}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>6-Month Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="food" stroke="hsl(217, 91%, 60%)" name="Food" />
                  <Line type="monotone" dataKey="shopping" stroke="hsl(38, 92%, 50%)" name="Shopping" />
                  <Line type="monotone" dataKey="transport" stroke="hsl(142, 71%, 45%)" name="Transport" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Details */}
        <Card>
          <CardHeader>
            <CardTitle>Category Analysis: {selectedCategory.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Amount Spent</span>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold mt-2">₹{selectedCategory.amount.toLocaleString()}</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Budget</span>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold mt-2">₹{selectedCategory.budget.toLocaleString()}</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Transactions</span>
                      <span className="text-sm text-muted-foreground">{selectedCategory.transactions}</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">
                      ₹{Math.round(selectedCategory.amount / selectedCategory.transactions).toLocaleString()}
                    </div>
                    <span className="text-xs text-muted-foreground">avg per transaction</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Budget Utilization</span>
                    <span className={`font-semibold ${selectedCategory.amount > selectedCategory.budget ? 'text-destructive' : 'text-success'}`}>
                      {((selectedCategory.amount / selectedCategory.budget) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(selectedCategory.amount / selectedCategory.budget) * 100} 
                    className="h-2"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="transactions" className="space-y-4">
                <div className="space-y-3">
                  {selectedCategory.dailyTransactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{transaction.merchant}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{transaction.amount.toLocaleString()}</div>
                        <Badge variant="outline">{selectedCategory.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    {selectedCategory.amount > selectedCategory.budget ? (
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-semibold">Spending Pattern Analysis</h4>
                      <p className="text-sm text-muted-foreground mt-1">{selectedCategory.insights}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Monthly Trend</h4>
                  <div className="flex items-center gap-2">
                    {selectedCategory.trend > 0 ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <span className={`font-medium ${selectedCategory.trend > 0 ? 'text-destructive' : 'text-success'}`}>
                      {selectedCategory.trend > 0 ? '+' : ''}{selectedCategory.trend}% vs last month
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SpendingAnalysis;
