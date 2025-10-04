import { JobCard } from '../JobCard';

export default function JobCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <JobCard
        id="1"
        company="Google"
        title="Senior Java Fullstack Engineer"
        location="Mountain View, CA"
        salary="$180k - $250k"
        appliedDate="2025-10-01"
        daysAgo={3}
        status="interview"
        onViewDetails={() => console.log('View details clicked')}
        onViewEmails={() => console.log('View emails clicked')}
      />
      <JobCard
        id="2"
        company="Amazon"
        title="Lead Software Engineer - Java"
        location="Seattle, WA"
        salary="$170k - $240k"
        appliedDate="2025-09-28"
        daysAgo={6}
        status="screening"
        onViewDetails={() => console.log('View details clicked')}
        onViewEmails={() => console.log('View emails clicked')}
      />
      <JobCard
        id="3"
        company="Meta"
        title="Java Engineering Lead"
        location="Menlo Park, CA"
        salary="$190k - $280k"
        appliedDate="2025-09-25"
        daysAgo={9}
        status="applied"
        onViewDetails={() => console.log('View details clicked')}
        onViewEmails={() => console.log('View emails clicked')}
      />
    </div>
  );
}
