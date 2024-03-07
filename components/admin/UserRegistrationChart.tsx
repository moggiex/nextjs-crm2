'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsersRegistrationChart = ({ dailyCounts }) => {
	const labels = Object.keys(dailyCounts);
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'User Registrations',
				// data: labels.map(label => dailyCounts[label]),
				data: labels.map(label => dailyCounts[label]),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return <Bar data={data} />;
};

export default UsersRegistrationChart;
