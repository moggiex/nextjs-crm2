'use client';
import { PayPalSubscriptionEvents } from '@/prisma/zod.PayPalSubscriptionEvent';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface EventsTableProps {
	events?: PayPalSubscriptionEvents[]; // Using the PayPalSubscriptionEvents type for the events prop
}

const PayPalEventsTable: React.FC<EventsTableProps> = ({ events }) => {
	const router = useRouter();

	if (!events) {
		return <p>No events found</p>;
	}

	return (
		<>
			<Table
				aria-label="PayPal Subscripiton Events Table"
				onRowAction={
					events && events.length > 0
						? key => {
								router.push(`/admin/paypal/events/${key}`);
						  }
						: undefined
				}
				selectionMode="single"
				color="primary"
				className="mb-4"
				// color="success"
			>
				<TableHeader>
					<TableColumn>userId</TableColumn>
					<TableColumn>OrderId</TableColumn>
					<TableColumn>subscriptionID</TableColumn>
					<TableColumn>facilitatorAccessToken</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{events && events.length === 0 ? (
						<TableRow key="1">
							<TableCell aria-colspan={4} colSpan={4}>
								{`There are no events yet`}
							</TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
						</TableRow>
					) : (
						events.map((event: PayPalSubscriptionEvents) => (
							<TableRow
								key={event.id}
								className={`cursor-pointer`}
								onClick={() => router.push(`/admin/paypal/events/${event.id}`)}
							>
								<TableCell>{event.user?.email ? event.user.email : event.userId}</TableCell>
								<TableCell>{event.orderID}</TableCell>
								<TableCell>{event.subscriptionID}</TableCell>
								<TableCell>{event.facilitatorAccessToken.slice(0, 12)}...</TableCell>

								<TableCell>
									<Button
										as="a"
										variant="solid"
										size="sm"
										color="primary"
										isIconOnly
										className="mr-2"
										href={`/admin/paypal/events/${event.id}`}
									>
										<FaSearch className="mr-0" />
									</Button>
									<Button variant="solid" size="sm" color="danger" isIconOnly>
										<FaTimes />
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
};

export default PayPalEventsTable;
