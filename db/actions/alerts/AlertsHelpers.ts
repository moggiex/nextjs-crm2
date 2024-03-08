// 'use server';
import { db } from '@/db';
import { Alert, AlertType } from '@/prisma/typescript.alerts';
import { getAuthUserFromDb } from '@/db/actions/user/helpers';
// import type { ApiResponse } from '@/index.d.ts';

export type AlertWithoutId = Omit<Alert, 'id'>;

export const getRelevantAlertForUser = async () => {
	const user = await getAuthUserFromDb();
	if (!user) {
		console.log('User not found');
		return null;
	}

	const relevantAlert = await db.alert.findFirst({
		where: {
			enabled: true,
			createdAt: {
				gt: user.createdAt, // Alert is newer than the user's join date
			},
			// Not dismissed by the user
			NOT: {
				dismissedBy: {
					some: {
						userId: user.id,
					},
				},
			},
		},
		orderBy: {
			createdAt: 'asc', // Get the oldest relevant alert first
		},
	});

	return relevantAlert;
};

export const createAlert = async ({ message, type, enabled = true }: AlertWithoutId): Promise<ApiResponse> => {
	try {
		const newAlert = await db.alert.create({
			data: {
				message,
				enabled,
				type: type.toLowerCase() as AlertType,
			},
		});

		if (!newAlert) {
			return { success: false, message: 'Alert not created' };
		}

		return { success: true, message: 'Alert Created' };
	} catch (error) {
		return { success: false, message: error?.message };
	}
};

export const updateAlert = async ({ id, message, type, enabled = true }: Alert): Promise<ApiResponse> => {
	console.log(id, message, type);

	try {
		const updatedAlert = await db.alert.update({
			where: {
				id,
			},
			data: {
				message,
				enabled,
				type: type.toLowerCase() as AlertType,
			},
		});

		if (!updatedAlert) {
			return { success: false, message: 'Alert not updated' };
		}

		return { success: true, message: 'Alert Updated' };
	} catch (error) {
		console.log(error);
		return { success: false, message: error?.message };
	}
};

export const getAlertById = async (id: string): Promise<Alert | null> => {
	const userAlert = await db.alert.findUnique({
		where: {
			id,
		},
	});

	if (!userAlert) {
		return null;
	}
	return userAlert;
};
