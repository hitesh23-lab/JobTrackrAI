import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Mail, FileSpreadsheet, User, Bell } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "@shared/schema";

export default function Settings() {
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!profile?.id) return;
      return await apiRequest(`/api/profile/${profile.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateProfileMutation.mutate({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      title: formData.get("title"),
      location: formData.get("location"),
      summary: formData.get("summary"),
    });
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and integration settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Your professional details for job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  placeholder="John Doe" 
                  defaultValue={profile?.fullName} 
                  data-testid="input-full-name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="john@example.com" 
                  defaultValue={profile?.email} 
                  data-testid="input-email" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input 
                id="title" 
                name="title"
                placeholder="Java Fullstack Lead Engineer" 
                defaultValue={profile?.title} 
                data-testid="input-title" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location"
                placeholder="San Francisco, CA" 
                defaultValue={profile?.location} 
                data-testid="input-location" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="Brief summary of your experience..."
                rows={4}
                defaultValue={profile?.summary}
                data-testid="textarea-summary"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={updateProfileMutation.isPending}
              data-testid="button-save-profile"
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Gmail Integration
          </CardTitle>
          <CardDescription>Manage email tracking and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Connection Status</p>
              <p className="text-xs text-muted-foreground">Sync application emails automatically</p>
            </div>
            <Badge variant="outline" className="gap-1 bg-success/10 text-success">
              <div className="h-2 w-2 rounded-full bg-success" />
              Connected
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Auto-track responses</p>
              <p className="text-xs text-muted-foreground">Automatically update status from emails</p>
            </div>
            <Switch defaultChecked data-testid="switch-auto-track" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-muted-foreground">Get notified of new responses</p>
            </div>
            <Switch defaultChecked data-testid="switch-email-notifications" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Google Sheets Integration
          </CardTitle>
          <CardDescription>Manage spreadsheet synchronization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Connection Status</p>
              <p className="text-xs text-muted-foreground">Sync applications to spreadsheet</p>
            </div>
            <Badge variant="outline" className="gap-1 bg-success/10 text-success">
              <div className="h-2 w-2 rounded-full bg-success" />
              Connected
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Auto-sync applications</p>
              <p className="text-xs text-muted-foreground">Automatically log new applications</p>
            </div>
            <Switch defaultChecked data-testid="switch-auto-sync" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Sync frequency</p>
              <p className="text-xs text-muted-foreground">Real-time updates</p>
            </div>
            <Badge variant="secondary">Real-time</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">New application responses</p>
              <p className="text-xs text-muted-foreground">Email when recruiters reply</p>
            </div>
            <Switch defaultChecked data-testid="switch-notify-responses" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Interview reminders</p>
              <p className="text-xs text-muted-foreground">24 hours before scheduled interviews</p>
            </div>
            <Switch defaultChecked data-testid="switch-notify-interviews" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Weekly summary</p>
              <p className="text-xs text-muted-foreground">Application progress report every Monday</p>
            </div>
            <Switch data-testid="switch-notify-weekly" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
