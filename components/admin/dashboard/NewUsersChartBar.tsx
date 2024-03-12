'use client';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewUsersChartBar = ({ data }: any) => {
	return <Bar data={data} />;
};

export default NewUsersChartBar;
