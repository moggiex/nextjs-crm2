'use client';
// import InlineError from '@/components/InlineError';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaChevronLeft, FaEnvelope, FaExclamationTriangle, FaKey } from 'react-icons/fa';
import { ZodError } from 'zod';
import { sendForgotPassword } from '@/db/actions/user/helpers';
import { emailValidation } from '@/lib/server/user/zod.user';

const ForgotPasswordPage = () => {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [formSuccess, setFormSuccess] = useState(false);

	const handleForgotPassword = async (formData: FormData) => {
		setIsLoading(true);
		setFormSuccess(false);
		try {
			const payload = {
				email: formData.get('email').trim(),
			};
			// console.log('payload', payload);

			const validatedData = emailValidation.parse(payload);
			// console.log(validatedData);

			const response = await sendForgotPassword(validatedData);

			if (!response || response.success !== true) {
				console.log('Error sending email, try again later');
				setError(response?.message);
				setIsLoading(false);
				return false;
			}

			// Success
			setFormSuccess(true);
			setIsLoading(false);
		} catch (error) {
			console.log(error);

			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'email') {
						// Check for 'email'
						setEmailError(err.message);
					} else {
						// setError(err.message.flatten());
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
		// some code here
	};

	return (
		<div className="p-4 w-1/2">
			{formSuccess ? (
				<div>
					<h1 className="text-2xl mb-2">Check Your Email</h1>
					<p className="mb-2">
						We've sent instructions to reset your password. Please check your email.
					</p>
					<Button as="a" color="success" variant="solid" className="text-white" href="/">
						{' '}
						<FaChevronLeft className="mr-2" />
						Go Home
					</Button>
				</div>
			) : (
				<>
					<h1 className="text-2xl mb-2">Reset Your Password</h1>
					<p className="mb-2">
						Enter your registered email address, if it matches an account, we'll email you
						instructions.
					</p>
					<form action={handleForgotPassword} name="">
						<Input
							id="email"
							label="Your Registered Address"
							name="email"
							type="email"
							defaultValue=""
							isInvalid={!!emailError}
							errorMessage={emailError}
							disabled={isLoading}
							placeholder="Email Address"
							variant="bordered"
							startContent={
								<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							className="p-2 mb-2"
						/>

						<div className="flex justify-end mb-2">
							<Button type="submit" color="primary" variant="solid">
								Retrive Password
							</Button>
						</div>

						{error && (
							<div className="text-white bg-red-600 p-2 rounded mb-4">
								<FaExclamationTriangle className="mx-2 inline-block" />
								{error}
							</div>
						)}
						{/* {!isDev && !isLoading ? (
				<Turnstile
					sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
					onVerify={token => setTsToken(token)}
				/>
			) : null} */}
						<p className="flex justify-end">
							Or... <br />
							<br />
							<Button
								as="a"
								color="success"
								variant="solid"
								className="text-white mr-2"
								href="/create"
							>
								{' '}
								Create an Account
							</Button>
							<Button as="a" color="primary" variant="solid" className="text-white" href="/login">
								{' '}
								Login
							</Button>
						</p>
					</form>
				</>
			)}
		</div>
	);
};

export default ForgotPasswordPage;
