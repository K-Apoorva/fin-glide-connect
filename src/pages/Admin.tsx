import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Activity, Shield, Download, RefreshCw, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const userDistribution = [
  { name: "Students", value: 1250, color: "hsl(217, 91%, 60%)" },
  { name: "Professionals", value: 3200, color: "hsl(142, 71%, 45%)" },
  { name: "High Networth", value: 450, color: "hsl(38, 92%, 50%)" },
  { name: "Retirees", value: 800, color: "hsl(215, 20%, 65%)" }
];

const systemMetrics = [
  { metric: "API Response Time", value: "245ms", status: "good" },
  { metric: "AA Sync Success", value: "99.2%", status: "excellent" },
  { metric: "Crypto API Uptime", value: "98.7%", status: "good" },
  { metric: "Data Accuracy", value: "99.8%", status: "excellent" }
];

const recentUsers = [
  { id: "1", name: "Rahul Sharma", email: "rahul@email.com", role: "professional", status: "active", joinDate: "2024-01-15" },
  { id: "2", name: "Priya Patel", email: "priya@email.com", role: "student", status: "active", joinDate: "2024-01-14" },
  { id: "3", name: "Amit Kumar", email: "amit@email.com", role: "high_networth", status: "pending", joinDate: "2024-01-13" },
  { id: "4", name: "Sunita Devi", email: "sunita@email.com", role: "retiree", status: "active", joinDate: "2024-01-12" }
];

const Admin = () => {
  const handleComplianceRefresh = () => {
    console.log("Triggering compliance refresh...");
  };

  const handleAuditDownload = () => {
    console.log("Downloading audit trail...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
            <p className="text-muted-foreground mt-1">Monitor platform health and manage users</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleComplianceRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Compliance
            </Button>
            <Button onClick={handleAuditDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Audit
            </Button>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">5,700</div>
              <p className="text-xs text-success">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">99.8%</div>
              <p className="text-xs text-success">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Status</CardTitle>
              <Shield className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Active</div>
              <p className="text-xs text-success">All checks passed</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-warning">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>User Distribution by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.value}</span>
                      <Badge variant={metric.status === 'excellent' ? 'default' : metric.status === 'good' ? 'secondary' : 'destructive'}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Deactivate</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="font-medium">Crypto API Sync Completed</p>
                  <p className="text-sm text-muted-foreground">All wallet balances updated successfully</p>
                </div>
                <span className="text-sm text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <div>
                  <p className="font-medium">Account Aggregator Refresh</p>
                  <p className="text-sm text-muted-foreground">Bank account data synchronized for 1,250 users</p>
                </div>
                <span className="text-sm text-muted-foreground">15 min ago</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                <div>
                  <p className="font-medium">Compliance Check Alert</p>
                  <p className="text-sm text-muted-foreground">SEBI regulation update requires review</p>
                </div>
                <span className="text-sm text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
