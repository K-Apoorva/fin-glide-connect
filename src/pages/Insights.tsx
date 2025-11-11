import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Lightbulb, Target, AlertCircle, Clock, DollarSign, Shield, ArrowRight, Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { getConcreteInsights } from "@/utils/concreteInsights";

const Insights = () => {
  const { user } = useAuth();
  const insights = user ? getConcreteInsights(user.role) : [];

  const positiveInsights = insights.filter(insight => insight.type === 'positive');
  const warnings = insights.filter(insight => insight.type === 'warning');
  const recommendations = insights.filter(insight => insight.type === 'recommendation');

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'low': return 'text-emerald-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (risk?: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskBg = (risk?: string) => {
    switch (risk) {
      case 'low': return 'bg-emerald-50 border-emerald-200';
      case 'medium': return 'bg-amber-50 border-amber-200';
      case 'high': return 'bg-red-50 border-red-200';
      default: return 'bg-muted/50 border-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Financial Insights</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              AI-powered recommendations with specific investment suggestions for {user?.role.replace('_', ' ')} profile
            </p>
          </div>
        </div>

        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50">
            <TabsTrigger value="recommendations" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="h-4 w-4" />
              Smart Recommendations
            </TabsTrigger>
            <TabsTrigger value="warnings" className="flex items-center gap-2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              <AlertCircle className="h-4 w-4" />
              Areas to Watch
            </TabsTrigger>
            <TabsTrigger value="positive" className="flex items-center gap-2 data-[state=active]:bg-success data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4" />
              Positive Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-8 mt-8">
            <div className="grid gap-8">
              {recommendations.map((insight, index) => (
                <Card key={insight.id} className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary ${getRiskBg(insight.riskLevel)}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-xl">
                          <Lightbulb className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            {insight.title}
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">#{index + 1}</span>
                          </CardTitle>
                          <CardDescription className="text-base">{insight.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={getRiskBadgeVariant(insight.riskLevel)} className="text-xs font-semibold">
                          {insight.riskLevel?.toUpperCase()} RISK
                        </Badge>
                        {insight.expectedReturn && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {insight.expectedReturn}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Market Analysis */}
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Market Analysis
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed">{insight.details}</p>
                    </div>

                    {/* Investment Suggestions */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5 text-primary" />
                        Specific Investment Suggestions
                      </h4>
                      <div className="grid gap-3">
                        {insight.specificSuggestions.map((suggestion, index) => (
                          <div key={index} className="group p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">{index + 1}</span>
                              </div>
                              <p className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors">{suggestion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Plan */}
                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Action Plan
                      </h4>
                      <ul className="space-y-2">
                        {insight.actionItems.map((action, index) => (
                          <li key={index} className="text-sm text-green-800 flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-muted">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{insight.timeframe}</span>
                        </div>
                        {insight.expectedReturn && (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">{insight.expectedReturn}</span>
                          </div>
                        )}
                      </div>
                      <Button size="lg" className="px-6 shadow-md hover:shadow-lg transition-shadow">
                        Start Investing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="warnings" className="space-y-8 mt-8">
            <div className="grid gap-8">
              {warnings.map((insight, index) => (
                <Card key={insight.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-destructive bg-gradient-to-r from-red-50/50 to-orange-50/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-destructive/20 rounded-xl">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2 text-destructive">
                          {insight.title}
                          <span className="text-sm bg-destructive/10 text-destructive px-2 py-1 rounded-full font-semibold">URGENT</span>
                        </CardTitle>
                        <CardDescription className="text-base">{insight.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Why This Matters */}
                    <div className="p-5 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl border border-red-200">
                      <h4 className="font-semibold mb-3 text-red-900 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Why This Matters
                      </h4>
                      <p className="text-sm text-red-800 leading-relaxed">{insight.details}</p>
                    </div>

                    {/* Immediate Solutions */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                        <CheckCircle className="h-5 w-5 text-success" />
                        Immediate Solutions
                      </h4>
                      <div className="grid gap-3">
                        {insight.specificSuggestions.map((suggestion, index) => (
                          <div key={index} className="group p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <p className="text-sm font-medium leading-relaxed text-green-800">{suggestion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Priority Actions */}
                    <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-900">
                        <Target className="h-5 w-5 text-amber-600" />
                        Priority Actions
                      </h4>
                      <ul className="space-y-2">
                        {insight.actionItems.map((action, index) => (
                          <li key={index} className="text-sm text-amber-800 flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-muted">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{insight.timeframe}</span>
                        </div>
                        {insight.expectedReturn && (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">{insight.expectedReturn}</span>
                          </div>
                        )}
                      </div>
                      <Button size="lg" variant="destructive" className="px-6 shadow-md hover:shadow-lg transition-shadow">
                        Take Action
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positive" className="space-y-8 mt-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-success bg-gradient-to-r from-green-50/50 to-emerald-50/50">
              <CardHeader className="pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-success/20 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      Excellent Financial Health
                      <span className="text-sm bg-success/10 text-success px-2 py-1 rounded-full font-semibold">GREAT JOB!</span>
                    </CardTitle>
                    <CardDescription className="text-base">You're excelling in these key areas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                        <Target className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 text-lg">Savings Rate Excellence</h4>
                        <p className="text-sm text-green-700 mt-1">32.7% savings rate - 9% above target</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 text-lg">Portfolio Growth</h4>
                        <p className="text-sm text-blue-700 mt-1">8.2% monthly growth - strong momentum</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 text-lg">Risk Management</h4>
                        <p className="text-sm text-purple-700 mt-1">Well-diversified portfolio across asset classes</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 text-lg">Income Stability</h4>
                        <p className="text-sm text-amber-700 mt-1">Consistent income growth of 6.5% monthly</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-primary text-lg">Keep Up The Great Work!</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your financial discipline is paying off. Continue with your current strategy while exploring 
                        the growth opportunities highlighted in our recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
