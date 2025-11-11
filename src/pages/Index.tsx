import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Lock, Zap, BarChart3, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTgtMy41ODItOC04LThzLTggMy41ODItOCA4YzAgNC40MTggMy41ODIgOCA4IDhzOC0zLjU4MiA4LTh6TTYwIDQ0YzAtNC40MTgtMy41ODItOC04LThzLTggMy41ODItOCA4YzAgNC40MTggMy41ODIgOCA4IDhzOC0zLjU4MiA4LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">RBI-Approved Account Aggregator Framework</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Financial Clarity,
              <br />
              <span className="text-white/90">Automated & Secure</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              FinPilot brings all your financial accounts together in one secure platform. 
              Get real-time insights, smart recommendations, and complete control over your financial data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-elevated">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Financial Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to give you complete visibility and control over your finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Unified Dashboard</h3>
                <p className="text-muted-foreground">
                  View all your accounts, transactions, and investments in one place. Multi-currency support included.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Insights</h3>
                <p className="text-muted-foreground">
                  AI-powered recommendations help you make better financial decisions and achieve your goals faster.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Financial Tools</h3>
                <p className="text-muted-foreground">
                  Calculate CAGR, IRR, EMI, and debt-to-income ratios with our built-in financial calculators.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Bank-Grade Security</h3>
                <p className="text-muted-foreground">
                  AES-256 encryption, TLS 1.3+, and multi-factor authentication keep your data completely secure.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Full Privacy Control</h3>
                <p className="text-muted-foreground">
                  Manage data consent easily. Revoke access anytime with immediate effect. You're always in control.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Sync</h3>
                <p className="text-muted-foreground">
                  Connect in under 2 seconds. 99.8% uptime ensures your data is always current and accurate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have automated their financial clarity with FinPilot
            </p>
            <Button size="lg" asChild className="shadow-elevated">
              <Link to="/dashboard">
                <Wallet className="h-5 w-5 mr-2" />
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-sidebar border-t border-sidebar-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-sidebar-foreground">FinPilot</span>
            </div>
            <p className="text-sm text-sidebar-foreground/70">
              © 2025 FinPilot. Secured by RBI-Approved Account Aggregator Framework.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
