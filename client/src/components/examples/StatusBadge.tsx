import { StatusBadge } from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="applied" />
      <StatusBadge status="screening" />
      <StatusBadge status="interview" />
      <StatusBadge status="offer" />
      <StatusBadge status="rejected" />
      <StatusBadge status="withdrawn" />
    </div>
  );
}
