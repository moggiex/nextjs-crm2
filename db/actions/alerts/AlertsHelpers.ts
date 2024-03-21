'use server';

import { db } from '@/db';
import { Alert, AlertType, UserAlert } from '@/prisma/typescript.alerts';
import { getAuthUserFromDb } from '@/db/actions/user/helpers';
import { revalidatePath } from 'next/cache';
// import type { ApiResponse } from '@/index.d.ts';

export type AlertWithoutId = Omit<Alert, 'id'>;

export const dismissAlert = async (alertId: string, userId: string, url: string) => {
	// console.log('Dismissing alert:', userId, alertId, url);
	try {
		const dismissedAlert = await db.UserAlert.create({
			data: {
				userId,
				alertId,
			},
		});
		revalidatePath(url);
		return { success: true, message: 'Alert dimissed' };
	} catch (error) {
		console.error('Error dismissing alert:', error);
		return { success: false, message: `Error dismissing alert ${error?.message}` };
	}
};

export const getRelevantAlertForUser = async ({ user }) => {
	// const user = await getAuthUserFromDb();
	// // TODO: This runs for non logged in users. Should not be the case
	// if (!user) {
	// 	console.log('User not found. Thsi shoudl nto be running for non logged in users');
	// 	return null;
	// }

	// console.log('User:', user);

	if (!user) {
		console.log('User not found. Thsi shoudl nto be running for non logged in users');
		return null;
	}

	// console.log('User:', user);

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

	// console.log(relevantAlert);

	if (!relevantAlert) {
		return null;
	}

	return {
		alert: relevantAlert,
		userId: user.id,
	};
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

export const getAlerts = async (): Promise<Alert[]> => {
	const alerts = await db.alert.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	if (!alerts) {
		return [];
	}
	return alerts;
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
