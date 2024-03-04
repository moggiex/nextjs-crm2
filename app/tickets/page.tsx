import React from 'react';
import TicketList from '@/components/tickets/TicketList';
const TicketsPage = () => {
	return (
		<div>
			<TicketList status="Open" />
		</div>
	);
};

export default TicketsPage;
