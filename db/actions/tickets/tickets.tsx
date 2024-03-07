'use server';
import { db } from '@/db';
import { getUserId } from '@/db/actions/user/profile';
import { checkId } from '@/db/helpers';
import { revalidatePath } from 'next/cache';

enum TicketType {
	Issue = 'Issue',
	FeatureRequest = 'FeatureRequest',
	Query = 'Query',
}
enum TicketStatus {
	Open = 'Open',
	Closed = 'Closed',
	Pending = 'Pending',
}
interface TicketAuthor {
	firstName: string | null;
	lastName: string | null;
	username: string | null;
	avatar: string | null;
}

interface TicketMessage {
	id: string;
	ticketId: string;
	message: string;
	createdAt: string; // Could also use Date type if you convert string to Date object
	createdBy: string;
	author: TicketAuthor;
}

interface Ticket {
	id: string;
	subject: string;
	message: string;
	type: TicketType; // Enum values as per your TicketType enum
	status: TicketStatus; // Enum values as per your TicketStatus enum
	createdAt: string; // Could also use Date type if you convert string to Date object
	updatedAt: string; // Could also use Date type if you convert string to Date object
	userId: string;
	assignedTo: string | null;
	messages?: TicketMessage[];
	_count?: {
		// The '?' makes this property optional
		messages: number; // Represents the count of messages
	};
}

// The return type of the getTicket function could be defined as:
interface TicketResponse {
	success: boolean;
	ticket?: Ticket; // Optional, depending on if the ticket is found or not
	message?: string; // Optional, for error messages or other information
}

interface TicketData {
	subject: string;
	message: string;
	type: TicketType; // Assuming these are your ticket types
}

interface CreateTicketResponse {
	success: boolean;
	message: string;
}

interface TicketReplyData {
	parentId: string; // Assuming parentId is the ID of the parent ticket
	message: string;
}

interface CreateTicketReplyResponse {
	success: boolean;
	message: string;
	// reply?: TicketMessage; // Assuming TicketMessage is an interface you have defined for ticket replies
}

export const createTicketReply = async (ticketReplyData: TicketReplyData): Promise<CreateTicketReplyResponse> => {
	const user = await getUserId();

	if (!user || !user.id || !checkId(user.id) || !checkId(ticketReplyData.parentId)) {
		return { success: false, message: 'Invlaid user' };
	}

	console.log(ticketReplyData);

	const newTicketReply = await db.ticketMessage.create({
		data: {
			ticketId: ticketReplyData.parentId,
			message: ticketReplyData.message.trim(),
			createdAt: new Date(),
			createdBy: user.id,
		},
	});

	if (!newTicketReply) {
		return { success: false, message: 'Unable to create ticket reply' };
	}

	revalidatePath(`/tickets/${ticketReplyData.parentId}`);
	return { success: true, message: 'Ticket reply created' };
};

export const createTicket = async (ticketData: TicketData): Promise<CreateTicketResponse> => {
	const user = await getUserId();

	if (!user || !user.id || !checkId(user.id)) {
		return { success: false, message: 'Invlaid user' };
	}

	const newTicket = await db.ticket.create({
		data: {
			subject: ticketData.subject.trim(),
			message: ticketData.message.trim(),
			type: ticketData.type,
			status: 'Open',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: user.id,
		},
	});

	if (!newTicket) {
		return { success: false, message: 'Unable to create ticket' };
	}

	revalidatePath('/tickets');
	return { success: true, message: 'Ticket created' };
};

export const getTicket = async (ticketId: string): Promise<TicketResponse> => {
	if (!checkId(ticketId)) {
		return { success: false, message: 'Invlaid ticket Id' };
	}

	const user = await getUserId();

	if (!user || !user.id || !checkId(user.id)) {
		return { success: false, message: 'Invlaid user' };
	}

	const ticket = await db.ticket.findFirst({
		where: {
			id: ticketId,
			// Uncomment this line if you want to ensure the ticket belongs to the user
			// userId: user.id,
		},
		include: {
			user: {
				// Include the ticket creator details
				select: {
					email: true,
					firstName: true,
					lastName: true,
					username: true,
					avatar: true,
				},
			},
			messages: {
				orderBy: {
					createdAt: 'asc', // Use 'asc' for ascending order (oldest first)
				},
				include: {
					// Include author details for each message
					author: {
						select: {
							email: true,
							firstName: true,
							lastName: true,
							username: true,
							avatar: true,
							isSupport: true,
							isAdmin: true,
						},
					},
				},
			},
		},
	});

	if (!ticket) {
		return { success: false, message: 'Ticket not found' };
	}

	return { success: true, ticket };
};

interface GetTicketsResponse {
	success: boolean;
	message?: string;
	tickets?: Ticket[];
}

export const getAdminTickets = async (status: TicketStatus = TicketStatus.Open): Promise<GetTicketsResponse> => {
	const tickets = await db.ticket.findMany({
		where: {
			status,
		},
		include: {
			_count: {
				select: { messages: true }, // Count messages for each ticket
			},
		},
	});

	if (!tickets) {
		return { success: false, message: `No tickets for ${status}` };
	}
	return { success: true, tickets };
};

export const getTickets = async (status: TicketStatus = TicketStatus.Open): Promise<GetTicketsResponse> => {
	const user = await getUserId();

	if (!user || !user.id || !checkId(user.id)) {
		return { success: false, message: 'Invlaid user' };
	}

	const tickets = await db.ticket.findMany({
		where: {
			status,
			userId: user.id,
		},
		include: {
			_count: {
				select: { messages: true }, // Count messages for each ticket
			},
		},
	});

	if (!tickets) {
		return { success: false, message: `No tickets for ${status}` };
	}
	return { success: true, tickets };
};
