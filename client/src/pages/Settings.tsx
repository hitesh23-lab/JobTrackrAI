import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Mail, FileSpreadsheet, User, Bell } from "lucide-react";

export default function Settings() {
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
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" data-testid="input-full-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" data-testid="input-email" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" placeholder="Java Fullstack Lead Engineer" defaultValue="Java Fullstack Lead Engineer (11 years)" data-testid="input-title" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="San Francisco, CA" defaultValue="San Francisco, CA" data-testid="input-location" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              placeholder="Brief summary of your experience..."
              rows={4}
              defaultValue="Experienced Java Fullstack Lead Engineer with 11 years of expertise in designing and implementing scalable enterprise applications."
              data-testid="textarea-summary"
            />
          </div>
          
          <Button data-testid="button-save-profile">Save Profile</Button>
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
          
          <Button variant="outline" data-testid="button-reconnect-gmail">Reconnect Gmail</Button>
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
          
          <Button variant="outline" data-testid="button-reconnect-sheets">Reconnect Sheets</Button>
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
