import { StatCard } from "@/components/StatCard";
import { ApplicationChart } from "@/components/ApplicationChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Clock, Award, Calendar as CalendarIcon } from "lucide-react";

export default function Analytics() {
  const weeklyData = [
    { name: 'Mon', value: 3 },
    { name: 'Tue', value: 5 },
    { name: 'Wed', value: 4 },
    { name: 'Thu', value: 6 },
    { name: 'Fri', value: 7 },
    { name: 'Sat', value: 2 },
    { name: 'Sun', value: 1 },
  ];

  const statusData = [
    { name: 'Applied', value: 10 },
    { name: 'Screening', value: 8 },
    { name: 'Interview', value: 5 },
    { name: 'Offer', value: 1 },
    { name: 'Rejected', value: 6 },
  ];

  const responseTimeData = [
    { name: 'Google', value: 3 },
    { name: 'Amazon', value: 5 },
    { name: 'Meta', value: 4 },
    { name: 'Microsoft', value: 6 },
    { name: 'Netflix', value: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights into your job search performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-period-7">Last 7 days</Button>
          <Button variant="outline" size="sm" data-testid="button-period-30">Last 30 days</Button>
          <Button variant="default" size="sm" data-testid="button-period-90">Last 90 days</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Applications Sent" value="28" icon={TrendingUp} trend={{ value: "+12% from last period", isPositive: true }} />
        <StatCard title="Response Rate" value="75%" icon={Target} trend={{ value: "+8% improvement", isPositive: true }} />
        <StatCard title="Avg Response Time" value="4.2 days" icon={Clock} trend={{ value: "-1 day faster", isPositive: true }} />
        <StatCard title="Interview Rate" value="25%" icon={Award} trend={{ value: "+5% improvement", isPositive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationChart data={weeklyData} type="bar" title="Applications This Week" />
        <ApplicationChart data={statusData} type="pie" title="Current Status Distribution" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationChart data={responseTimeData} type="bar" title="Average Response Time (Days)" />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Strong Response Rate</p>
                  <p className="text-xs text-muted-foreground">Your response rate is 15% above average for Java roles</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-info/10">
                  <Clock className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium">Optimal Application Time</p>
                  <p className="text-xs text-muted-foreground">Best results when applying Tuesday-Thursday mornings</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
                  <CalendarIcon className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium">Interview Success</p>
                  <p className="text-xs text-muted-foreground">80% of your interviews lead to next rounds</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
