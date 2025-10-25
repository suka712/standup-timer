import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import type { Attendee } from '../type/types';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ChartProps = {
  attendees: Attendee[];
};

const Chart = ({ attendees }: ChartProps) => {
  console.log(attendees);
  const data = {
    labels: attendees.map((a) => a.name),
    datasets: [
      {
        label: 'Intervals',
        data: attendees.map((a) => a.interval),
        backgroundColor: '#646cff',
        borderRadius: 8,

        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: {
        display: false, // hide the legend if not needed
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#ddd',
        borderColor: '#646cff',
        borderWidth: 1,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div style={{ width: 600 }}>
      <Bar
        data={data}
        options={options}
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default Chart;
