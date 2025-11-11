import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Insights from "./pages/Insights";
import Portfolio from "./pages/Portfolio";
import DebtPlanner from "./pages/DebtPlanner";
import Tools from "./pages/Tools";
import Compliance from "./pages/Compliance";
import Consent from "./pages/Consent";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/debt-planner" element={<DebtPlanner />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
