import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, type ApplicationStatus } from "./StatusBadge";
import { Building2, MapPin, DollarSign, Mail, ExternalLink } from "lucide-react";

interface JobCardProps {
  id: string;
  company: string;
  title: string;
  location: string;
  salary?: string;
  appliedDate: string;
  daysAgo: number;
  status: ApplicationStatus;
  onViewDetails?: () => void;
  onViewEmails?: () => void;
}

export function JobCard({
  id,
  company,
  title,
  location,
  salary,
  appliedDate,
  daysAgo,
  status,
  onViewDetails,
  onViewEmails,
}: JobCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-job-${id}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight" data-testid={`text-job-title-${id}`}>{title}</h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-company-${id}`}>{company}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        {salary && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        )}
        <div className="pt-2 text-xs text-muted-foreground font-mono">
          Applied: {appliedDate} ({daysAgo}d ago)
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onViewDetails}
          data-testid={`button-view-details-${id}`}
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onViewEmails}
          data-testid={`button-view-emails-${id}`}
        >
          <Mail className="h-4 w-4 mr-1" />
          Emails
        </Button>
      </CardFooter>
    </Card>
  );
}
