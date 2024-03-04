'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

const TicketTable = ({ tickets, status = 'Open' }) => {
	return (
		<Table aria-label="Example static collection table">
			<TableHeader>
				<TableColumn>Subject</TableColumn>
				<TableColumn>Message</TableColumn>
				<TableColumn>Type</TableColumn>
				<TableColumn>Status</TableColumn>
			</TableHeader>
			<TableBody>
				{tickets.length === 0 && (
					<TableRow key="1">
						<TableCell aria-colspan={3} colSpan={3}>
							{`There are no ${status} tickets`}
						</TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
					</TableRow>
				)}
				{tickets.length > 0 &&
					tickets.map(ticket => (
						<TableRow key={ticket.id}>
							<TableCell>{ticket.subject}</TableCell>
							<TableCell>{ticket.message}</TableCell>
							<TableCell>{ticket.type}</TableCell>
							<TableCell>{ticket.status}</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
};

export default TicketTable;
