import { ApplicationChart } from '../ApplicationChart';

export default function ApplicationChartExample() {
  const barData = [
    { name: 'Week 1', value: 5 },
    { name: 'Week 2', value: 8 },
    { name: 'Week 3', value: 6 },
    { name: 'Week 4', value: 9 },
  ];

  const pieData = [
    { name: 'Applied', value: 10 },
    { name: 'Screening', value: 5 },
    { name: 'Interview', value: 3 },
    { name: 'Offer', value: 1 },
    { name: 'Rejected', value: 5 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ApplicationChart data={barData} type="bar" title="Weekly Applications" />
      <ApplicationChart data={pieData} type="pie" title="Status Distribution" />
    </div>
  );
}
