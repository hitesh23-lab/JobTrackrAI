import { StatCard } from '../StatCard';
import { Briefcase, Mail, Calendar, TrendingUp } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Applied" value="24" icon={Briefcase} trend={{ value: "+3 this week", isPositive: true }} />
      <StatCard title="Active" value="18" icon={Mail} trend={{ value: "6 pending", isPositive: true }} />
      <StatCard title="Interviews" value="5" icon={Calendar} trend={{ value: "+2 this week", isPositive: true }} />
      <StatCard title="Response Rate" value="75%" icon={TrendingUp} trend={{ value: "+5% from last month", isPositive: true }} />
    </div>
  );
}
