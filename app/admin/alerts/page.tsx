import React, { Suspense } from 'react';
import { db } from '@/db';
import AlertsList from '@/components/admin/alerts/AlertsList';
import { Button, Divider } from '@nextui-org/react';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import { getAlerts } from '@/db/actions/alerts/AlertsHelpers';

const AlertsAdminPage = async () => {
	// const router = useRouter();
	const alerts = await getAlerts();
	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Alerts', href: '/admin/alerts' },
				]}
			/>
			<h1>Alerts</h1>
			<Divider className="mb-4" />
			<p className="mb-4">
				These are system wide alerts that appear at the top of the homepage. They are shown to all users,
				but can be dismissed by a user and its not shown again. If the user is new, only alerts created
				after them joining are shown to to them.
			</p>
			<Suspense fallback={<div>Loading...</div>}>
				<AlertsList alerts={alerts} />
			</Suspense>
			<div className="justify-end mt-4">
				<Button as="a" color="primary" href="/admin/alerts/create">
					Create New Alert
				</Button>
			</div>
		</>
	);
};

export default AlertsAdminPage;
