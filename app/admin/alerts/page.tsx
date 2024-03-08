import React from 'react';
import { db } from '@/db';
import AlertsList from '@/components/admin/alerts/AlertsList';
import { Button } from '@nextui-org/react';
// import { useRouter } from 'nextjs13-progress';

const AlertsAdminPage = async () => {
	// const router = useRouter();
	const alerts = await db.alert.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<>
			<h1>Alerts</h1>
			<p className="mb-4">
				These are system wide alerts that appear at the top of the homepage. They are shown to all users,
				but can be dismissed by a user and its not shown again. If the user is new, only alerts created
				after them joining are shown to to them.
			</p>
			<AlertsList alerts={alerts} />
			<div className="justify-end mt-4">
				<Button as="a" color="primary" href="/admin/alerts/create">
					Create New Alert
				</Button>
			</div>
		</>
	);
};

export default AlertsAdminPage;
