import { ActivityFeed } from '../ActivityFeed';

export default function ActivityFeedExample() {
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
  ];

  return <ActivityFeed activities={mockActivities} />;
}
