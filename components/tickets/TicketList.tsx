import { getTickets } from '@/db/actions/tickets/tickets';
import TicketTable from '@/components/tickets/TicketTable';

const TicketList = async ({ status = 'Open' }) => {
	const response = await getTickets(status);

	return (
		<>
			{response.success ? (
				<TicketTable tickets={response.tickets} status={status} />
			) : (
				<div>{response.message}</div>
			)}
		</>
	);
};

export default TicketList;
