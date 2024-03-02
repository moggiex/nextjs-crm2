import { db } from '@/db/index';
import { getJwt, logout } from '@/lib/server/auth';

export const updateProfile = async (formData: FormData) => {
	'use server';
	// this is where we woudl avew the data to the db, but we do not reply on the user id variable

	// User info
	const username = formData.get('username') as string;
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const phone = formData.get('phone') as string;
	const avatar = formData.get('avatar') as string;

	// Address Info

	console.log(JSON.stringify(firstName));
	return JSON.stringify(firstName);
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
			addresses: {
				// Include the user's addresses
				include: {
					country: true, // For each address, also include the related country
				},
			},
		},
	});

	if (!user) {
		await logout();
		return null;
	}

	// Address
	const countries = await db.country.findMany({});

	// Define an array of priority countries
	const priorityCountries = ['UK', 'United States', 'Australia', 'Germany'];

	// Sort countries based on priority
	countries.sort((a, b) => {
		const indexA = priorityCountries.indexOf(a.name);
		const indexB = priorityCountries.indexOf(b.name);
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		} else if (indexA !== -1) {
			return -1;
		} else if (indexB !== -1) {
			return 1;
		}
		return 0;
	});

	// Now, you have the user and the sorted list of countries
	// console.log(user);
	// console.log(countries);

	const userWithCountries = {
		...user,
		countries,
	};

	return userWithCountries;
};
