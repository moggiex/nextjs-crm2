import { db } from '@/db';
import { getUserId } from '../profile';

export const getTickets = async (status = 'Open') => {
	const { id } = await getUserId();

	// console.log(id);
	// return;

	if (!id) {
		// return { success: false, message: 'Invlaid user' };
		return [];
	}

	const tickets = await db.ticket.findMany({
		where: {
			status,
			userId: id,
		},
	});

	const dummyTickets = [
		{
			id: '1',
			subject: 'Dummy Ticket 1',
			message: 'This is a dummy ticket message 1',
			type: 'Issue',
			status: 'Open',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 'user1',
			assignedTo: 'support1',
		},
		{
			id: '2',
			subject: 'Dummy Ticket 2',
			message: 'This is a dummy ticket message 2',
			type: 'Feedback',
			status: 'Closed',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 'user2',
			assignedTo: 'support2',
		},
		// Add more dummy tickets as needed
	];

	return dummyTickets;
	return tickets;
};
