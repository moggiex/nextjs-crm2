import React, { Suspense } from 'react';
import UserList from '@/components/admin/dashboard/UserList';
import TicketList from '@/components/tickets/TicketList';
import NewUsersChart from '@/components/admin/dashboard/NewUsersChart';
import NewUsersChartSkeleton from '@/components/admin/dashboard/NewUsersChartSkeleton';
import LastLoggedInList from '@/components/admin/dashboard/LastLoggedInList';

import { getLatestLoggedInUsers, getUsers } from '@/db/actions/admin/helpers';
import DashboardCardsSkeleton from '@/components/admin/dashboard/DashboardCardsSkeleton';
import DashboardCards from '@/components/admin/dashboard/DashboardCards';
import TableSkeleton from '@/components/admin/dashboard/TableSkeleton';
import { Divider } from '@nextui-org/react';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

export default async function AdminMainPage() {
	const users = await getUsers({ limit: 10 });

	// const latestLoggedInUsers = await getLatestLoggedInUsers();

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin Dashboard', href: '/admin' },
				]}
			/>
			<div className="flex mb-4">
				<Suspense fallback={<DashboardCardsSkeleton />}>
					{/* <Suspense fallback={<div>Loading...</div>}> */}
					<DashboardCards />
				</Suspense>
			</div>

			<div className="mb-4">
				<h2>Users This Month</h2>
				<Suspense fallback={<NewUsersChartSkeleton />}>
					{/* <Suspense fallback={<div>Loading...</div>}> */}
					<NewUsersChart />
				</Suspense>
			</div>

			<div className="mb-4">
				<h2>Last Logged In</h2>
				<Suspense fallback={<TableSkeleton />}>
					<LastLoggedInList />
				</Suspense>
			</div>

			<div className="mb-4">
				<h2>Users</h2>
				<div>{users && <UserList users={users} />}</div>
			</div>

			<div>
				<h2>Support Tickets</h2>
				<Divider className="mb-2" />

				<h3>Open Tickets</h3>

				<Suspense
					fallback={
						<TableSkeleton
							headings={['Subject', 'Message', 'Replies', 'Type', 'Status', 'Actions']}
						/>
					}
				>
					<TicketList status="Open" isAdmin={true} />
				</Suspense>

				<h3>Pending Tickets</h3>
				<Suspense
					fallback={
						<TableSkeleton
							headings={['Subject', 'Message', 'Replies', 'Type', 'Status', 'Actions']}
						/>
					}
				>
					<TicketList status="Pending" isAdmin={true} />
				</Suspense>
				<h3>Closed Tickets</h3>
				<Suspense
					fallback={
						<TableSkeleton
							headings={['Subject', 'Message', 'Replies', 'Type', 'Status', 'Actions']}
						/>
					}
				>
					<TicketList status="Closed" isAdmin={true} />
				</Suspense>
			</div>
		</>
	);
}
