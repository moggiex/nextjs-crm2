'use client';
import React, { useState } from 'react';
import { useRouter } from 'nextjs13-progress';
import { forgotPasswordTokenValidation, passwordMatchSchema } from '@/lib/server/user/zod.user';
import { Button, Input } from '@nextui-org/react';
import { FaArrowRight, FaExclamationTriangle, FaKey } from 'react-icons/fa';
import { resetPassword } from '@/db/actions/user/helpers';
import { set } from 'date-fns';
import { ZodError } from 'zod';
import LoginActionsCard from '@/components/LoginActionsCard';

const ForgotPasswordResetPage = ({ params }: { params: { id?: string } }) => {
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setcConfirmPasswordError] = useState(false);
	const [passwordUpdated, setPasswordUpdated] = useState(false);

	const router = useRouter();

	// console.log(params.id);
	// check id is present and valid
	if (!params.id || params.id.length < 58 || params.id.length > 78) {
		// if not, redirect to forgot password page
		router.push('/auth/forgot-password?error=invalid-token');
	}

	const id = decodeURIComponent(params.id);
	// console.log(id);

	const handleResetPassword = async (formData: FormData) => {
		try {
			setIsLoading(true);
			setPasswordError(false);
			setcConfirmPasswordError(false);
			setPasswordUpdated(false);
			const payload = {
				password: formData.get('password').trim(),
				confirmPassword: formData.get('confirmPassword').trim(),
			};

			const validatedId = forgotPasswordTokenValidation.parse(id);
			const validatedData = passwordMatchSchema.parse(payload);
			// const
			validatedData.forgotPasswordToken = validatedId;

			const response = await resetPassword(validatedData);

			if (!response || response.success !== true) {
				setError(response?.message);
				setIsLoading(false);
				return false;
			}

			setIsLoading(false);
			setPasswordUpdated(true);

			// const token = decodeURIComponent(params.id);
		} catch (error) {
			// if not, redirect to forgot password page
			// console.log(error);

			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'password') {
						// Check for 'email'
						setPasswordError(err.message);
					} else if (err.path[0] === 'confirmPassword') {
						setcConfirmPasswordError(err.message);
					} else if (err.path[0] === 'forgotPasswordToken') {
						// setError(err.message.flatten());
						setError(err.message);
					}
				});
				setIsLoading(false);
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
		<div>
			{passwordUpdated ? (
				<LoginActionsCard
					title="Password Updated!"
					createAccount={false}
					forgotPassword={false}
					login={true}
					// footertext="some footer text"
					headerBg="success"
				>
					<p className="mb-2">Congrats! Your password has been updated. You may now login.</p>
					<Button as="a" color="success" variant="solid" className="text-white" href="/login">
						{' '}
						Login <FaArrowRight />
					</Button>
				</LoginActionsCard>
			) : (
				<LoginActionsCard
					title="Set A New Password"
					createAccount={false}
					forgotPassword={true}
					login={false}
					// footertext="some footer text"
					headerBg="primary"
				>
					<p className="mb-2">Enter your new password below.</p>
					<p className="mb-2">Repeat the password and click the button to update it.</p>
					<form action={handleResetPassword} name="">
						<Input
							id="password"
							label="Your New Password"
							name="password"
							type="password"
							defaultValue=""
							isInvalid={!!passwordError}
							errorMessage={passwordError}
							disabled={isLoading}
							placeholder="Password"
							variant="bordered"
							startContent={
								<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							className="p-2 mb-2"
						/>

						<Input
							id="confirmPassword"
							label="Your New Password"
							name="confirmPassword"
							type="password"
							defaultValue=""
							isInvalid={!!confirmPasswordError}
							errorMessage={confirmPasswordError}
							disabled={isLoading}
							placeholder="Repeat Password"
							variant="bordered"
							startContent={
								<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							className="p-2 mb-2"
						/>

						<div className="flex justify-end mb-2">
							<Button type="submit" color="primary" variant="solid">
								{isLoading ? 'Updating Password...' : 'Update Password'} <FaArrowRight />
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
					</form>
				</LoginActionsCard>
			)}
		</div>
	);
};

export default ForgotPasswordResetPage;
