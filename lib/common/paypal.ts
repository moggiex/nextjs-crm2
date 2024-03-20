export const isProduction = process.env.VERCEL_ENV === 'production';
export const clientId = isProduction ? process.env.PAYPAL_LIVE_CLIENT_ID : process.env.PAYPAL_SANDBOX_CLIENT_ID;
const clientSecret = isProduction ? process.env.PAYPAL_LIVE_SECRET : process.env.PAYPAL_SANDBOX_SECRET;
export const paypalApiUrl = isProduction ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com';

export const getPaypalAccessToken = async () => {
	const response = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
		},
		body: 'grant_type=client_credentials',
	});

	// Handle response...
	const data = await response.json(); // Parse the JSON response body

	if (!response.ok) {
		// If the response contains an HTTP error status, throw an error
		throw new Error(`Failed to get PayPal access token: ${data.error_description || data.error}`);
	}

	// Return the access token from the response
	return data.access_token;
};
