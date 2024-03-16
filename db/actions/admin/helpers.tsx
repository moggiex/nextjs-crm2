'use server';
import { formatDistanceToNow } from 'date-fns';
import { User } from '@/prisma/typescript.user';
import { db } from '@/db';

type GetUsersParams = {
	limit?: number;
};

export const getUserById = async (id: string) => {
	return await db.user.findFirst({
		where: {
			id, // Replace 'id' with the actual primary key field name if it's different
		},
		include: {
			address: true,
		},
	});
};

export const getUsersCount = async () => {
	return await db.user.count();
};

export const getUsers = async ({ limit = 10 }: GetUsersParams): Promise<User[]> => {
	return await db.user.findMany({
		orderBy: {
			createdAt: 'desc', // Sort by createdAt in descending order
		},
		take: limit, // Limit the result to 10 users
	});
};

export const getUserCountWithinOneMonth = async () => {
	// Get the current date
	const currentDate = new Date();

	// Calculate the date one month ago
	const oneMonthAgo = new Date(currentDate);
	oneMonthAgo.setMonth(currentDate.getMonth() - 1);

	// Count users registered in the last month
	return await db.user.count({
		where: {
			createdAt: {
				gte: oneMonthAgo, // Greater than or equal to one month ago
			},
		},
	});
};

export const getInactiveUserCount = async () => {
	return await db.user.count({
		where: {
			status: 'Inactive', // Assuming 'Inactive' is a valid status in your User model
		},
	});
};

export const getBannedUserCount = async () => {
	return await db.user.count({
		where: {
			status: 'Banned', // Assuming 'Banned' is a valid status in your User model
		},
	});
};

export const getLatestLoggedInUsers = async () => {
	const latestLoggedInUsers = await db.user.findMany({
		orderBy: {
			lastLogin: 'desc', // Sort by the lastLogin field in descending order
		},
		take: 20, // Limit the result to 20 users
		select: {
			id: true,
			email: true,
			username: true,
			firstName: true,
			status: true,
			lastName: true,
			avatar: true,
			lastLogin: true, // Include lastLogin to display or use it in the panel
			// Add other fields you need for the panel
		},
	});

	// Add a description for each user's last login time
	const usersWithLastLoginDescription = latestLoggedInUsers.map(user => ({
		...user,
		lastLoginDescription: user.lastLogin
			? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })
			: 'Never logged in',
	}));

	return usersWithLastLoginDescription;
};

export const getUsersCountByDayForMonth = async (year, month) => {
	const users = await db.user.findMany({
		where: {
			createdAt: {
				gte: new Date(year, month, 1),
				lt: new Date(year, month + 1, 0),
			},
		},
		select: {
			createdAt: true,
		},
	});

	// Initialize a data structure for all days in the month with 0 registrations
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	let dailyCounts = {};
	for (let day = 1; day <= daysInMonth; day++) {
		dailyCounts[day] = 0;
	}

	// Populate the data structure with actual registration counts
	users.forEach(user => {
		const day = user.createdAt.getDate();
		dailyCounts[day] += 1;
	});

	return dailyCounts;
};
