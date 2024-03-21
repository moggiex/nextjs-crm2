export const isProduction = process.env.VERCEL_ENV === 'production';
export const PAYPAL_CLIENT_ID = isProduction
	? process.env.PAYPAL_LIVE_CLIENT_ID
	: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID;
export const PAYPAL_API_URL = isProduction ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com';
// do not expose as an export
const PAYPAL_CLIENT_SECRET = isProduction ? process.env.PAYPAL_LIVE_SECRET : process.env.PAYPAL_SANDBOX_SECRET;

type PaypalWebhook = {
	event: string;
	comment: string;
};

export const PAYPAL_WEBHOOKS: PaypalWebhook[] = [
	// These happen because us in the Paypal
	{ event: 'CATALOG.PRODUCT.CREATED', comment: 'A product is created. Create product' },
	{ event: 'CATALOG.PRODUCT.UPDATED', comment: 'A product is updated. Update product' },
	{ event: 'BILLING.PLAN.CREATED', comment: 'A billing plan is created. Create plan' },
	{ event: 'BILLING.PLAN.UPDATED', comment: 'A billing plan is updated. Update plan' },
	{ event: 'BILLING.PLAN.ACTIVATED', comment: 'A billing plan is activated. Activate plan' },
	{
		event: 'BILLING.PLAN.PRICING-CHANGE.ACTIVATED',
		comment: 'A price change for the plan is activated. Update pricing',
	},
	{ event: 'BILLING.PLAN.DEACTIVATED', comment: 'A billing plan is deactivated. Deactivate plan' },

	// These happen because of the user
	{ event: 'PAYMENT.SALE.COMPLETED', comment: 'A payment is made on a subscription.' },
	{ event: 'PAYMENT.SALE.REFUNDED', comment: 'A merchant refunds a sale.' },
	{ event: 'PAYMENT.SALE.REVERSED', comment: 'A payment is reversed on a subscription.' },

	{ event: 'BILLING.SUBSCRIPTION.CREATED', comment: 'A subscription is created. Create subscription' },
	{ event: 'BILLING.SUBSCRIPTION.ACTIVATED', comment: 'A subscription is activated. Activate subscription' },
	{ event: 'BILLING.SUBSCRIPTION.UPDATED', comment: 'A subscription is updated. Update subscription' },
	{ event: 'BILLING.SUBSCRIPTION.EXPIRED', comment: 'A subscription expires. Show subscription details' },
	{ event: 'BILLING.SUBSCRIPTION.CANCELLED', comment: 'A subscription is cancelled. Cancel subscription' },
	{ event: 'BILLING.SUBSCRIPTION.SUSPENDED', comment: 'A subscription is suspended. Suspend subscription' },
	{
		event: 'BILLING.SUBSCRIPTION.PAYMENT.FAILED',
		comment: 'Payment failed on subscription. Subscription failed payment details',
	},
];

export const getPaypalAccessToken = async () => {
	const url = `${PAYPAL_API_URL}/v1/oauth2/token`;
	// console.log(url);
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64'),
		},
		body: 'grant_type=client_credentials',
	});

	// Handle response...
	const data = await response.json(); // Parse the JSON response body

	// console.log('PayPal access token response:', data);

	if (!response.ok) {
		// If the response contains an HTTP error status, throw an error
		throw new Error(`Failed to get PayPal access token: ${data.error_description || data.error}`);
	}

	// Return the access token from the response
	return data.access_token;
};
