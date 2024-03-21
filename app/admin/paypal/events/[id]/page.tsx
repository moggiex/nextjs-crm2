import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import SubmitButton from '@/components/SubmitButton';
import { getPayPalSubscriptionEventById } from '@/db/paypal/helper';
import { Divider, Input } from '@nextui-org/react';
import React from 'react';

const PayPalSubscriptionEventViewPage = async ({ params }: { params: { id?: string } }) => {
	const { id } = params;

	if (!id) {
		return <div>Invalid ID</div>;
	}

	const event = await getPayPalSubscriptionEventById(id);

	if (!event) {
		return <div>Event not found</div>;
	}

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Paypal', href: '/admin/paypal' },
					{ name: 'Paypal Subscription Events', href: '/admin/paypal/events' },
					{ name: 'Events', href: '/admin/paypal/events' },
				]}
			/>
			<h1>View Paypal Subscription Event</h1>
			<Divider className="mb-4" />
			<p className="mb-4">This is data is not editable.</p>
			<form>
				<Input label="userEmail" name="userId" value={event.user.email} disabled className="mb-4" />

				<Input label="userId" name="userId" value={event.userId} disabled className="mb-4" />
				<Input label="id" name="id" value={event.id} disabled className="mb-4" />
				<Input label="OrderId" name="orderId" value={event.orderID} disabled className="mb-4" />
				<Input
					label="SubscriptionID"
					name="subscriptionID"
					value={event.subscriptionID}
					disabled
					className="mb-4"
				/>
				<Input
					label="FacilitatorAccessToken"
					name="facilitatorAccessToken"
					value={event.facilitatorAccessToken}
					disabled
					className="mb-4"
				/>
				<Input
					label="paymentSource"
					name="paymentSource"
					value={event.paymentSource}
					disabled
					className="mb-4"
				/>
				<Input
					label="createdAt"
					name="createdAt"
					value={event.createdAt?.toLocaleDateString()}
					disabled
					className="mb-4"
				/>
				<Input
					label="updatedAt"
					name="updatedAt"
					value={event.updatedAt?.toLocaleDateString()}
					disabled
					className="mb-4"
				/>
				<SubmitButton />
			</form>
		</>
	);
};

export default PayPalSubscriptionEventViewPage;
