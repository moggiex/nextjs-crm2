import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Chip,
} from '@nextui-org/react';
import profileDefaultImage from '@/assets/images/profile.png';
import { formatDateTime } from '@/lib/common/dateTime';

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
				// hideHeader
			>
				<TableHeader>
					<TableColumn>Status</TableColumn>
					<TableColumn>Type</TableColumn>
					<TableColumn>ID</TableColumn>
					<TableColumn>Created</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key={0}>
						<TableCell>
							<Chip color={getStatusColour(ticket.status)} variant="flat">
								{ticket.status}
							</Chip>
						</TableCell>

						<TableCell>
							<Chip color={getStatusColour(ticket.type)} variant="flat">
								{ticket.type}
							</Chip>
						</TableCell>

						<TableCell>{ticket.id}</TableCell>

						<TableCell>{formatDateTime(ticket.createdAt)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Card className="text-white my-4 bg-info">
				<CardHeader className="justify-between">
					<div className="flex gap-5">
						<Avatar isBordered radius="full" size="md" src={profileDefaultImage.src} />
						<div className="flex flex-col gap-1 items-start justify-center">
							<h4 className="text-small font-semibold leading-none">
								{ticket.user?.firstName ? ticket.user.firstName : ''}{' '}
								{ticket.user?.lastName ? ticket.user.lastName : ''}
							</h4>
							<h5 className="text-small tracking-tight">
								{ticket.user?.username ? ticket.user.username : ticket.user.email || ''}
							</h5>
						</div>
					</div>
				</CardHeader>
				<CardBody className="px-4 py-4 font-semibold">
					<p>{ticket.message}</p>
				</CardBody>
				<CardFooter className="gap-3 flex justify-end">
					<div className="flex gap-1">
						<p className="text-small">
							<b>Original Ticket</b>
						</p>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

export default TicketView;
