import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { connectNewAccount, downloadCSV } from "@/utils/accountSync";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectAccountDialog = ({ open, onOpenChange }: Props) => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const result = await connectNewAccount(formData);
      
      if (result.success && result.csvData) {
        setStatus('success');
        toast.success("Account connected successfully!");
        
        // Download CSV file
        const filename = `${formData.bankName}_${formData.accountNumber.slice(-4)}_transactions.csv`;
        downloadCSV(result.csvData, filename);
        
        // Reset form
        setFormData({ bankName: '', accountNumber: '', ifscCode: '', accountType: '' });
        
        setTimeout(() => {
          onOpenChange(false);
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        toast.error("Failed to connect account. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      toast.error("Connection failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect New Account</DialogTitle>
          <DialogDescription>
            Add a new bank account to your FinPilot dashboard
          </DialogDescription>
        </DialogHeader>
        
        {status === 'success' ? (
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-success">Account Connected!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Transaction history has been downloaded automatically.
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-6">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive">Connection Failed</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please verify your account details and try again.
            </p>
            <Button onClick={() => setStatus('idle')} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Select value={formData.bankName} onValueChange={(value) => setFormData(prev => ({ ...prev, bankName: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                  <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                  <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                  <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                  <SelectItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="Enter account number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => setFormData(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                placeholder="e.g., HDFC0000123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select value={formData.accountType} onValueChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings Account</SelectItem>
                  <SelectItem value="Current">Current Account</SelectItem>
                  <SelectItem value="Salary">Salary Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Account'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
