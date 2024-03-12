'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getUsersCountByDayForMonth } from '@/db/actions/admin/helpers';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewUsersChart = async () => {
	const dailyCounts = await getUsersCountByDayForMonth(now.getFullYear(), now.getMonth());

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

export default NewUsersChart;
