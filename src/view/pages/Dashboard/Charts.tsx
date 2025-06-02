import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const rawData = [
  { value: 5, label: 'Ikorodu' },
  { value: 10, label: 'Ikeja' },
  { value: 15, label: 'Lagos Island' },
];

const sortedData = [...rawData].sort((a, b) => b.value - a.value);
const colors = ['#1C57B6', '#8DB5F6', '#F0F6FF'];

const coloredData = sortedData.map((entry, index) => ({
  ...entry,
  color: colors[index],
}));

const size = {
  width: 300,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'revert',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

// Total amount in naira to split
const totalAmount = 153521.50;

export default function PieChartWithCenterLabel() {
  const totalValue = coloredData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart
        series={[
          {
            data: coloredData.map(({ label, ...rest }) => rest), // remove label from chart
            innerRadius: 80,
            outerRadius: 110,
          },
        ]}
        {...size}
      >
        <PieCenterLabel>₦153,521.50</PieCenterLabel>
      </PieChart>

      {/* Custom legend below chart */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginTop: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {coloredData.map((entry, idx) => {
          const amount = ((entry.value / totalValue) * totalAmount).toFixed(2);
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: entry.color,
                    borderRadius: '50%',
                  }}
                />
                <span>{entry.label}</span>
              </div>
              <div>₦{amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}