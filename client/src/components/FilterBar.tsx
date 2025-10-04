import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { type ApplicationStatus } from "./StatusBadge";
import { useState } from "react";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onStatusFilter?: (status: ApplicationStatus | null) => void;
}

const statuses: ApplicationStatus[] = ["applied", "screening", "interview", "offer", "rejected", "withdrawn"];

export function FilterBar({ onSearch, onStatusFilter }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | null>(null);

  const handleStatusClick = (status: ApplicationStatus) => {
    const newStatus = selectedStatus === status ? null : status;
    setSelectedStatus(newStatus);
    onStatusFilter?.(newStatus);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="space-y-4" data-testid="filter-bar">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies, job titles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            data-testid="input-search-jobs"
          />
        </div>
        <Button variant="outline" data-testid="button-advanced-filter">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Badge
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            className="cursor-pointer hover-elevate"
            onClick={() => handleStatusClick(status)}
            data-testid={`filter-status-${status}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {selectedStatus === status && <X className="ml-1 h-3 w-3" />}
          </Badge>
        ))}
      </div>
    </div>
  );
}
