export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { setUserDataCookie, logout, setJWT } from '@/lib/server/auth';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { I_UserPublic } from '@/models/User.types';

import { getAuthUserFromDb, exportPublic } from '@/db/actions/user/helpers';
import { db } from '@/db';

export interface I_ApiAuthResponse extends ApiResponse {
	user?: I_UserPublic;
}

export async function GET(request: NextRequest) {
	try {
		const user = await getAuthUserFromDb();
		if (!user) throw new Error('User not found');

		// Update last seen timesamp and save
		const updatedUser = await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				lastSeen: new Date(), // Set the lastSeen field to the current date
			},
		});
		// console.log('updatedUser::::', updatedUser);
		await setJWT(updatedUser);
		const userData = await exportPublic(updatedUser);
		const response: I_ApiAuthResponse = {
			success: true,
			user: userData,
		};

		// Refresh our userdata cookie in case information was changed elsewhere
		setUserDataCookie(userData);
		// console.log('userData::::', userData);

		return new Response(JSON.stringify(response), {
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (err: any) {
		return apiErrorResponse(err);
	}
}
