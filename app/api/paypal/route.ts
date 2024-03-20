import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

// POST: http://localhost:3000/api/paypal
export async function POST(request: NextRequest, res) {
	try {
		// {orderID: '0G9476059T206172G', subscriptionID: 'I-A9W2NW3MP0PN', facilitatorAccessToken: 'A21AALuvP2HrFDK7LkGiwqBHasXVuKcnIn5jp2a3EbkJHtAT1Xw-70pyj0tNbEGGL12l73zYfBx9mFmLJ5Rv5gW_TKwCxEUZw', paymentSource: 'paypal'}
		const data = await request.json();
		const filePath = path.resolve('./data', 'paypal-data.json');
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
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
		return apiErrorResponse(err);
	}
}

// export async function handler(req, res) {
// 	if (req.method === 'POST') {
// 		try {
// 			const data = req.body;
// 			const filePath = path.resolve('./data', 'paypal-data.json');
// 			fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
// 			res.status(200).json({ message: 'Data saved successfully' });
// 		} catch (error) {
// 			res.status(500).json({ error: 'Failed to save data' });
// 		}
// 	} else {
// 		res.setHeader('Allow', ['POST']);
// 		res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }
