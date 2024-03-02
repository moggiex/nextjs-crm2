'use server';
import { hashSync, compareSync } from 'bcryptjs';
import * as log from '@/lib/common/logger';
import { getJwt, logout } from '@/lib/server/auth';
import { db } from '@/db/index';
// import { getByLoginId } from '@/db/helpers';

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
			throw new Error('User not found');
		}

		// Check user status
		if (user.status.toLowerCase() === 'inactive' || user.status.toLowerCase() === 'banned') {
			throw new Error('User is inactive or banned');
		}

		// Compare provided password with stored hash
		const isPasswordValid = compareSync(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Invalid password');
		}

		const updatedUser = await db.user.update({
			// where: { email: cleanEmail.toLowerCase() },
			where: { id: user.id },
			data: {
				lastLogin: new Date(),
				lastSeen: new Date(),
			},
		});

		return updatedUser;
	} catch (error: any) {
		log.error(error);
		throw new Error('Invalid login or password');
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

export const filterPublic = async (user: any) => {
	const { password, ...userPublic } = user;
	return userPublic;
};

export const exportPublic = async (user: any | null) => {
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
};
