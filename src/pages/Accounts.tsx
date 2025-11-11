import { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Download, IndianRupee, DollarSign, Building2, Wallet, CreditCard, TrendingUp, ShoppingBag, Utensils, Car, Film } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CryptoWallet from "@/components/CryptoWallet";

const accounts = [
  { id: 1, name: "HDFC Savings Account", type: "Savings", balance: 145000, currency: "INR", institution: "HDFC Bank", status: "Active" },
  { id: 2, name: "ICICI Current Account", type: "Current", balance: 85000, currency: "INR", institution: "ICICI Bank", status: "Active" },
  { id: 3, name: "SBI Fixed Deposit", type: "Deposit", balance: 200000, currency: "INR", institution: "State Bank of India", status: "Active" },
  { id: 4, name: "Wise USD Account", type: "Foreign", balance: 1250, currency: "USD", institution: "Wise", status: "Active" },
];

const recentTransactions = [
  { id: 1, date: "2025-01-10T14:30:00", merchant: "Amazon India", category: "Shopping", amount: -2499, type: "debit", mcc: "5411" },
  { id: 2, date: "2025-01-09T10:15:00", merchant: "Salary Credit", category: "Income", amount: 98000, type: "credit", mcc: "0000" },
  { id: 3, date: "2025-01-08T18:45:00", merchant: "Swiggy", category: "Food", amount: -485, type: "debit", mcc: "5812" },
  { id: 4, date: "2025-01-07T12:20:00", merchant: "Uber", category: "Transport", amount: -320, type: "debit", mcc: "4121" },
  { id: 5, date: "2025-01-06T16:30:00", merchant: "BookMyShow", category: "Entertainment", amount: -600, type: "debit", mcc: "7832" },
];

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("traditional");

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return `$${amount.toLocaleString("en-US")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "shopping":
        return <ShoppingBag className="h-4 w-4 text-primary" />;
      case "food":
        return <Utensils className="h-4 w-4 text-warning" />;
      case "transport":
        return <Car className="h-4 w-4 text-info" />;
      case "entertainment":
        return <Film className="h-4 w-4 text-purple-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">Manage your bank accounts and crypto wallets</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link2 className="h-4 w-4 mr-2" />
              Connect Account
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traditional">Traditional Banking</TabsTrigger>
            <TabsTrigger value="crypto">Crypto Wallets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traditional" className="space-y-6">
            {/* Account Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₹4,30,000</div>
                  <p className="text-xs text-success">Across all accounts</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Accounts</CardTitle>
                  <Building2 className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">4</div>
                  <p className="text-xs text-muted-foreground">Connected banks</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Inflow</CardTitle>
                  <IndianRupee className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₹98,000</div>
                  <p className="text-xs text-success">+6.5% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Foreign Currency</CardTitle>
                  <DollarSign className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">$1,250</div>
                  <p className="text-xs text-muted-foreground">USD equivalent</p>
                </CardContent>
              </Card>
            </div>

            {/* Account List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Your linked bank accounts and their current balances</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{account.type}</Badge>
                        </TableCell>
                        <TableCell>{account.institution}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(account.balance, account.currency)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Sync</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest transactions across all your accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-sm">
                          {formatDate(transaction.date)}
                        </TableCell>
                        <TableCell className="font-medium">{transaction.merchant}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(transaction.category)}
                            <span>{transaction.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === "credit" ? "default" : "secondary"}>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="crypto">
            <CryptoWallet />
          </TabsContent>
        </Tabs>

        {/* Compliance Footer */}
        <div className="text-center text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
          <p>🟢 AMFI & SEBI Compliant | AES-256 Encrypted | TLS 1.3 Secured</p>
          <p className="mt-1">
            All account data synced via RBI-approved Account Aggregator framework. 
            Crypto holdings reported in compliance with regulatory guidelines.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
