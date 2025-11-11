import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Plus, RefreshCw, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

const cryptoWallets = [
  {
    id: '1',
    name: 'MetaMask Wallet',
    address: '0x742d...4c2f',
    balance: 2.45,
    token: 'ETH',
    valueINR: 180000,
    valueUSD: 2164,
    change24h: 5.2,
    status: 'connected'
  },
  {
    id: '2',
    name: 'CoinDCX Wallet',
    address: 'bc1q...7x9k',
    balance: 0.0085,
    token: 'BTC',
    valueINR: 85000,
    valueUSD: 1022,
    change24h: -2.1,
    status: 'connected'
  },
  {
    id: '3',
    name: 'WazirX Wallet',
    address: 'bnb1...m4n2',
    balance: 125.5,
    token: 'BNB',
    valueINR: 35000,
    valueUSD: 421,
    change24h: 8.7,
    status: 'connected'
  }
];

const recentTransactions = [
  {
    id: '1',
    type: 'buy',
    token: 'ETH',
    amount: 0.5,
    valueINR: 36000,
    date: '2024-01-10T14:30:00',
    hash: '0xabc123...def456',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'sell',
    token: 'BTC',
    amount: 0.002,
    valueINR: 20000,
    date: '2024-01-09T10:15:00',
    hash: '0x789xyz...123abc',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'transfer',
    token: 'BNB',
    amount: 25,
    valueINR: 7000,
    date: '2024-01-08T18:45:00',
    hash: '0x456def...789ghi',
    status: 'pending'
  }
];

const CryptoWallet = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalValueINR = cryptoWallets.reduce((sum, wallet) => sum + wallet.valueINR, 0);
  const totalValueUSD = cryptoWallets.reduce((sum, wallet) => sum + wallet.valueUSD, 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleConnectWallet = () => {
    console.log('Connecting new wallet...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Crypto Wallets</h2>
          <p className="text-muted-foreground">Manage your cryptocurrency holdings</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleConnectWallet}>
            <Plus className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Total Value */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground">₹{totalValueINR.toLocaleString()}</h3>
            <p className="text-muted-foreground">${totalValueUSD.toLocaleString()} USD</p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">+12.5% (24h)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoWallets.map((wallet) => (
          <Card key={wallet.id} className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  {wallet.name}
                </CardTitle>
                <Badge variant={wallet.status === 'connected' ? 'default' : 'secondary'}>
                  {wallet.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-mono text-sm">{wallet.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="text-xl font-bold">{wallet.balance} {wallet.token}</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Value (INR)</p>
                    <p className="font-semibold">₹{wallet.valueINR.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <div className="flex items-center gap-1">
                      {wallet.change24h > 0 ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${wallet.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                        {wallet.change24h > 0 ? '+' : ''}{wallet.change24h}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value (INR)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={
                      tx.type === 'buy' ? 'default' : 
                      tx.type === 'sell' ? 'secondary' : 'outline'
                    }>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.token}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>₹{tx.valueINR.toLocaleString()}</TableCell>
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compliance Notice */}
      <Card className="shadow-card border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium text-primary mb-2">Crypto Asset Compliance</p>
            <p>
              All cryptocurrency holdings are reported in compliance with RBI and SEBI guidelines. 
              Values are indicative and synced via licensed crypto APIs every 5 minutes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoWallet;
