'use client';
import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'nextjs13-progress';

import Turnstile from 'react-hook-turnstile';

import { I_ApiUserCreateRequest, I_ApiUserCreateResponse } from '../auth/create/route';
import Link from 'next/link';

export default function CreatePage() {
	const isDev = process.env.NODE_ENV === 'development';

	// let containerHeight = '510px';
	// if (isDev) {
	// 	containerHeight = '420px';
	// }

	const { userData, loadUserData, isLoading, setIsLoading } = useApp();
	const router = useRouter();

	// Utils
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	// Refs
	const firstName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordRef2 = useRef<HTMLInputElement>(null);

	// State
	const [error, setError] = useState('');
	const [loginIsComplete, setLoginIsComplete] = useState(false);
	const [tsToken, setTsToken] = useState('');

	// Handlers
	const handleCreateAccount = async () => {
		if (isLoading) return;
		setIsLoading(true);

		setError('');

		// console.log(`firstName ${firstName.current?.value}`);
		// console.log(`email ${email.current?.value}`);
		// console.log(`passwordRef ${passwordRef.current?.value}`);
		// console.log(`passwordRef2 ${passwordRef2.current?.value}`);

		try {
			if (
				!firstName.current?.value.trim() ||
				!email.current?.value.trim() ||
				!passwordRef.current?.value.trim() ||
				!passwordRef2.current?.value.trim()
			)
				throw new Error('Please enter your details.');

			if (passwordRef.current?.value.trim() !== passwordRef2.current?.value.trim()) {
				throw new Error('Passwords do not match');
			}
			const payload: I_ApiUserCreateRequest = {
				firstName: firstName.current?.value.trim(),
				email: email.current?.value.trim(),
				password: passwordRef.current?.value.trim(),
				tsToken: tsToken,
			};

			// create the account
			const response = await fetch('/auth/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			// return null;

			const data: I_ApiUserCreateResponse = await response.json();

			console.log(data);

			if (data.success) {
				setLoginIsComplete(true);
				loadUserData();
				if (redirect) {
					router.push(redirect);
				} else {
					router.push('/app');
				}
				return;
			}

			throw new Error(data.message);
		} catch (error) {
			let mess = 'Something went wrong.';
			if (error instanceof Error) {
				mess = error.message;
			}
			setError(mess);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="m-auto flex flex-col items-center gap-6 p-10 w-full max-w-md border-2 rounded-xl">
			{loginIsComplete ? (
				<div className="m-auto flex flex-col gap-6 items-center">
					<div className="loading loading-spinner loading-lg"></div>
					<h1 className="text-2xl">Getting things ready...</h1>
				</div>
			) : (
				<>
					<h1 className="text-2xl">Create an Account</h1>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Your Name</span>
						</label>
						<input
							placeholder="Your Name"
							defaultValue=""
							type="text"
							ref={firstName}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									if (passwordRef.current) {
										passwordRef.current.focus();
									}
								}
							}}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Your Best Email Address</span>
						</label>
						<input
							placeholder="your@emailaddress.com"
							defaultValue=""
							type="text"
							ref={email}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									if (passwordRef.current) {
										passwordRef.current.focus();
									}
								}
							}}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Enter a Password</span>
						</label>
						<input
							placeholder="Your password"
							defaultValue=""
							type="password"
							ref={passwordRef}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									if (passwordRef2.current) {
										passwordRef2.current.focus();
									}
								}
							}}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Repeat Password</span>
						</label>
						<input
							placeholder="Repeat password"
							defaultValue=""
							type="password"
							ref={passwordRef2}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleCreateAccount();
								}
							}}
						/>
						<label className="label">
							<span className="label-text-alt text-error">{error}</span>
						</label>
					</div>
					<div className="form-control w-full">
						<p>These details will be emailed to you to confirm</p>
					</div>
					<button className="btn btn-primary w-full" onClick={handleCreateAccount}>
						Create Account
					</button>
					{!isDev && !isLoading ? (
						<Turnstile
							sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
							onVerify={token => setTsToken(token)}
						/>
					) : null}

					<p>
						Or... <Link href="/login"> Login to an existing Account</Link>
					</p>
				</>
			)}
		</div>
	);
}
