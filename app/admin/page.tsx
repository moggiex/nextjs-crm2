import React from 'react';
import UserList from '@/components/admin/UserList';
import { db } from '@/db';
import { getAdminTickets } from '@/db/actions/tickets/tickets';
import TicketList from '@/components/tickets/TicketList';
import { Card, CardBody } from '@nextui-org/react';
import { FaUser, FaUserPlus, FaUserSlash, FaUsers } from 'react-icons/fa';
import UsersRegistrationChart from '@/components/admin/UserRegistrationChart';
import { formatDistanceToNow } from 'date-fns';
import LastLoggedInList from '@/components/admin/LastLoggedInList';

const getLatestUsers = async () => {
	return await db.user.findMany({
		orderBy: {
			createdAt: 'desc', // Sort by createdAt in descending order
		},
	});
};

const getUserCountWithinOneMonth = async () => {
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

const getInactiveUserCount = async () => {
	return await db.user.count({
		where: {
			status: 'Inactive', // Assuming 'Inactive' is a valid status in your User model
		},
	});
};

const getBannedUserCount = async () => {
	return await db.user.count({
		where: {
			status: 'Banned', // Assuming 'Banned' is a valid status in your User model
		},
	});
};

const getLatestLoggedInUsers = async () => {
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

const getUsersCountByDayForMonth = async (year, month) => {
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

export default async function AdminMainPage() {
	const users = await getLatestUsers();
	const totalUsersCount = await db.user.count();
	const newUsers = await getUserCountWithinOneMonth();
	const banndedUsers = await getBannedUserCount();
	const inactiveUsers = await getInactiveUserCount();
	const now = new Date();
	const dailyCounts = await getUsersCountByDayForMonth(now.getFullYear(), now.getMonth());
	const latestLoggedInUsers = await getLatestLoggedInUsers();

	return (
		<>
			<div className="flex mb-4">
				<Card className="w-1/4 p-4 mr-4">
					<CardBody>
						<FaUsers className="text-5xl text-green-800" />
						{totalUsersCount} Total Users
					</CardBody>
				</Card>
				<Card className="w-1/4 p-4 mr-4">
					<CardBody>
						<FaUserPlus className="text-5xl text-blue-800" />
						{newUsers} New Users This Month
					</CardBody>
				</Card>
				<Card className="w-1/4 p-4 mr-4">
					<CardBody>
						<FaUserSlash className="text-5xl text-red-800" />
						{banndedUsers} Banned Users
					</CardBody>
				</Card>
				<Card className="w-1/4 p-4">
					<CardBody>
						<FaUser className="text-5xl text-grey-800" />
						{inactiveUsers} Inactive Users
					</CardBody>
				</Card>
			</div>

			<div className="mb-4">
				<UsersRegistrationChart dailyCounts={dailyCounts} />
			</div>

			<div className="mb-4">
				<h2>Last Logged In</h2>
				<LastLoggedInList users={latestLoggedInUsers} />
			</div>

			<div className="mb-4">
				<h2>Users</h2>
				<div>{users && <UserList users={users} />}</div>
			</div>

			<div>
				<h2>Support Tickets</h2>
				<TicketList status="Open" isAdmin={true} />
				<TicketList status="Pending" isAdmin={true} />
				<TicketList status="Closed" isAdmin={true} />
			</div>
		</>
	);
}
