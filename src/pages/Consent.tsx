import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const consentItems = [
  {
    id: 1,
    provider: "HDFC Bank",
    dataTypes: ["Account Balance", "Transaction History", "Profile Information"],
    grantedDate: "2024-12-15",
    expiryDate: "2025-12-15",
    status: "active",
  },
  {
    id: 2,
    provider: "ICICI Bank",
    dataTypes: ["Account Balance", "Transaction History"],
    grantedDate: "2024-11-20",
    expiryDate: "2025-11-20",
    status: "active",
  },
  {
    id: 3,
    provider: "State Bank of India",
    dataTypes: ["Fixed Deposit Details", "Interest Rates"],
    grantedDate: "2024-10-10",
    expiryDate: "2025-10-10",
    status: "active",
  },
];

const Consent = () => {
  const [consents, setConsents] = useState(consentItems);
  const [revoking, setRevoking] = useState<number | null>(null);

  const handleRevoke = async (id: number) => {
    setRevoking(id);
    
    // Simulate API call
    setTimeout(() => {
      setConsents(consents.map(c => 
        c.id === id ? { ...c, status: "revoked" as const } : c
      ));
      setRevoking(null);
      toast.success("Consent revoked successfully", {
        description: "Data sharing has been stopped immediately.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consent Center</h1>
          <p className="text-muted-foreground mt-1">Manage your data sharing preferences and privacy settings</p>
        </div>

        {/* Privacy Overview */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Your Privacy, Your Control</CardTitle>
            </div>
            <CardDescription>
              We use the RBI-approved Account Aggregator framework to securely access your financial data. 
              You have complete control over what data is shared and can revoke access anytime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-foreground">AES-256 Encrypted</span>
                </div>
                <p className="text-sm text-muted-foreground">All data is encrypted at rest and in transit</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-foreground">TLS 1.3+ Security</span>
                </div>
                <p className="text-sm text-muted-foreground">Highest grade transport security</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-foreground">RBI Compliant</span>
                </div>
                <p className="text-sm text-muted-foreground">Following all regulatory guidelines</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent Policy */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Data Consent Policy</CardTitle>
            <CardDescription>Written in simple English for your understanding</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-3 text-foreground">
              <p>
                <strong>What data we collect:</strong> We access your account balances, transaction history, 
                and basic profile information from your connected financial institutions.
              </p>
              <p>
                <strong>How we use it:</strong> This data helps us show you insights about your spending, 
                savings, and overall financial health. We also use it to provide personalized recommendations.
              </p>
              <p>
                <strong>Who we share with:</strong> Your data is never sold to third parties. We only share 
                anonymized statistics for service improvement.
              </p>
              <p>
                <strong>Your rights:</strong> You can revoke consent anytime. When you do, we immediately 
                stop accessing new data and delete existing data within 30 days as per RBI guidelines.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Consents */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Active Consents</h2>
          
          {consents.map((consent) => (
            <Card key={consent.id} className={`shadow-card ${consent.status === "revoked" ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {consent.provider}
                      {consent.status === "active" ? (
                        <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          Revoked
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Data types: {consent.dataTypes.join(", ")}
                    </CardDescription>
                  </div>
                  {consent.status === "active" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevoke(consent.id)}
                      disabled={revoking === consent.id}
                    >
                      {revoking === consent.id ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Revoking...
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Revoke Consent
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Granted On:</span>
                    <p className="font-medium text-foreground">
                      {new Date(consent.grantedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expires On:</span>
                    <p className="font-medium text-foreground">
                      {new Date(consent.expiryDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Notice */}
        <Card className="shadow-card border-warning/20 bg-warning/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle>Important Security Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              When you revoke consent, we immediately stop fetching new data and sharing stops within 30 seconds. 
              Existing data is retained for 30 days as per RBI Account Aggregator guidelines, after which it is 
              permanently deleted from our systems.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Consent;
