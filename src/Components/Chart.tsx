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
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default Chart;
