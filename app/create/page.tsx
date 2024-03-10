'use client';
import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'nextjs13-progress';

import Turnstile from 'react-hook-turnstile';

import { I_ApiUserCreateRequest, I_ApiUserCreateResponse } from '../auth/create/route';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { FaExclamationTriangle, FaKey, FaUser } from 'react-icons/fa';

import { ZodError, z } from 'zod';
import InlineError from '@/components/InlineError';

const requiredError = 'This field cannot be blank'; // This is generally used for .min() or similar validations
const emailError = 'Enter a valid email address';
const passwordError = 'Password is too short, must be at least 8 characters long';
const passwordMismatchError = 'Passwords must match';

const CreateAccountFormSchema = z
	.object({
		firstName: z.string().min(1, requiredError), // Ensures the field is not empty
		email: z.string().email(emailError).min(1, requiredError), // Ensures the field is not empty and is a valid email
		password: z.string().min(8, passwordError), // Ensures the field is not empty and meets the minimum length requirement
		password2: z.string().min(8, passwordError),
	})
	.refine(data => data.password === data.password2, {
		message: passwordMismatchError,
		path: ['password2'], // This explicitly sets which field the error should be associated with
	});

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

	const [firstNameError, setFirstNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [password2Error, setPassword2Error] = useState('');

	// Handlers
	const handleCreateAccount = async () => {
		if (isLoading) return;
		setIsLoading(true);
		setError('');
		setFirstNameError('');
		setEmailError('');
		setPasswordError('');
		setPassword2Error('');

		try {
			const payload: I_ApiUserCreateRequest = {
				firstName: firstName.current?.value.trim(),
				email: email.current?.value.trim(),
				password: passwordRef.current?.value.trim(),
				password2: passwordRef2.current?.value.trim(),
				tsToken: tsToken,
			};

			console.log(payload);

			CreateAccountFormSchema.parse(payload);

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
					router.push('/dashboard');
				}
				return;
			}

			throw new Error(data.message);
		} catch (error) {
			// let mess = 'Something went wrong.';
			// if (error instanceof Error) {
			// 	mess = error.message;
			// }
			// setError(mess);
			console.log(error);

			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'password2') {
						// Using exact match for clarity
						setPassword2Error(err.message);
					}
					if (err.path[0] === 'password') {
						// Now check for 'password'
						setPasswordError(err.message);
					}
					if (err.path[0] === 'email') {
						// Check for 'email'
						setEmailError(err.message);
					}
					if (err.path[0] === 'firstName') {
						// Finally, check for 'firstName'
						setFirstNameError(err.message);
					}
					// if (err.path.includes('firstName')) {
					// 	setFirstNameError(err.message);
					// } else if (err.path.includes('email')) {
					// 	setEmailError(err.message);
					// } else if (err.path.includes('password2')) {
					// 	setPassword2Error(err.message);
					// } else if (err.path.includes('password')) {
					// 	setPasswordError(err.message);
					// }
					// Handle other fields similarly...
				});
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
		<div className="m-auto flex flex-col items-center gap-6 p-10 w-full max-w-md border-2 rounded-xl">
			{loginIsComplete ? (
				<div className="m-auto flex flex-col gap-6 items-center">
					<div className="loading loading-spinner loading-lg"></div>
					<h1 className="text-2xl">Getting things ready...</h1>
				</div>
			) : (
				<div className="p-4 w-full">
					<h1 className="text-2xl mb-2">Create an Account</h1>

					<Input
						id="firstName"
						label="Your First Name"
						name="firstName"
						type="firstName"
						defaultValue=""
						ref={firstName}
						placeholder="Your First Name"
						variant="bordered"
						startContent={<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />}
						// onKeyDown={e => {
						// 	if (e.key === 'Enter') {
						// 		if (email.current) {
						// 			email.current.focus();
						// 		}
						// 	}
						// }}
						className="p-2 mb-2"
					/>

					{firstNameError && <InlineError errorMessage={firstNameError} />}

					<Input
						id="email"
						label="Your Best Email Address"
						name="email"
						type="email"
						defaultValue=""
						ref={email}
						placeholder="Your Best Email Address"
						variant="bordered"
						startContent={<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />}
						// onKeyDown={e => {
						// 	if (e.key === 'Enter') {
						// 		if (passwordRef.current) {
						// 			passwordRef.current.focus();
						// 		}
						// 	}
						// }}
						className="p-2 mb-2"
					/>

					{emailError && <InlineError errorMessage={emailError} />}

					<Input
						id="password"
						label="Password"
						name="password"
						type="password"
						defaultValue=""
						ref={passwordRef}
						placeholder="Password (Min 8 Characters)"
						variant="bordered"
						startContent={<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />}
						// onKeyDown={e => {
						// 	if (e.key === 'Enter') {
						// 		if (passwordRef.current) {
						// 			passwordRef.current.focus();
						// 		}
						// 	}
						// }}
						className="p-2 mb-2"
					/>

					{passwordError && <InlineError errorMessage={passwordError} />}

					<Input
						id="password2"
						label="Repeat Password"
						name="password2"
						type="password"
						defaultValue=""
						ref={passwordRef2}
						placeholder="Repeat Password"
						variant="bordered"
						startContent={<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />}
						// onKeyDown={e => {
						// 	if (e.key === 'Enter') {
						// 		handleCreateAccount();
						// 	}
						// }}
						className="p-2 mb-2"
					/>

					{password2Error && <InlineError errorMessage={password2Error} />}

					{error && (
						<div className="text-white bg-red-600 p-2 rounded mb-4">
							<FaExclamationTriangle className="mx-2 inline-block" />
							{error}
						</div>
					)}

					<div className="form-control w-full">
						<p>These details will be emailed to you to confirm</p>
					</div>
					<div className="flex justify-end mb-2">
						<Button
							as="a"
							color="primary"
							variant="solid"
							className="text-white"
							onClick={handleCreateAccount}
						>
							Create Account
						</Button>
					</div>
					{!isDev && !isLoading ? (
						<Turnstile
							sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
							onVerify={token => setTsToken(token)}
						/>
					) : null}

					<div className="text-right">
						Or...
						<br />
						<br />
						<Button as="a" color="success" variant="solid" className="text-white" href="/login">
							{' '}
							Login to an existing Account
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
