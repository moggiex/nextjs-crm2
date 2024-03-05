import React from 'react';
import { db } from '@/db';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { getTickets } from '@/db/actions/tickets/tickets';
import TicketTable from '@/components/tickets/TicketTable';

const TicketList = async ({ status = 'Open' }) => {
	const tickets = await getTickets(status);

	// console.log('---');
	// console.log(tickets);

	return (
		<>
			<TicketTable tickets={tickets} status={status} />
		</>
	);
};

export default TicketList;
