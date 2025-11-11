import { LayoutDashboard, Wallet, TrendingUp, Calculator, Shield, Settings, Menu, PieChart, CreditCard, FileCheck, UserCog, BarChart3, Receipt, PieChart as Analytics } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Accounts", path: "/accounts", icon: Wallet },
  { title: "Transactions", path: "/transactions", icon: Receipt },
  { title: "Spending Analysis", path: "/spending", icon: Analytics },
  { title: "Insights", path: "/insights", icon: TrendingUp },
  { title: "Portfolio", path: "/portfolio", icon: PieChart },
  { title: "Holdings Overview", path: "/portfolio/overview", icon: BarChart3 },
  { title: "Debt Planner", path: "/debt-planner", icon: CreditCard },
  { title: "Tools", path: "/tools", icon: Calculator },
  { title: "Compliance", path: "/compliance", icon: FileCheck },
  { title: "Consent Center", path: "/consent", icon: Shield },
  { title: "Settings", path: "/settings", icon: Settings },
];

const adminItems = [
  { title: "Admin Panel", path: "/admin", icon: UserCog },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const allItems = user?.role === 'admin' 
    ? [...navigationItems, ...adminItems]
    : navigationItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-sidebar-foreground">FinPilot</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        {!collapsed && user && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70 capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {allItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && (
            <>
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70 mb-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span>System Online</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
