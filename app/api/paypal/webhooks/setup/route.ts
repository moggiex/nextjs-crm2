import { getPaypalAccessToken, paypalApiUrl } from '@/lib/common/paypal';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { NextRequest } from 'next/server';

// POST: http://localhost:3000/api/paypal/webhooks/setup
/**
 * @abstract Sets up the paypal web hooks for notifications about payments and subscriptions
 * @param request NextRequest
 * @param res
 * @returns
 */
export async function POST(request: NextRequest, res) {
	try {
		const url = process.env.NEXT_PUBLIC_HOST_URL as string;
		if (!url || url.includes('localhost')) {
			console.log('You are running on localhost, please update your .env file with your actual host URL');
		}
		const webhookUrl = `${url}/api/paypal/webhooks`;
		const events = [
			'BILLING.SUBSCRIPTION.CREATED',
			'BILLING.SUBSCRIPTION.CANCELLED',
			'PAYMENT.SALE.COMPLETED',
			'PAYMENT.SALE.REFUNDED',
		];

		const accessToken = await getPaypalAccessToken(); // Implement this function to get a PayPal access token

		const response = await fetch(`${paypalApiUrl}/v1/notifications/webhooks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				url: webhookUrl,
				event_types: events.map(event => ({ name: event })),
			}),
		});

		// TODO: Save this as a boolean valye in the database so we know this has been setup

		return new Response(JSON.stringify(response), {
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Failed to save data:', error);
		return apiErrorResponse(err);
	}
}
