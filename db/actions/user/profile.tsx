'use server';
import { db } from '@/db/index';
import { getJwt, logout } from '@/lib/server/auth';
import { User, Address } from '@/prisma/typescript.models'; // Import User and Address interfaces

export const updateProfile = async (formData: FormData) => {
	// User info
	const username = formData.get('username') as string;
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const phone = formData.get('phone') as string;
	const avatar = formData.get('avatar') as string;

	const businessName = formData.get('businessName') as string;
	const addressLine1 = formData.get('addressLine1') as string;
	const addressLine2 = formData.get('addressLine2') as string;
	const city = formData.get('city') as string;
	const countyOrState = formData.get('countyOrState') as string;
	const postZipCode = formData.get('postZipCode') as string;
	const countryId = formData.get('countryId') as string;

	// Address Info
	// console.log(username);
	// console.log(firstName);
	// console.log(lastName);
	// console.log(phone);
	// console.log(avatar);

	// console.log(businessName);
	// console.log(addressLine1);
	// console.log(addressLine2);
	// console.log(countyOrState);
	// console.log(postZipCode);
	// console.log(city);
	// console.log(countryId);

	// return true;

	const user = await getUserId(true);

	if (!user) {
		console.error('User not found.');
		throw new Error('User not found. Logout & in again');
	}

	// Update or create address
	let addressId: string;
	try {
		if (user.address) {
			// User already has an address, update it
			addressId = user.address.id;
			await db.address.update({
				where: { id: addressId },
				data: {
					businessName,
					addressLine1,
					addressLine2,
					city,
					countyOrState,
					postZipCode,
					countryId: parseInt(countryId), // Convert countryId to number
				},
			});
			console.log(`AddressId ${addressId} updated for user ${user.id}`);
		} else {
			// User doesn't have an address, create a new one
			const newAddress = await db.address.create({
				data: {
					userId: user.id,
					businessName,
					addressLine1,
					addressLine2,
					city,
					countyOrState,
					postZipCode,
					countryId: parseInt(countryId), // Convert countryId to number
				},
			});

			addressId = newAddress.id;
			console.log(`AddressId ${addressId} created for user ${user.id}`);
		}
	} catch (error) {
		if (typeof error === 'string') {
			console.error('Error updating user:', error);
			return { sucess: false, message: error };
		} else {
			console.error('Error updating user:', JSON.stringify(error));
			return { sucess: false, message: JSON.stringify(error) };
		}
	}

	// Update user information
	try {
		await db.user.update({
			where: { id: user.id },
			data: {
				...(username && { username }),
				firstName,
				lastName,
				phone,
				avatar,
				// Update address relation
				address: {
					connect: { id: addressId },
				},
			},
		});
		console.log('User information updated successfully.');
		return { sucess: true, message: 'Updated detals successfully' };
	} catch (error) {
		if (typeof error === 'string') {
			console.error('Error updating user:', error);
			return { sucess: false, message: error };
		} else {
			console.error('Error updating user:', JSON.stringify(error));
			return { sucess: false, message: JSON.stringify(error) };
		}
	}
};

export const getCountries = async () => {
	const countries = await db.country.findMany({});

	// Define an array of priority countries
	const priorityCountries = [
		'United Kingdom',
		'United States',
		'Australia',
		'Germany',
		'Canada',
		'France',
		'Italy',
		'Spain',
	];

	// Sort countries based on priority
	countries.sort((a, b) => {
		const indexA = priorityCountries.indexOf(a.nicename);
		const indexB = priorityCountries.indexOf(b.nicename);
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		} else if (indexA !== -1) {
			return -1;
		} else if (indexB !== -1) {
			return 1;
		}
		return 0;
	});

	// console.log(countries);
	return countries;
};

// getUserProfile
export const getUserProfile = async () => {
	const jwt = await getJwt();

	if (!jwt) {
		return null;
	}

	const user = await db.user.findFirst({
		where: {
			id: jwt.id, // Replace 'id' with the actual primary key field name if it's different
		},
		include: {
			address: true,
		},
	});

	console.log(user);

	if (!user) {
		await logout();
		return null;
	}

	return user;
};

type GetUserResult = User & { address?: Address | null };

// getUserId
export const getUserId = async (includeAddress: boolean = false): Promise<GetUserResult | null> => {
	const jwt = await getJwt();

	if (!jwt) {
		return null;
	}

	const selectFields: { [key: string]: boolean } = {
		id: true,
	};

	if (includeAddress) {
		selectFields['address'] = true;
	}

	const user = (await db.user.findFirst({
		where: {
			id: jwt.id, // Replace 'id' with the actual primary key field name if it's different
		},
		select: selectFields,
	})) as GetUserResult | null;

	if (!user) {
		await logout();
		return null;
	}

	return user;
};
