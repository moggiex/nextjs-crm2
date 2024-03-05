// 'use client';
import React from 'react';
import TicketList from '@/components/tickets/TicketList';
const TicketsPage = () => {
	return (
		<div>
			<h1>Support Tickets</h1>
			<p>About the support desk</p>
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
