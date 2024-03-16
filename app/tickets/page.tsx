// 'use client';
import React from 'react';
import TicketList from '@/components/tickets/TicketList';
import { Button, Divider } from '@nextui-org/react';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const TicketsPage = () => {
	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Tickets', href: '/tickets' },
				]}
			/>
			<h1>Support Tickets</h1>
			<Divider className="mb-4" />
			<p>About the support desk</p>

			<div className="flex justify-end mb-2">
				<Button as="a" color="primary" variant="solid" className="text-white" href={'/tickets/create'}>
					Create Ticket
				</Button>
			</div>
			<h2>Open</h2>
			<TicketList status="Open" />
			<h2>Pending</h2>
			<TicketList status="Pending" />
			<h2>Closed</h2>
			<TicketList status="Closed" />
		</>
	);
};

export default TicketsPage;
