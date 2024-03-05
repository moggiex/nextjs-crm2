// 'use client';
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTicket } from '@/db/actions/tickets/tickets';
// import { checkId } from '@/db/helpers';
import { FaCircleNotch } from 'react-icons/fa';
import '@/app/loading.css';
import TicketView from '@/components/tickets/TicketView';

const TicketViewPage = () => {
	const { id } = useParams();
	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(id);
		// return;
		const getTicketData = async () => {
			// if (!id || checkId(id)) {
			// 	console.error('invalid ticket id');
			// 	return;
			// }

			try {
				const response = await getTicket(id);
				console.log(response);
				if (response.success !== true) {
					console.log(response.message);
					return;
				}

				setTicket(response.ticket);
			} catch (error) {
				console.error('Error fetching ticket data:', error);
			} finally {
				setLoading(false);
			}
		};

		// invoke self
		if (ticket === null) {
			getTicketData();
		}

		if (!ticket && !loading) {
			return <h1 className="text-center text-2xl font-bold mt-10">Ticket Not Found</h1>;
		}
	}, [id, ticket]);
	return (
		<>
			{loading && (
				<div>
					<FaCircleNotch className="spinner text-3xl" />
					Loading...
				</div>
			)}
			{!loading && ticket && (
				<div>
					<TicketView ticket={ticket} />
					{ticket && JSON.stringify(ticket, null, 2)}
				</div>
			)}
		</>
	);
	// return <div>text</div>;
};

export default TicketViewPage;
