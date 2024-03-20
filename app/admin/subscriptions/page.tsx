'use client';
import { useEffect } from 'react';
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

const WrapperPage = ({ children }) => {
	return <PayPalScriptProviderWrapper>{children}</PayPalScriptProviderWrapper>;
};

const thePage = () => {
	return (
		<WrapperPage>
			<SubscriptionsPage type="subscription" />
		</WrapperPage>
	);
};

const SubscriptionsPage = ({ type }) => {
	const [{ options }, dispatch] = usePayPalScriptReducer();

	useEffect(() => {
		dispatch({
			type: 'resetOptions',
			value: {
				...options,
				intent: 'subscription',
			},
		});
	}, [type]);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-1/2">
				<PayPalButtons
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
						console.log(data);
						await fetch('/api/paypal', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						});
						// Use `await` for any asynchronous operations you need to perform
						// For example, if you need to call an API or perform some async task:
						// await someAsyncFunction(data);

						// No need to explicitly return `Promise.resolve()` when using async/await
						// The async function implicitly returns a Promise that resolves when the function completes
					}}
					onCancel={async (data, actions) => {
						// onCancel {orderID: '8LL69672L2676553C'}
						console.log('onCancel');
						console.log(data);
					}}
					onError={err => {
						console.error('onError');
						console.error(err);
					}}
					style={{
						label: 'subscribe',
					}}
				/>
			</div>
			<div className="w-1/2">
				<PayPalButtons
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
