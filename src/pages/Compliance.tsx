import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Clock, Lock, Database } from "lucide-react";

const Compliance = () => {
  const complianceData = {
    sebiVersion: "SEBI/HO/IMD/DF2/CIR/P/2025/002",
    amfiVersion: "AMFI/2025/001",
    lastUpdate: "2025-01-15T08:30:00",
    aaSync: "2025-01-16T06:00:00",
    encryptionStatus: "AES-256",
    tlsVersion: "TLS 1.3",
  };

  const complianceHistory = [
    { date: "2025-01-15", event: "SEBI Circular 2025/02 synced successfully", status: "success" },
    { date: "2025-01-10", event: "AMFI Guidelines Update Applied", status: "success" },
    { date: "2025-01-05", event: "RBI AA Framework Compliance Verified", status: "success" },
    { date: "2024-12-20", event: "Security Audit Completed", status: "success" },
    { date: "2024-12-15", event: "Data Encryption Standards Updated", status: "success" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Center</h1>
          <p className="text-muted-foreground mt-1">Regulatory compliance and security status</p>
        </div>

        {/* Overall Status */}
        <Card className="shadow-card border-success/30 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  🟢 Fully Compliant with Latest SEBI and AMFI Standards
                </h2>
                <p className="text-sm text-muted-foreground">
                  All systems operational and regulatory requirements met
                </p>
              </div>
              <Badge className="bg-success text-success-foreground px-4 py-2 text-base">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Current Compliance Versions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>SEBI Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Version</p>
                <p className="font-mono text-sm font-semibold text-foreground bg-accent/50 p-3 rounded-lg">
                  {complianceData.sebiVersion}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Last Updated</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {new Date(complianceData.lastUpdate).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>AMFI Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Version</p>
                <p className="font-mono text-sm font-semibold text-foreground bg-accent/50 p-3 rounded-lg">
                  {complianceData.amfiVersion}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Last Updated</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {new Date(complianceData.lastUpdate).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regulatory Proof Panel */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle>Regulatory Proof Panel</CardTitle>
            <CardDescription>Real-time system security and compliance verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">RBI AA Data Sync</p>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Last Synchronized</p>
                <p className="text-sm font-mono text-foreground">
                  {new Date(complianceData.aaSync).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="h-5 w-5 text-success" />
                  <p className="font-semibold text-foreground">Encryption Status</p>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Active Encryption</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/20 text-success border-0">{complianceData.encryptionStatus}</Badge>
                  <Badge className="bg-success/20 text-success border-0">{complianceData.tlsVersion}</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <p className="font-semibold text-foreground">Security Certifications</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Badge variant="outline" className="bg-background justify-center py-2">ISO 27001</Badge>
                <Badge variant="outline" className="bg-background justify-center py-2">SOC 2 Type II</Badge>
                <Badge variant="outline" className="bg-background justify-center py-2">PCI DSS</Badge>
                <Badge variant="outline" className="bg-background justify-center py-2">GDPR Ready</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Timeline */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Compliance Update History</CardTitle>
            <CardDescription>Timeline of regulatory updates and compliance actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceHistory.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
                    {index < complianceHistory.length - 1 && (
                      <div className="absolute left-1/2 top-5 w-px h-12 -translate-x-1/2 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{item.event}</p>
                      <Badge className="bg-success/20 text-success border-0 text-xs">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Update Information */}
        <Card className="shadow-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">Automatic Compliance Updates</p>
                <p className="text-sm text-muted-foreground">
                  FinPilot automatically monitors and applies SEBI and AMFI regulatory updates within 48 hours of publication. 
                  You will receive notifications when new compliance standards are implemented.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
