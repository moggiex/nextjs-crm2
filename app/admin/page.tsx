import React, { Suspense } from 'react';
import UserList from '@/components/admin/dashboard/UserList';
import { getAdminTickets } from '@/db/actions/tickets/tickets';
import TicketList from '@/components/tickets/TicketList';
import { Card, CardBody } from '@nextui-org/react';
import { FaUser, FaUserPlus, FaUserSlash, FaUsers } from 'react-icons/fa';
import NewUsersChart from '@/components/admin/dashboard/NewUsersChart';
import NewUsersChartSkeleton from '@/components/admin/dashboard/NewUsersChartSkeleton';
import LastLoggedInList from '@/components/admin/dashboard/LastLoggedInList';

import {
	getBannedUserCount,
	getInactiveUserCount,
	getLatestLoggedInUsers,
	getUserCountWithinOneMonth,
	getUsers,
	getUsersCount,
} from '@/db/actions/admin/helpers';

export default async function AdminMainPage() {
	const users = await getUsers({ limit: 10 });
	const totalUsersCount = await getUsersCount();
	const newUsers = await getUserCountWithinOneMonth();
	const banndedUsers = await getBannedUserCount();
	const inactiveUsers = await getInactiveUserCount();
	const now = new Date();

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
				<Suspense fallback={<NewUsersChartSkeleton />}>
					<NewUsersChart />
				</Suspense>
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
