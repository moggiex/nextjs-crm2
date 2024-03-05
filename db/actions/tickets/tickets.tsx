'use server';
import { db } from '@/db';
import { getUserId } from '@/db/actions/user/profile';
import { checkId } from '@/db/helpers';

export const getTicket = async (ticketId: string) => {
	if (!checkId(ticketId)) {
		return { success: false, message: 'Invlaid ticket Id' };
	}

	// const user = await getUserId();

	// if (!user.id || !checkId(user.id)) {
	// 	return { success: false, message: 'Invlaid user' };
	// }

	// const ticket = await db.ticket.findFirst({
	// 	where: {
	// 		id: ticketId,
	// 		// userId: user.id,
	// 	},
	// });

	// if (!ticket) {
	// 	return { success: false, message: 'Ticket not found' };
	// }

	const dummyTicket = {
		success: true,
		ticket: {
			id: 'ckt4j2b2b0002ioco5sd8kj9q', // Dummy cuid
			subject: 'Feature request: Dark mode',
			message: 'It would be great if there was a dark mode option.',
			type: 'Support',
			status: 'Open',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 'cltbu7xtj0000x44y9lb9unuv',
			user: 'cltbu7xtj0000x44y9lb9unuv',
		},
	};
	return dummyTicket;
	return ticket;
};

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