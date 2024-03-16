import React from 'react';
import TicketList from '@/components/tickets/TicketList';
import { Divider } from '@nextui-org/react';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const AdminTicketsPage = () => {
	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Tickets', href: '/admin/tickets' },
				]}
			/>
			<h1>Support Tickets Admin</h1>
			<Divider className="mb-4" />
			<p>Admin support desk</p>
			<h2>Open</h2>
			<TicketList status="Open" />
			<h2>Pending</h2>
			<TicketList status="Pending" />
			<h2>Closed</h2>
			<TicketList status="Closed" />
		</>
	);
};

export default AdminTicketsPage;
