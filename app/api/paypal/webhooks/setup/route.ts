import { getPaypalAccessToken, PAYPAL_API_URL, PAYPAL_WEBHOOKS } from '@/lib/common/paypal';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { NextRequest } from 'next/server';

// POST: http://localhost:3000/api/paypal/webhooks/setup
/**
 * @abstract Sets up the paypal web hooks for notifications about payments and subscriptions
 * @param request NextRequest
 * @param res
 * @returns
 */
export async function POST(request: NextRequest) {
	try {
		const url = process.env.NEXT_PUBLIC_HOST_URL as string;
		// const url = 'https://your-host-url.com';

		if (!url || url.includes('localhost')) {
			const error = {
				message: 'You are running on localhost, please update your .env file with your actual host URL',
			};
			console.error(error);
			return apiErrorResponse(error);
		}

		const accessToken = await getPaypalAccessToken(); // Implement this function to get a PayPal access token

		const requestBody = {
			url: `${url}/api/paypal/webhooks`,
			event_types: PAYPAL_WEBHOOKS.map(({ event }) => ({ name: event })), // Extract just the event names
		};
		console.log('PayPal webhook setup request:', requestBody);

		// return;

		console.log('PayPal webhook setup request:', requestBody);
		const response = await fetch(`${PAYPAL_API_URL}/v1/notifications/webhooks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(requestBody),
		});

		console.log('PayPal webhook setup response:', response);

		// TODO: Save this as a boolean valye in the database so we know this has been setup

		// const response: ApiResponse = {
		// 	success: true,
		// 	message: 'Data saved',
		// };

		return new Response(JSON.stringify(response), {
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Failed to save data:', error);
		return apiErrorResponse(error);
	}
}
