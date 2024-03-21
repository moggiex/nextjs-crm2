'use server';
import PayPalEventsTable from '@/components/admin/paypal/PayPalEventsTable';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import { getPayPalSubscriptionEvents } from '@/db/paypal/helper';
import { Divider } from '@nextui-org/react';

import React, { Suspense } from 'react';

const PayPalSubscriptionEventsPage = async () => {
	const events = await getPayPalSubscriptionEvents();

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Paypal', href: '/admin/paypal' },
					{ name: 'Paypal Subscription Events', href: '/admin/paypal/events' },
				]}
			/>
			<h1>Payapl Subscription Events</h1>
			<Divider className="mb-4" />
			<Suspense fallback={<div>Loading...</div>}>{<PayPalEventsTable events={events} />}</Suspense>
		</>
	);
};

export default PayPalSubscriptionEventsPage;
