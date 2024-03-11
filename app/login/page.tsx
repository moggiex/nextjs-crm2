'use client';
import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'nextjs13-progress';

import Turnstile from 'react-hook-turnstile';

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from '../auth/login/route';
import { Button, Input } from '@nextui-org/react';
import { FaArrowRight, FaEnvelope, FaExclamationTriangle, FaKey } from 'react-icons/fa';

import { z } from 'zod';
import InlineError from '@/components/InlineError';
import LoginActionsCard from '@/components/LoginActionsCard';

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

const LoginFormSchema = z.object({
	login: z.string({ invalid_type_error, required_error }).email('Enter a valid email address'),
	password: z
		.string({ invalid_type_error, required_error })
		.min(8, 'Password is too short,  must be at least 8 characters long'),
});

export default function LoginPage() {
	const isDev = process.env.NODE_ENV === 'development';
	let containerHeight = '510px';
	if (isDev) {
		containerHeight = '420px';
	}

	// const { userData, loadUserData, isLoading, setIsLoading } = useApp();
	const { loadUserData, isLoading, setIsLoading } = useApp();
	const router = useRouter();

	// Utils
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	// Refs
	const loginRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// State
	const [error, setError] = useState('');
	const [loginIsComplete, setLoginIsComplete] = useState(false);
	const [tsToken, setTsToken] = useState('');

	// Handlers
	const handleLogin = async () => {
		if (isLoading) return;

		setIsLoading(true);
		setError('');

		try {
			// if (!loginRef.current?.value || !passwordRef.current?.value) {
			// 	setError('Please enter your credentials.');
			// 	throw new Error('Please enter your credentials.');
			// }

			const payload: I_ApiUserLoginRequest = {
				login: loginRef.current?.value,
				password: passwordRef.current?.value,
				tsToken: tsToken,
			};

			LoginFormSchema.parse(payload);

			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data: I_ApiUserLoginResponse = await response.json();
			// console.log(`-----`);
			// console.log(data);
			// console.log(`-----`);

			if (data.success) {
				setLoginIsComplete(true);
				loadUserData();
				if (redirect) {
					router.push(redirect);
				} else {
					router.push('/dashboard');
				}
				return;
			}
			setError(data.message || 'Something went wrong');
			throw new Error(data.message);
		} catch (error) {
			// console.log('Error type:', typeof error);
			// console.log('Error:', error);

			if (error instanceof z.ZodError) {
				// Zod validation error occurred
				const errorMessages = error.errors.map(err => err.message);
				setError(errorMessages.join(', '));
			} else {
				// Other error occurred
				let mess = 'Something went wrong.';
				if (error instanceof Error) {
					mess = error.message;
				}
				setError(mess);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<LoginActionsCard
				title="Welcome Back!"
				createAccount={true}
				forgotPassword={true}
				footertext="some footer text"
			>
				{loginIsComplete ? (
					<div className="m-auto flex flex-col gap-6 items-center">
						<div className="loading loading-spinner loading-lg"></div>
						<p className="text-2xl">Getting things ready...</p>
					</div>
				) : (
					<>
						<p className="pb-2">Use the form below to login to your account.</p>
						<Input
							id="email"
							label="Email Address"
							name="email"
							type="email"
							defaultValue=""
							ref={loginRef}
							placeholder="Email Address"
							variant="bordered"
							startContent={
								<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									if (passwordRef.current) {
										passwordRef.current.focus();
									}
								}
							}}
							className="p-2 mb-2"
						/>
						{/* {errors.login && <span>Email is required</span>} */}
						<Input
							id="password"
							label="Password"
							name="password"
							type="password"
							defaultValue=""
							ref={passwordRef}
							placeholder="Password"
							variant="bordered"
							startContent={
								<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleLogin();
								}
							}}
							className="p-2 mb-2"
						/>

						{error && <InlineError errorMessage={error} />}

						<div className="flex justify-end mb-2">
							<Button color="primary" variant="solid" onClick={handleLogin}>
								Login <FaArrowRight />
							</Button>
						</div>
						{!isDev && !isLoading ? (
							<Turnstile
								sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
								onVerify={token => setTsToken(token)}
							/>
						) : null}
					</>
				)}
			</LoginActionsCard>
		</>
	);
}
