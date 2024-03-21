import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

// POST: http://localhost:3000/api/paypal
export async function POST(request: NextRequest) {
	try {
		// {orderID: '0G9476059T206172G', subscriptionID: 'I-A9W2NW3MP0PN', facilitatorAccessToken: 'A21AALuvP2HrFDK7LkGiwqBHasXVuKcnIn5jp2a3EbkJHtAT1Xw-70pyj0tNbEGGL12l73zYfBx9mFmLJ5Rv5gW_TKwCxEUZw', paymentSource: 'paypal'}
		const data = await request.json();

		// Save the data to the db

		// Save the data to a file
		const filePath = path.resolve('./api/paypal/data', 'paypal-data.json');

		// Check if the file exists
		if (fs.existsSync(filePath)) {
			// If the file exists, append the data
			fs.appendFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
		} else {
			// If the file does not exist, appendFileSync will create it and append the data
			fs.appendFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
		}
		const response: ApiResponse = {
			success: true,
			message: 'Data saved',
		};

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
