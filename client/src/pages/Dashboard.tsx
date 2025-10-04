import { StatCard } from "@/components/StatCard";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ApplicationChart } from "@/components/ApplicationChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Mail, Calendar, TrendingUp, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Application } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: applications = [], isLoading: applicationsLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/applications", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsDialogOpen(false);
      toast({
        title: "Application Added",
        description: "Your application has been saved and synced to Google Sheets.",
      });
    },
  });

  const syncEmailsMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      return await apiRequest(`/api/applications/${applicationId}/sync-emails`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Emails Synced",
        description: "Email communications have been updated from Gmail.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createApplicationMutation.mutate({
      company: formData.get("company"),
      title: formData.get("title"),
      location: formData.get("location"),
      salary: formData.get("salary"),
      jobUrl: formData.get("jobUrl"),
      status: "applied",
      notes: formData.get("notes"),
    });
  };

  const filteredJobs = applications.filter(job => {
    const matchesSearch = !searchQuery || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getDaysAgo = (date: Date) => {
    const now = new Date();
    const appliedDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - appliedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const statusData = [
    { name: 'Applied', value: applications.filter(a => a.status === 'applied').length },
    { name: 'Screening', value: applications.filter(a => a.status === 'screening').length },
    { name: 'Interview', value: applications.filter(a => a.status === 'interview').length },
    { name: 'Offer', value: applications.filter(a => a.status === 'offer').length },
    { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length },
  ];

  const recentActivities = applications
    .slice(0, 5)
    .map(app => ({
      id: app.id,
      type: app.status === 'interview' ? 'interview' as const : 
            app.status === 'offer' ? 'offer' as const : 'applied' as const,
      title: `${app.status === 'interview' ? 'Interview' : app.status === 'offer' ? 'Offer' : 'Applied'} - ${app.company}`,
      description: app.title,
      timestamp: `${getDaysAgo(app.appliedDate)} days ago`,
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your Java Fullstack Lead Engineer job applications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-application">
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Application</DialogTitle>
              <DialogDescription>
                Add a new job application to track. It will be automatically synced to Google Sheets.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input id="company" name="company" required data-testid="input-company" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input id="title" name="title" required data-testid="input-title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" required data-testid="input-location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" name="salary" placeholder="e.g., $180k - $250k" data-testid="input-salary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job URL</Label>
                <Input id="jobUrl" name="jobUrl" type="url" placeholder="https://..." data-testid="input-job-url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={3} data-testid="textarea-notes" />
              </div>
              <Button type="submit" className="w-full" disabled={createApplicationMutation.isPending} data-testid="button-submit-application">
                {createApplicationMutation.isPending ? "Adding..." : "Add Application"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Applied" value={stats?.totalApplied || 0} icon={Briefcase} />
        <StatCard title="Active" value={stats?.active || 0} icon={Mail} />
        <StatCard title="Interviews" value={stats?.interviews || 0} icon={Calendar} />
        <StatCard title="Response Rate" value={stats?.responseRate || "0%"} icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <FilterBar
            onSearch={setSearchQuery}
            onStatusFilter={setStatusFilter}
          />

          {applicationsLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading applications...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No applications found. Click "Add Application" to get started.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  company={job.company}
                  title={job.title}
                  location={job.location}
                  salary={job.salary || undefined}
                  appliedDate={new Date(job.appliedDate).toISOString().split('T')[0]}
                  daysAgo={getDaysAgo(job.appliedDate)}
                  status={job.status as any}
                  onViewDetails={() => console.log('View details:', job.id)}
                  onViewEmails={() => syncEmailsMutation.mutate(job.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ActivityFeed activities={recentActivities} />
          <ApplicationChart data={statusData} type="pie" title="Status Distribution" />
        </div>
      </div>
    </div>
  );
}
