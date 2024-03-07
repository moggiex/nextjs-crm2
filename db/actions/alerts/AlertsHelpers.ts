'use server';
import { db } from '@/db';
import { Alert } from '@/prisma/typescript.alerts';

export const getAlertById = async (id: string): Promise<Alert> => {
	return await db.alert.findUnique({
		where: {
			id,
		},
	});
};
