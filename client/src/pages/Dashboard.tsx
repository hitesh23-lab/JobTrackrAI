import { StatCard } from "@/components/StatCard";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ApplicationChart } from "@/components/ApplicationChart";
import { Briefcase, Mail, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const mockJobs = [
    {
      id: "1",
      company: "Google",
      title: "Senior Java Fullstack Engineer",
      location: "Mountain View, CA",
      salary: "$180k - $250k",
      appliedDate: "2025-10-01",
      daysAgo: 3,
      status: "interview" as const,
    },
    {
      id: "2",
      company: "Amazon",
      title: "Lead Software Engineer - Java",
      location: "Seattle, WA",
      salary: "$170k - $240k",
      appliedDate: "2025-09-28",
      daysAgo: 6,
      status: "screening" as const,
    },
    {
      id: "3",
      company: "Meta",
      title: "Java Engineering Lead",
      location: "Menlo Park, CA",
      salary: "$190k - $280k",
      appliedDate: "2025-09-25",
      daysAgo: 9,
      status: "applied" as const,
    },
    {
      id: "4",
      company: "Microsoft",
      title: "Principal Software Engineer - Java",
      location: "Redmond, WA",
      salary: "$185k - $260k",
      appliedDate: "2025-09-22",
      daysAgo: 12,
      status: "screening" as const,
    },
    {
      id: "5",
      company: "Netflix",
      title: "Senior Backend Engineer - Java",
      location: "Los Gatos, CA",
      salary: "$200k - $300k",
      appliedDate: "2025-09-20",
      daysAgo: 14,
      status: "offer" as const,
    },
    {
      id: "6",
      company: "Apple",
      title: "Java Fullstack Lead Engineer",
      location: "Cupertino, CA",
      salary: "$195k - $270k",
      appliedDate: "2025-09-18",
      daysAgo: 16,
      status: "rejected" as const,
    },
  ];

  const mockActivities = [
    {
      id: "1",
      type: "interview" as const,
      title: "Interview Scheduled",
      description: "Google - Senior Java Fullstack Engineer",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "email" as const,
      title: "New Email Received",
      description: "Amazon recruiter responded to your application",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "applied" as const,
      title: "Application Submitted",
      description: "Meta - Java Engineering Lead",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "offer" as const,
      title: "Offer Received",
      description: "Netflix - Senior Backend Engineer",
      timestamp: "2 days ago",
    },
  ];

  const weeklyData = [
    { name: 'Week 1', value: 5 },
    { name: 'Week 2', value: 8 },
    { name: 'Week 3', value: 6 },
    { name: 'Week 4', value: 9 },
  ];

  const statusData = [
    { name: 'Applied', value: 10 },
    { name: 'Screening', value: 8 },
    { name: 'Interview', value: 5 },
    { name: 'Offer', value: 1 },
    { name: 'Rejected', value: 6 },
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your Java Fullstack Lead Engineer job applications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Applied" value="24" icon={Briefcase} trend={{ value: "+3 this week", isPositive: true }} />
        <StatCard title="Active" value="18" icon={Mail} trend={{ value: "6 pending", isPositive: true }} />
        <StatCard title="Interviews" value="5" icon={Calendar} trend={{ value: "+2 this week", isPositive: true }} />
        <StatCard title="Response Rate" value="75%" icon={TrendingUp} trend={{ value: "+5% from last month", isPositive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <FilterBar
            onSearch={setSearchQuery}
            onStatusFilter={setStatusFilter}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onViewDetails={() => console.log('View details:', job.id)}
                onViewEmails={() => console.log('View emails:', job.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <ActivityFeed activities={mockActivities} />
          <ApplicationChart data={statusData} type="pie" title="Status Distribution" />
        </div>
      </div>

      <ApplicationChart data={weeklyData} type="bar" title="Weekly Application Trends" />
    </div>
  );
}
