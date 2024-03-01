// src/app/auth/create/route.ts
import { NextResponse, NextRequest } from 'next/server';
import * as helpers from '@/db/helpers';
import { setUserDataCookie, setJWT, checkTurnstileToken } from '@/lib/server/auth';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';

export interface I_ApiUserCreateRequest {
	firstName: string;
	email: string;
	password: string;
	tsToken: string;
	code?: string;
}

export interface I_ApiUserCreateResponse extends ApiResponse {}

export const dynamic = 'force-dynamic';

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const isDev = process.env.NODE_ENV === 'development';
	const body = (await request.json()) as I_ApiUserCreateRequest;

	// trim all input values
	const { firstName, email, password, tsToken } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiUserCreateRequest;

	if (!firstName || !email || !password) {
		const res: I_ApiUserCreateResponse = {
			success: false,
			message: 'Either your name, email or password is missing',
		};
		return NextResponse.json(res, { status: 400 });
	}

	// We won't require Turnstile in development mode
	if (!isDev) {
		if (!tsToken) {
			const res: I_ApiUserCreateResponse = {
				success: false,
				message: 'Missing Turnstile token',
			};
			return NextResponse.json(res, { status: 400 });
		}
		const isTurnstileTokenValid = await checkTurnstileToken(tsToken);
		if (!isTurnstileTokenValid) {
			const res: I_ApiUserCreateResponse = {
				success: false,
				message: 'Invalid Turnstile token',
			};
			return NextResponse.json(res, { status: 400 });
		}
	}

	try {
		// Fetch our user from the database
		// WTF???
		const user = await helpers.createAccount(firstName, email, password);

		// create our response object
		const res: I_ApiUserCreateResponse = {
			success: true,
		};
		const response = NextResponse.json(res);

		// Store public user data as a cookie
		// TODO: Is this missing the user?
		const userData = helpers.exportPublic(user);

		// Set auth cookies
		setUserDataCookie(userData);
		await setJWT(userData);

		return response;
	} catch (err: any) {
		return apiErrorResponse(err);
	}
}
