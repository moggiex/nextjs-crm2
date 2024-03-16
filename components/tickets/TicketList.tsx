import { getTickets, getAdminTickets } from '@/db/actions/tickets/tickets';
import TicketTable from '@/components/tickets/TicketTable';
import { boolean } from 'zod';

// add typescript types
const TicketList = async ({ status = 'Open', isAdmin = false }): Promise<T> => {
	let response = null;
	if (isAdmin) {
		response = await getAdminTickets(status);
	} else {
		response = await getTickets(status);
	}

	

	// await delay(5000);
	// // const response = await getTickets(status);

	return (
		<>
			{response.success ? (
				<TicketTable tickets={response.tickets} status={status} isAdmin={isAdmin} />
			) : (
				<div>{response.message}</div>
			)}
		</>
	);
};

export default TicketList;
