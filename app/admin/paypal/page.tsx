'use client';
import { useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PayPalScriptProviderWrapper from '@/components/paypal/PayPalScriptProviderWrapper';
/**
 * SANDBOX:
 *  https://www.sandbox.paypal.com/billing/plans
 * Bronze: P-0HP19123C9159423MMX5MORA
 * Silver: P-2S2130582W077020PMX5MPWA
 * sb-zj554329913563@personal.example.com
 * kHM0&,4g

 * LIVE:
 * P-50B69321AW0063646MX4GSZA
Silver plan name
Silver Plan

P-6CF12634K75782638MX4GRTY
basic subscription plan
 */

type WrapperPageProps = {
	children: React.ReactNode;
};

const WrapperPage: React.FC<WrapperPageProps> = ({ children }) => {
	return <PayPalScriptProviderWrapper>{children}</PayPalScriptProviderWrapper>;
};

const thePage = () => {
	return (
		<WrapperPage>
			<SubscriptionsPage />
		</WrapperPage>
	);
};

const SubscriptionsPage = () => {
	const [{ options }, dispatch] = usePayPalScriptReducer();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');

	useEffect(() => {
		dispatch({
			type: 'resetOptions',
			value: {
				...options,
				intent: 'subscription',
			},
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-1/2">
				<PayPalButtons
					key={'P-0HP19123C9159423MMX5MORA'}
					createSubscription={async (data, actions) => {
						const orderId = await actions.subscription.create({
							plan_id: 'P-0HP19123C9159423MMX5MORA',
						});
						// Your code here after create the order
						return orderId;
					}}
					onApprove={async (data, actions) => {
						// onApprove {orderID: '0G9476059T206172G', subscriptionID: 'I-A9W2NW3MP0PN', facilitatorAccessToken: 'A21AALuvP2HrFDK7LkGiwqBHasXVuKcnIn5jp2a3EbkJHtAT1Xw-70pyj0tNbEGGL12l73zYfBx9mFmLJ5Rv5gW_TKwCxEUZw', paymentSource: 'paypal'}
						console.log('onApprove');
						// console.log(data);
						const resp = await fetch('/api/paypal/create-subscription', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						});

						setSuccessMessage('Subscription process successful. Welcome aboard!');
					}}
					onCancel={async (data, actions) => {
						// onCancel {orderID: '8LL69672L2676553C'}
						setErrorMessage('Subscription process cancelled, please try again.');
						// console.log('onCancel');
						// console.log(data);
					}}
					onError={err => {
						console.error('onError');
						console.error(err);
						setErrorMessage('An error ocuured, please try again.');
					}}
					style={{
						label: 'subscribe',
					}}
					onClick={() => {
						setErrorMessage('');
						setSuccessMessage('');
					}}
				/>
			</div>

			{errorMessage && <div className="text-red-500">{errorMessage}</div>}
			{successMessage && <div className="text-green-500">{successMessage}</div>}
			<div className="w-1/2">
				<PayPalButtons
					key={'P-2S2130582W077020PMX5MPWA'}
					createSubscription={(data, actions) => {
						return actions.subscription
							.create({
								plan_id: 'P-2S2130582W077020PMX5MPWA',
							})
							.then(orderId => {
								// Your code here after create the order
								return orderId;
							});
					}}
					style={{
						label: 'subscribe',
					}}
					// onApprove={(data, actions => {
					// 	alert('You have successfully created subscription ' + data.subscriptionID);
					// }}
				/>
			</div>
		</div>
	);
};
export default thePage;
