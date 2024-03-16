'use client';
import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'nextjs13-progress';

import Turnstile from 'react-hook-turnstile';

import { I_ApiUserCreateRequest, I_ApiUserCreateResponse } from '@/app/api/auth/create/route';
// import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { FaArrowRight, FaKey, FaUser } from 'react-icons/fa';

import { ZodError, z } from 'zod';
import InlineMessage from '@/components/InlineMessage';
import LoginActionsCard from '@/components/LoginActionsCard';

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

		// TODO: This needs to be changed to use the zod checking via @/lib/server/user/zod.user

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
			const response = await fetch('/api/auth/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data: I_ApiUserCreateResponse = await response.json();

			console.log(data);

			if (data.success) {
				setLoginIsComplete(true);
				loadUserData();
				if (redirect) {
					router.push(redirect);
				} else {
					router.push('/dashboard?newAccount=true');
				}
				return;
			}

			throw new Error(data.message);
		} catch (error) {
			// console.log(error);

			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'password2') {
						// Using exact match for clarity
						setPassword2Error(err.message);
					} else if (err.path[0] === 'password') {
						// Now check for 'password'
						setPasswordError(err.message);
					} else if (err.path[0] === 'email') {
						// Check for 'email'
						setEmailError(err.message);
					} else if (err.path[0] === 'firstName') {
						// Finally, check for 'firstName'
						setFirstNameError(err.message);
					} else {
						setError(err.message);
					}
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
		<>
			{loginIsComplete ? (
				<LoginActionsCard
					title="Working..."
					createAccount={false}
					forgotPassword={true}
					login={true}
					// footertext="These details will be emailed to you to confirm your account."
				>
					<p className="mb-2">Getting things ready...</p>{' '}
					{/* <div className="m-auto flex flex-col gap-6 items-center">
						<div className="loading loading-spinner loading-lg"></div>
						<h1 className="text-2xl">Getting things ready...</h1>{' '}
					</div> */}
				</LoginActionsCard>
			) : (
				<LoginActionsCard
					title="Create an Account"
					createAccount={false}
					forgotPassword={true}
					login={true}
					// footertext="These details will be emailed to you to confirm your account."
				>
					<p className="pb-2">Use the form below to create your account.</p>
					<Input
						id="firstName"
						label="Your First Name"
						name="firstName"
						type="firstName"
						defaultValue=""
						ref={firstName}
						disabled={isLoading}
						isInvalid={!!firstNameError}
						errorMessage={firstNameError}
						placeholder="Your First Name"
						variant="bordered"
						startContent={<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />}
						className="p-2 mb-2"
					/>

					<Input
						id="email"
						label="Your Best Email Address"
						name="email"
						type="email"
						defaultValue=""
						ref={email}
						disabled={isLoading}
						isInvalid={!!emailError}
						errorMessage={emailError}
						placeholder="Your Best Email Address"
						variant="bordered"
						startContent={<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />}
						className="p-2 mb-2"
					/>

					<Input
						id="password"
						label="Password"
						name="password"
						type="password"
						defaultValue=""
						ref={passwordRef}
						disabled={isLoading}
						isInvalid={!!passwordError}
						errorMessage={passwordError}
						placeholder="Password (Min 8 Characters)"
						variant="bordered"
						startContent={<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />}
						className="p-2 mb-2"
					/>
					<Input
						id="password2"
						label="Repeat Password"
						name="password2"
						type="password"
						defaultValue=""
						ref={passwordRef2}
						disabled={isLoading}
						isInvalid={!!password2Error}
						errorMessage={password2Error}
						placeholder="Repeat Password"
						variant="bordered"
						startContent={<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />}
						className="p-2 mb-2"
					/>

					{error && <InlineMessage message={error} />}

					<div className="flex justify-end mb-2">
						<Button
							as="a"
							color="primary"
							variant="solid"
							className="text-white"
							onClick={handleCreateAccount}
						>
							Create Account <FaArrowRight />
						</Button>
					</div>
					{!isDev ? (
						<Turnstile
							sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
							onVerify={token => setTsToken(token)}
						/>
					) : null}
				</LoginActionsCard>
			)}
		</>
	);
}
