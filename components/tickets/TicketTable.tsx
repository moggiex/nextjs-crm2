'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const TicketTable = ({ tickets, status = 'Open' }) => {
	const getStatusColour = (ticketStatus: string) => {
		let chipColor: string;
		switch (ticketStatus) {
			case 'Open':
				chipColor = 'success'; // Assuming 'success' color indicates open tickets
				break;
			case 'Closed':
				chipColor = 'default'; // Assuming 'default' or another color indicates closed tickets
				break;
			case 'Pending':
				chipColor = 'warning'; // 'warning' color for pending tickets
				break;
			default:
				chipColor = ''; // Fallback color
		}
		return chipColor;
	};

	// TODO: https://nextui.org/docs/components/table
	// See Custom cells for icons and tooltips

	return (
		<Table
			aria-label="Example static collection table"
			onRowAction={key => alert(`Opening item ${key}...`)}
			selectionMode="single"
		>
			<TableHeader>
				<TableColumn>Subject</TableColumn>
				<TableColumn>Message</TableColumn>
				<TableColumn>Type</TableColumn>
				<TableColumn>Status</TableColumn>
				<TableColumn>Actions</TableColumn>
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
						<TableCell className="hidden"> </TableCell>
					</TableRow>
				)}
				{tickets.length > 0 &&
					tickets.map(ticket => (
						<TableRow key={ticket.id}>
							<TableCell>{ticket.subject}</TableCell>
							<TableCell>{ticket.message}</TableCell>
							<TableCell>{ticket.type}</TableCell>
							<TableCell>
								<Chip color={getStatusColour(ticket.status)} variant="flat">
									{ticket.status}
								</Chip>
							</TableCell>
							<TableCell>
								<Button variant="solid" size="sm" color="primary" isIconOnly className="mr-2">
									<FaSearch className="mr-0" />
								</Button>
								<Button variant="solid" size="sm" color="danger" isIconOnly>
									<FaTimes />
								</Button>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
};

export default TicketTable;