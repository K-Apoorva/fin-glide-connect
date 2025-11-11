import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, CreditCard, Calendar, Shield } from "lucide-react";

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
  institution: string;
  status: string;
}

interface Props {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AccountDetailsDialog = ({ account, open, onOpenChange }: Props) => {
  if (!account) return null;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return `$${amount.toLocaleString("en-US")}`;
  };

  // Generate mock account details
  const accountDetails = {
    accountNumber: `****${Math.floor(Math.random() * 9000) + 1000}`,
    ifscCode: `${account.institution.substring(0, 4).toUpperCase()}0001234`,
    branchName: `${account.institution} Main Branch`,
    openingDate: "2019-03-15",
    lastUpdated: new Date().toISOString().split('T')[0],
    availableBalance: account.balance,
    ledgerBalance: account.balance + Math.floor(Math.random() * 5000),
    minimumBalance: account.type === 'Savings' ? 10000 : 25000
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Account Details
          </DialogTitle>
          <DialogDescription>
            Complete information for {account.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Name</label>
              <p className="font-semibold">{account.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Type</label>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <Badge variant="outline">{account.type}</Badge>
              </div>
            </div>
          </div>

          {/* Account Numbers */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Number</label>
              <p className="font-mono text-lg">{accountDetails.accountNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">IFSC Code</label>
              <p className="font-mono">{accountDetails.ifscCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Branch</label>
              <p>{accountDetails.branchName}</p>
            </div>
          </div>

          {/* Balance Information */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <span className="font-semibold text-success">
                {formatCurrency(accountDetails.availableBalance, account.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ledger Balance</span>
              <span className="font-semibold">
                {formatCurrency(accountDetails.ledgerBalance, account.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Minimum Balance</span>
              <span className="font-semibold">
                {formatCurrency(accountDetails.minimumBalance, account.currency)}
              </span>
            </div>
          </div>

          {/* Status & Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <Badge variant="default">{account.status}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{accountDetails.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Account Opening Date</label>
            <p>{accountDetails.openingDate}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsDialog;
