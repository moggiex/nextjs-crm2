'use server';
import { db } from '@/db/index';
import SystemSettingSchema from '@/lib/server/system/zod.SystemSetting';
import { SystemSetting } from '@/prisma/typescript.systemSetting';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';



export const updateSystemSettings = async (data: SystemSetting) => {
	let errors: string[] | z.ZodError = [];

	try {
		if (data.id) {
			// Logic to update the existing record using Prisma
			const updatedRecord = await db.systemSetting.update({
				where: { id: data.id },
				data: data,
			});

			revalidatePath(`/admin/system}`);
			return { success: true, message: 'Record updated successfully', data: updatedRecord, errors };
		} else {
			// Logic to create a new record using Prisma
			data.id = 1;
			const createdRecord = await db.systemSetting.create({
				data: data,
			});
			revalidatePath('/admin/system');
			return { success: true, message: 'Record created successfully', data: createdRecord, errors };
		}

		// TODO: ZOD

		// Validate the incoming data against the schema
		// const validatedData = SystemSettingSchema.parse(data);

		// if (validatedData.id) {
		// 	// Logic to update the existing record using Prisma
		// 	const updatedRecord = await db.systemEmailTemplate.update({
		// 		where: { id: validatedData.id },
		// 		data: validatedData,
		// 	});
		// 	return { success: true, message: 'Record updated successfully', data: updatedRecord, errors };
		// } else {
		// 	// Logic to create a new record using Prisma
		// 	const createdRecord = await db.systemEmailTemplate.create({
		// 		data: validatedData,
		// 	});
		// 	return { success: true, message: 'Record created successfully', data: createdRecord, errors };
		// }
	} catch (error) {
		console.error(error);
		errors = [error instanceof Error ? error.message : 'An unknown error occurred'];

		// Depending on the error type, you might want to provide more specific messaging, especially for validation errors
		if (error instanceof z.ZodError) {
			// Map Zod errors to a more friendly format
			// errors = error?.errors.map(err => `${err.path.join('.')}: ${err.message}`);
			errors = error;
		}

		return { success: false, message: 'Failed to process the request', errors };
	}
};

export const getSystemSettings = async () => {
	return await db.systemSetting.findFirst();
};
