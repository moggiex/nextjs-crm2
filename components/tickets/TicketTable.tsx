'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'nextjs13-progress';
import styles from '@/components/tickets/style.module.css';

const TicketTable = ({ tickets, status = 'Open', isAdmin = false }) => {
	const router = useRouter();
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
				chipColor = ''; // Fallback color
		}
		return chipColor;
	};

	// TODO: https://nextui.org/docs/components/table
	// See Custom cells for icons and tooltips

	return (
		<Table
			aria-label="Example static collection table"
			onRowAction={
				tickets.length > 0
					? key => {
							const path = isAdmin ? `/admin/tickets/${key}` : `/tickets/${key}`;
							router.push(path);
					  }
					: undefined
			}
			selectionMode="single"
			className="mb-4"
		>
			<TableHeader>
				<TableColumn>Subject</TableColumn>
				<TableColumn>Message</TableColumn>
				<TableColumn>Replies</TableColumn>
				<TableColumn>Type</TableColumn>
				<TableColumn>Status</TableColumn>
				<TableColumn>Actions</TableColumn>
			</TableHeader>
			<TableBody>
				{tickets.length === 0 && (
					<TableRow key="1">
						<TableCell aria-colspan={6} colSpan={6}>
							{`There are no ${status} tickets`}
						</TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
						<TableCell className="hidden"> </TableCell>
					</TableRow>
				)}
				{tickets.length > 0 &&
					tickets.map(ticket => (
						<TableRow key={ticket.id} className={styles.clickableRow}>
							<TableCell className={styles.clickableRow}>{ticket.subject}</TableCell>
							<TableCell>
								{ticket.message.length > 50
									? `${ticket.message.substring(0, 50)}...`
									: ticket.message}
							</TableCell>
							<TableCell>{ticket._count.messages}</TableCell>
							<TableCell>{ticket.type}</TableCell>
							<TableCell>
								<Chip color={getStatusColour(ticket.status)} variant="flat">
									{ticket.status}
								</Chip>
							</TableCell>
							<TableCell>
								<Button
									as="a"
									variant="solid"
									size="sm"
									color="primary"
									isIconOnly
									className="mr-2"
									href={`/tickets/${ticket.id}`}
								>
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
