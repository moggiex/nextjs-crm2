import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import TicketReply from './TicketReply';

const TicketView = ({ ticket }) => {
	const getStatusColour = (ticketStatus: string) => {
		type ChipColor = 'success' | 'default' | 'warning' | 'primary' | 'secondary' | 'danger';

		let chipColor: ChipColor;
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
				chipColor = 'default'; // Fallback color
		}
		return chipColor;
	};
	return (
		<>
			<h1>Support Ticket</h1>
			<Table
				aria-label="Example static collection table"
				// onRowAction={key => router.push(`/tickets/${key}`)}
				// selectionMode="single"
				className="mb-4"
				hideHeader
			>
				<TableHeader>
					<TableColumn width="20%">-</TableColumn>
					<TableColumn width="80%">-</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key={0}>
						<TableCell className="font-bold">Status</TableCell>
						<TableCell>
							<Chip color={getStatusColour(ticket.status)} variant="flat">
								{ticket.status}
							</Chip>
						</TableCell>
					</TableRow>
					<TableRow key={1}>
						<TableCell className="font-bold">Type</TableCell>
						<TableCell>
							<Chip color={getStatusColour(ticket.type)} variant="flat">
								{ticket.type}
							</Chip>
						</TableCell>
					</TableRow>
					<TableRow key={2}>
						<TableCell className="font-bold">ID</TableCell>
						<TableCell>{ticket.id}</TableCell>
					</TableRow>
					<TableRow key={3}>
						<TableCell className="font-bold">Subject:</TableCell>
						<TableCell>{ticket.message}</TableCell>
					</TableRow>
					<TableRow key={4}>
						<TableCell className="font-bold">Message:</TableCell>
						<TableCell>{ticket.message}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<TicketReply parentTicketId={ticket.id} />
		</>
	);
};

export default TicketView;
