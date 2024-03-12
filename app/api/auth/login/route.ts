// src/app/auth/login/route.ts
// export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextResponse, NextRequest } from 'next/server';
// import { User } from '@/models/associations';
import { login as userLogin, exportPublic } from '@/db/actions/user/helpers';
import { setUserDataCookie, setJWT, checkTurnstileToken } from '@/lib/server/auth';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';

export interface I_ApiUserLoginRequest {
	login: string;
	password: string;
	tsToken: string;
	code?: string;
}

export interface I_ApiUserLoginResponse extends ApiResponse {}

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const isDev = process.env.NODE_ENV === 'development';
	const body = (await request.json()) as I_ApiUserLoginRequest;

	// trim all input values
	const { login, password, tsToken } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiUserLoginRequest;

	if (!login || !password) {
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: 'Either login or password is missing',
		};
		return NextResponse.json(res, { status: 400 });
	}

	// We won't require Turnstile in development mode
	if (!isDev) {
		if (!tsToken) {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Missing Turnstile token',
			};
			return NextResponse.json(res, { status: 400 });
		}
		const isTurnstileTokenValid = await checkTurnstileToken(tsToken);
		if (!isTurnstileTokenValid) {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Invalid Turnstile token',
			};
			return NextResponse.json(res, { status: 400 });
		}
	}

	try {
		// Fetch our user from the database
		const resp = await userLogin(login, password);

		// console.log(resp);

		if (!resp || resp?.success === false) {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: resp.message,
			};
			return NextResponse.json(resp, { status: 400 });
		}
		// create our response object
		const res: I_ApiUserLoginResponse = {
			success: true,
		};
		const response = NextResponse.json(res);

		// Store public user data as a cookie
		// console.log(resp);
		const userData = await exportPublic(resp);

		// console.log(userData);
		// Set auth cookies
		setUserDataCookie(userData);
		await setJWT(userData);

		// console.log(userData);

		return response;
	} catch (err: any) {
		return apiErrorResponse(err);
	}
}
