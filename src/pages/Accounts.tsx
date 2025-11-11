import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, Download, IndianRupee, DollarSign, Building2, Wallet, CreditCard } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return `$${amount.toLocaleString("en-US")}`;
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">Manage all your connected financial accounts</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Link2 className="h-4 w-4 mr-2" />
            Connect Account Aggregator
          </Button>
        </div>

        {/* Connection Status */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              Account Aggregator Status
            </CardTitle>
            <CardDescription>Connected and syncing in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-accent">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Connected Accounts</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent">
                <div className="text-2xl font-bold text-success">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime (30 days)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent">
                <div className="text-2xl font-bold text-foreground">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg. Sync Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {account.type === "Savings" && <Wallet className="h-5 w-5 text-primary" />}
                      {account.type === "Current" && <Building2 className="h-5 w-5 text-primary" />}
                      {account.type === "Deposit" && <PiggyBank className="h-5 w-5 text-primary" />}
                      {account.type === "Foreign" && <DollarSign className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-base">{account.name}</CardTitle>
                      <CardDescription>{account.institution}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {account.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      {formatCurrency(account.balance, account.currency)}
                    </span>
                    <span className="text-sm text-muted-foreground">{account.currency}</span>
                  </div>
                  <Badge variant="secondary">{account.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 90 days of transaction history</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>MCC</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{formatDateTime(txn.date)}</TableCell>
                    <TableCell>{txn.merchant}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{txn.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{txn.mcc}</TableCell>
                    <TableCell className={`text-right font-semibold ${txn.type === "credit" ? "text-success" : "text-destructive"}`}>
                      {txn.type === "credit" ? "+" : ""}₹{Math.abs(txn.amount).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const PiggyBank = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
    <path d="M16 11h0" />
  </svg>
);

export default Accounts;
