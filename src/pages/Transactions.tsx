import { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Filter, Search, TrendingUp, TrendingDown } from "lucide-react";

// Generate year-long transaction data
const generateTransactions = () => {
  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Income'];
  const merchants = {
    Food: ['Swiggy', 'Zomato', 'McDonald\'s', 'Starbucks', 'Local Restaurant'],
    Transport: ['Uber', 'Ola', 'Metro Card', 'Petrol Pump', 'Bus Pass'],
    Shopping: ['Amazon', 'Flipkart', 'Big Bazaar', 'Reliance Digital', 'Local Store'],
    Entertainment: ['BookMyShow', 'Netflix', 'Spotify', 'Gaming Store', 'Mall'],
    Healthcare: ['Apollo Pharmacy', 'Hospital', 'Clinic', 'Lab Test', 'Medicine'],
    Utilities: ['Electricity Bill', 'Water Bill', 'Internet Bill', 'Mobile Bill', 'Gas Bill'],
    Income: ['Salary Credit', 'Bonus', 'Freelance Payment', 'Interest Credit', 'Dividend']
  };

  const transactions = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate 1-5 transactions per day
    const dailyTransactions = Math.floor(Math.random() * 5) + 1;
    
    for (let j = 0; j < dailyTransactions; j++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const merchant = merchants[category][Math.floor(Math.random() * merchants[category].length)];
      
      let amount;
      if (category === 'Income') {
        amount = Math.floor(Math.random() * 50000) + 10000; // Positive for income
      } else {
        amount = -(Math.floor(Math.random() * 5000) + 100); // Negative for expenses
      }

      transactions.push({
        id: `txn_${i}_${j}`,
        date: date.toISOString(),
        merchant,
        category,
        amount,
        type: amount > 0 ? 'credit' : 'debit',
        account: 'HDFC Savings',
        status: 'completed'
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Transactions = () => {
  const [transactions] = useState(generateTransactions());
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter transactions
  const applyFilters = () => {
    let filtered = transactions;

    if (selectedMonth !== 'all') {
      filtered = filtered.filter(t => {
        const txnMonth = new Date(t.date).getMonth();
        return txnMonth === parseInt(selectedMonth);
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  // Generate monthly spending data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString('default', { month: 'short' });
    const monthTransactions = transactions.filter(t => new Date(t.date).getMonth() === i);
    const income = monthTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = Math.abs(monthTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    
    return { month, income, expenses };
  });

  // Category breakdown
  const categoryData = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities'].map(category => {
    const categoryTransactions = transactions.filter(t => t.category === category && t.amount < 0);
    const total = Math.abs(categoryTransactions.reduce((sum, t) => sum + t.amount, 0));
    return { category, amount: total };
  });

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground mt-1">Complete transaction history and spending analysis</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 12 months</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0))}
              </div>
              <p className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.5% vs last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))}
              </div>
              <p className="text-xs text-destructive flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                +3.2% vs last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)) / 12)}
              </div>
              <p className="text-xs text-muted-foreground">Monthly spending</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="income" stroke="hsl(142, 71%, 45%)" name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(0, 84%, 60%)" name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="amount" fill="hsl(217, 91%, 60%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <Input
                  placeholder="Search merchant or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History ({filteredTransactions.length.toLocaleString()} transactions)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.slice(0, 50).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">{transaction.merchant}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell className={`font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{transaction.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredTransactions.length > 50 && (
              <div className="text-center mt-4">
                <Button variant="outline">Load More Transactions</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
