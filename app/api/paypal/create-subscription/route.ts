import { getUserId } from '@/db/actions/user/profile';
import { getUserData } from '@/lib/client/auth';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { PayPalSubscription } from '@/prisma/typescript.PayPalSubscription';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

// POST: http://localhost:3000/api/paypal/create-subscription
export async function POST(request: NextRequest) {
	try {
		// {orderID: '0G9476059T206172G', subscriptionID: 'I-A9W2NW3MP0PN', facilitatorAccessToken: 'A21AALuvP2HrFDK7LkGiwqBHasXVuKcnIn5jp2a3EbkJHtAT1Xw-70pyj0tNbEGGL12l73zYfBx9mFmLJ5Rv5gW_TKwCxEUZw', paymentSource: 'paypal'}
		const { orderID, subscriptionID, facilitatorAccessToken, paymentSource }: PayPalSubscription =
			await request.json();

		// get users id
		const user = await getUserId();

		if (!user || !user.id) {
			throw new Error('User not found');
		}

		const data = {
			userId: user.id,
			orderID,
			subscriptionID,
			facilitatorAccessToken,
			paymentSource,
		};

		try {
			// Save the data to a file
			const filePath = path.resolve('./api/paypal/data', 'paypal-create-subscription-data.json');
			fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
		} catch (error) {
			console.error('Failed to save data to file:', error);
		} // end of try-catch

		// Save the data to the db
		const resp = await db.payPalSubscriptionEvent.create({
			data,
		});

		if (!resp) {
			throw new Error('Error saving data to the database');
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
