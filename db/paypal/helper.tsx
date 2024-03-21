'use server';
import { PayPalSubscriptionEvents } from '@/prisma/zod.PayPalSubscriptionEvent';
import { db } from '@/db';

export const getPayPalSubscriptionEventById = async (id: string): Promise<PayPalSubscriptionEvents | null> => {
	return await db.payPalSubscriptionEvent.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					email: true, // Only select the email field from the related user
					firstName: true,
					lastName: true,
					username: true,
				},
			},
		},
	});
};

export const getPayPalSubscriptionEvents = async (): Promise<PayPalSubscriptionEvents[] | null> => {
	return await db.payPalSubscriptionEvent.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			user: {
				select: {
					email: true, // Only select the email field from the related user
					firstName: true,
					lastName: true,
					username: true,
				},
			},
		},
	});
};
