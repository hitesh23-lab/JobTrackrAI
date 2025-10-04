import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar, XCircle, MinusCircle, Send } from "lucide-react";

export type ApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig = {
  applied: {
    label: "Applied",
    icon: Send,
    className: "bg-primary/15 text-primary hover:bg-primary/25",
  },
  screening: {
    label: "Screening",
    icon: Clock,
    className: "bg-warning/15 text-warning hover:bg-warning/25",
  },
  interview: {
    label: "Interview",
    icon: Calendar,
    className: "bg-info/15 text-info hover:bg-info/25",
  },
  offer: {
    label: "Offer",
    icon: CheckCircle,
    className: "bg-success/15 text-success hover:bg-success/25",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-destructive/15 text-destructive hover:bg-destructive/25",
  },
  withdrawn: {
    label: "Withdrawn",
    icon: MinusCircle,
    className: "bg-muted/15 text-muted-foreground hover:bg-muted/25",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} gap-1`} data-testid={`badge-status-${status}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
