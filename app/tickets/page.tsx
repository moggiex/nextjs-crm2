// 'use client';
import React from 'react';
import TicketList from '@/components/tickets/TicketList';
import { Button } from '@nextui-org/react';
// import { useRouter } from 'next/navigation';
// import { Router } from 'next/router';
const TicketsPage = () => {
	// const router = useRouter();
	return (
		<div>
			<h1>Support Tickets</h1>
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
		</div>
	);
};

export default TicketsPage;
