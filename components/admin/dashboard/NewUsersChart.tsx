// 'use client';
import React from 'react';

import { getUsersCountByDayForMonth } from '@/db/actions/admin/helpers';
import NewUsersChartBar from '@/components/admin/dashboard/NewUsersChartBar';

const NewUsersChart = async () => {
	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	await delay(5000); // 5000 milliseconds = 5 seconds

	const now = new Date();
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

	// return <div>loaded</div>;
	return <NewUsersChartBar data={data} />;
};

export default NewUsersChart;
