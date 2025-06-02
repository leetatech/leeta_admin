import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      min: 0,
      max: 70000,
      valueFormatter: (value: number) => `₦${value.toLocaleString()}`,
    },
  ],
  height: 250,
};

const dataset = [
  { region: 'North', amount: 3000 },
  { region: 'South', amount: 45000 },
  { region: 'Midwest', amount: 20000 },
  { region: 'West', amount: 50000 },
  { region: 'South East', amount: 15000 },
  { region: 'North West', amount: 60000 },
];

export default function RegionalBarChart() {
  return (
    <div style={{ overflowX: 'auto', padding: '8px', maxWidth: '100%' }}>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'region' }]}
        series={[
          {
            dataKey: 'amount',
            label: 'sales by region',
            color: 'url(#barGradient)', 
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      >
       
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4584E9" />
            <stop offset="100%" stopColor="#8DB5F6" />
          </linearGradient>
        </defs>
      </BarChart>
    </div>
  );
}