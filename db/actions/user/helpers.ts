'use server';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import * as log from '@/lib/common/logger';
import { getJwt, logout } from '@/lib/server/auth';
import { db } from '@/db/index';
import { emailValidation, forgotPasswordTokenSchema } from '@/lib/server/user/zod.user';
import { sendForgotPasswordEmail } from '@/lib/server/email/emailHelper';
import { ZodError } from 'zod';
// import { User } from '@/prisma/typescript.user';

export interface I_ApiUserLoginResponse extends ApiResponse {}

export const resetPassword = async ({ forgotPasswordToken, password }) => {
	// Find the user by forgotPasswordToken and update their password and reset the token
	console.log(forgotPasswordToken, password);
	// return;
	try {
		forgotPasswordTokenSchema.parse({ password, forgotPasswordToken });

		const updatedUser = await db.user.update({
			where: {
				forgotPasswordToken: `${forgotPasswordToken}`,
			},
			data: {
				password: hashSync(password, 10), // Update to the new, hashed password
				forgotPasswordToken: null, // Reset the forgotPasswordToken
			},
		});

		if (!updatedUser) {
			console.log(`Unable to update user record with forgotPasswordToken ${forgotPasswordToken}`);
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Unable to update user record with Token',
			};
			return res;
		}

		// Handle success (e.g., return a success message or redirect)
		console.log('Password reset successfully for:', updatedUser.email);
		const res: I_ApiUserLoginResponse = { success: true, message: 'Password reset successfully.' };
		return res;
	} catch (error) {
		// ZodError
		if (error instanceof ZodError) {
			console.log(error);

			error.errors.forEach(err => {
				if (err.path[0] === 'password') {
					// Check for 'email'
					const res: I_ApiUserLoginResponse = {
						success: false,
						message: err.message,
					};
					return res;
				} else if (err.path[0] === 'forgotPasswordToken') {
					// setError(err.message.flatten());
					const res: I_ApiUserLoginResponse = {
						success: false,
						message: err.message,
					};
					return res;
				} else {
					const res: I_ApiUserLoginResponse = {
						success: false,
						message: 'Validation Error',
					};
					return res;
				}
			});
		} else {
			if (error?.message.includes('prisma.user.update')) {
				const res: I_ApiUserLoginResponse = {
					success: false,
					message: 'Unable to update account. Please reset your password again. This cannot be recovered from',
				};
				return res;
			}
		}

		// Handle errors (e.g., user not found or database error)
		console.error('Error resetting password:', error);
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: error.message,
		};
		return res;
	}
};

export const sendForgotPassword = async (payload: string) => {
	try {
		// console.log(payload);

		const validatedData = emailValidation.parse(payload);

		console.log(validatedData.email.toLowerCase().trim());

		// see if user exists
		const user = await db.user.findFirst({
			where: { email: validatedData.email.toLowerCase().trim() },
		});

		if (!user) {
			console.log(`No user found with that email ${validatedData.email}`);
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'No user found with that email',
			};
			return res;
		}
		// if user exists, create uuid in forgotPasswordToken field
		const salt = genSaltSync(10); // 10 is the number of rounds for salt generation
		const forgotPasswordToken = hashSync(Date.now().toString(), salt);

		// Update the user record with the new forgotPasswordToken
		const updatedUser = await db.user.update({
			where: {
				id: user.id, // Use the user's ID to identify the record to update
			},
			data: {
				forgotPasswordToken: forgotPasswordToken, // Set the new token
			},
		});

		if (!updatedUser) {
			console.log(`Unable to update user record with forgotPasswordToken ${forgotPasswordToken}`);
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Unable to update user record with Token',
			};
			return res;
		}
		// send password

		// sort out the user name
		let userName = '';
		if (updatedUser.firstName && updatedUser.firstName.length > 0) {
			userName = updatedUser.firstName;
		}
		if (updatedUser.lastName && updatedUser.lastName.length > 0) {
			userName += ` ${updatedUser.lastName}`;
		}
		if (userName.length === 0) {
			userName = updatedUser.email;
		}

		const emailSent = await sendForgotPasswordEmail(userName, user.email, forgotPasswordToken);

		if (!emailSent) {
			console.log(`Unable to send email to ${user.email}`);
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Unable to send email',
			};
		}

		const res: I_ApiUserLoginResponse = {
			success: true,
			message: 'Check your email for further instructions',
		};
		return res;
	} catch (error) {
		console.log(error);
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: 'An error occured, please try later',
		};
		return res;
	}
};

export const getByLoginId = async (loginId: string) => {
	const user = await db.user.findFirst({
		where: { email: loginId.toLowerCase().trim() },
	});

	return user;
};

export const login = async (email: string, password: string) => {
	// clean it
	const cleanEmail = email.toLowerCase().trim();

	try {
		const user = await getByLoginId(cleanEmail);

		if (!user) {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'User not found',
			};
			return res;
			// throw new Error('User not found');
		}

		// Check user status
		if (user.status.toLowerCase() === 'inactive' || user.status.toLowerCase() === 'banned') {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'User is inactive or banned',
			};
			return res;
			// throw new Error('User is inactive or banned');
		}

		// Compare provided password with stored hash
		const isPasswordValid = compareSync(password, user.password);
		if (!isPasswordValid) {
			const res: I_ApiUserLoginResponse = {
				success: false,
				message: 'Invalid password',
			};
			return res;
			// throw new Error('Invalid password');
		}

		const updatedUser = await db.user.update({
			// where: { email: cleanEmail.toLowerCase() },
			where: { id: user.id },
			data: {
				lastLogin: new Date(),
				lastSeen: new Date(),
			},
		});

		// console.log(`--------`);
		// console.log(updatedUser);
		// console.log(`--------`);

		return updatedUser;
	} catch (error: any) {
		log.error(error);
		// throw new Error('Invalid login or password');
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: error,
		};
		return res;
	}
};

export const createAccount = async (firstName: string, email: string, password: string) => {
	try {
		const cleanEmail = email.toLowerCase().trim();

		// Check if a user with the given email already exists
		const existingUser = await db.user.findFirst({ where: { email: cleanEmail } });
		if (existingUser) {
			throw new Error('Email already in use');
		}

		// Validate the password length or any other constraints you might have
		if (password.length < 8) {
			// Example constraint
			throw new Error('Password must be at least 8 characters long');
		}

		// Create the user account
		const newUser = await db.user.create({
			data: {
				email: cleanEmail,
				password: hashSync(password, 10), // Hash the password; adjust salt rounds as needed
				firstName: firstName.trim(),
				// status: 'Pending', // Or any default status you wish to set for new users

				// Include other fields as necessary, with either provided values or defaults
				lastLogin: new Date(),
				lastSeen: new Date(),
			},
		});

		// TODO: Optionally, perform any post-creation actions like sending a verification email

		return newUser; // Return the created user object
	} catch (error: any) {
		log.error(error);
		throw new Error('Unable to create account');
	}
};

export const getAuthUserFromDb = async () => {
	const jwt = await getJwt();

	if (!jwt) {
		return null;
	}

	const user = await db.user.findFirst({
		where: {
			id: jwt.id, // Replace 'id' with the actual primary key field name if it's different
		},
	});

	if (!user) {
		await logout();
		return null;
	}

	// Check if user is banned or inactive
	if (user && (user.status.toLowerCase() === 'banned' || user.status.toLowerCase() === 'inactive')) {
		await logout();
		return null;
	}

	return user;
};

export const filterPublic = (user: any) => {
	const { password, ...userPublic } = user;
	return userPublic;
};

export const exportPublic = (user: any | null) => {
	if (!user) return null;

	const { password, status, isAdmin, isSupport, ...userWithoutSensitiveData } = user;
	return userWithoutSensitiveData;
};

// export const exportPublic = (user: any | null) => {
// 	const { password, ...userWithoutPassword } = user;
// 	return userWithoutPassword;
// };
