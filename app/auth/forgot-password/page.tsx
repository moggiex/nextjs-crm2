'use client';

import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaEnvelope } from 'react-icons/fa';
import { ZodError } from 'zod';
import { sendForgotPassword } from '@/db/actions/user/helpers';
import { emailValidation } from '@/lib/server/user/zod.user';
import LoginActionsCard from '@/components/LoginActionsCard';
import Turnstile from 'react-hook-turnstile';
import InlineMessage from '@/components/InlineMessage';

const ForgotPasswordPage = () => {
	const searchParams = useSearchParams();
	const searchParamsError = searchParams.get('error');

	const isDev = process.env.NODE_ENV === 'development';

	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);

	const handleForgotPassword = async (formData: FormData) => {
		setIsLoading(true);
		setEmailError(false);
		setFormSuccess(false);
		try {
			const payload = {
				email: formData.get('email').trim(),
				// tsToken: tsToken,
			};
			// console.log('payload', payload);
			// return;

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
			// console.log(error);

			let mess = 'Something went wrong.';

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
		<>
			{searchParamsError && (
				<InlineMessage
					message={
						'You have ben redirected here due to an error reseting your password. Please use the form below to try again'
					}
				/>
			)}
			<form action={handleForgotPassword}>
				{formSuccess ? (
					<LoginActionsCard
						title="Check Your Email"
						createAccount={false}
						forgotPassword={false}
						login={false}
						// footertext="some footer text"
						headerBg="success"
					>
						<p className="mb-2">
							We've sent instructions to reset your password. Please check your email.
						</p>
						<Button as="a" color="success" variant="solid" className="text-white" href="/">
							{' '}
							<FaChevronLeft className="mr-2" />
							Go Home
						</Button>
					</LoginActionsCard>
				) : (
					<>
						<LoginActionsCard
							title="Reset Your Password"
							createAccount={true}
							forgotPassword={false}
							login={true}
							footertext={null}
						>
							<p className="mb-2">
								Enter your registered email address, if it matches an account, we'll email you
								instructions.
							</p>

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
								<Button
									type="submit"
									color="primary"
									variant="solid"
									onClick={() => handleForgotPassword()}
								>
									Retrive Password <FaArrowRight />
								</Button>
							</div>

							{/* {error && (
							<div className="text-white bg-red-600 p-2 rounded mb-4">
								<FaExclamationTriangle className="mx-2 inline-block" />
								{error}
							</div>
						)} */}
							{!isDev && !isLoading ? (
								<Turnstile
									sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
									onVerify={token => setTsToken(token)}
								/>
							) : null}
						</LoginActionsCard>
					</>
				)}
			</form>
		</>
	);
};

export default ForgotPasswordPage;
