import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mail, Calendar, CheckCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "applied" | "email" | "interview" | "offer";
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityConfig = {
  applied: { icon: Send, color: "text-primary" },
  email: { icon: Mail, color: "text-info" },
  interview: { icon: Calendar, color: "text-warning" },
  offer: { icon: CheckCircle, color: "text-success" },
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card data-testid="card-activity-feed">
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="relative flex gap-3" data-testid={`activity-item-${activity.id}`}>
              {index < activities.length - 1 && (
                <div className="absolute left-4 top-10 h-full w-px bg-border" />
              )}
              <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1 pb-4">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground font-mono">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
