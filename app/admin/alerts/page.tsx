import React from 'react';
import { db } from '@/db';
import AlertsList from '@/components/admin/alerts/AlertsList';

const AlertsAdminPage = async () => {
	const alerts = await db.alert.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<>
			<h1>Alerts</h1>
			<AlertsList alerts={alerts} />
		</>
	);
};

export default AlertsAdminPage;
