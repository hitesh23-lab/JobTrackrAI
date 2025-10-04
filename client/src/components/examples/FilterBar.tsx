import { FilterBar } from '../FilterBar';

export default function FilterBarExample() {
  return (
    <FilterBar
      onSearch={(query) => console.log('Search:', query)}
      onStatusFilter={(status) => console.log('Filter status:', status)}
    />
  );
}
