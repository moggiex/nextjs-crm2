import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/server/auth';

// Add whatever paths you want to PROTECT here
const authRoutes = ['/dashboard/*', '/profile/*', '/api/*', '/admin/*'];

// Function to match the * wildcard character
function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

// Function to delete auth cookies and redirect
function deleteCookiesAndRedirect(url: string) {
	const response = NextResponse.redirect(url);
	response.cookies.delete('token');
	response.cookies.delete('userData');
	return response;
}

// Function to delete auth cookies and redirect
function deleteCookiesAndRedirectHome() {
	const response = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
	response.cookies.delete('token');
	response.cookies.delete('userData');
	return response;
}

export async function middleware(request: NextRequest) {
	// Shortcut for our login path redirect
	// Note: you must use absolute URLs for middleware redirects
	const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login?redirect=${
		request.nextUrl.pathname + request.nextUrl.search
	}`;

	if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
		const token = request.cookies.get('token');

		// Add exceptions for public routes here
		if (request.nextUrl.pathname.startsWith('/api/auth')) {
			return NextResponse.next();
		}
		if (request.nextUrl.pathname.startsWith('/api/paypal')) {
			return NextResponse.next();
		}
		// For API routes, we want to return unauthorized instead of
		// redirecting to login
		if (request.nextUrl.pathname.startsWith('/api')) {
			if (!token) {
				const response: ApiResponse = {
					success: false,
					message: 'Unauthorized API Access',
				};
				return NextResponse.json(response, { status: 401 });
			}
		}
		// If no token exists, redirect to login
		if (!token) {
			return deleteCookiesAndRedirect(LOGIN);
		}
		try {
			// Decode and verify JWT cookie
			//	q: is the value of payload secure?

			const payload = await verifyJwtToken(token.value);
			if (!payload) {
				return deleteCookiesAndRedirect(LOGIN);
			}

			// console.log('Payload:', payload);

			// If you have an admin role and path, secure it here
			if (request.nextUrl.pathname.startsWith('/admin')) {
				if (payload.role !== 'Admin' || payload.isAdmin !== true) {
					return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);
				}
			}
		} catch (error) {
			console.error(error);
			return deleteCookiesAndRedirect(LOGIN);
		}
	}
	let redirectToApp = false;
	// Redirect login to app if already logged in
	if (request.nextUrl.pathname === '/auth/login') {
		const token = request.cookies.get('token');
		if (token) {
			try {
				const payload = await verifyJwtToken(token.value);
				if (payload) {
					redirectToApp = true;
				} else {
					return deleteCookiesAndRedirect(LOGIN);
				}
			} catch (error) {
				return deleteCookiesAndRedirect(LOGIN);
			}
		}
	}

	// Forgot password, make sure they are not logged in
	if (request.nextUrl.pathname === '/auth/forgot-password') {
		const token = request.cookies.get('token');
		if (token) {
			try {
				const payload = await verifyJwtToken(token.value);
				if (payload) {
					return deleteCookiesAndRedirectHome();
					// return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
				}
			} catch (error) {
				return deleteCookiesAndRedirectHome();
			}
		}
	}

	if (redirectToApp) {
		// Redirect to app dashboard
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
	} else {
		// Return the original response unaltered
		return NextResponse.next();
	}
}
