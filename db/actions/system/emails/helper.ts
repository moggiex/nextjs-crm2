'use server';
import { db } from '@/db/index';
import { SystemEmailTemplate } from '@/prisma/typescript.systememailtemplate';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { SystemEmailTemplateSchema } from '@/lib/server/system/systememailtemplate/zod.systememailtemplate';

/**
 *
 * @returns SystemEmailTemplate[]
 */
export const getSystemEmailTemplates = async (): Promise<SystemEmailTemplate[]> => {
	return await db?.systemEmailTemplate.findMany({ orderBy: { id: 'asc' } });
};
/**
 *
 * @param { id }
 * @returns SystemEmailTemplate
 */
export const getSystemEmailById = async ({ id }: { id: string | number }): Promise<SystemEmailTemplate> => {
	return await db.systemEmailTemplate.findFirst({ where: { id: Number(id) }, orderBy: { id: 'asc' } });
};
/**
 *
 * @param internalName such as internal_name
 * @returns SystemEmailTemplate | null
 */
export const getSystemEmailByInternalName = async (internalName: string): Promise<SystemEmailTemplate | null> => {
	return await db.systemEmailTemplate.findFirst({
		where: {
			internalName,
		},
	});
};

type FormState = {
	message: string;
};

export const updateSystemEmail = async (data: SystemEmailTemplate) => {
	let errors: string[] | z.ZodError = [];
	try {
		if (data.id) {
			// Logic to update the existing record using Prisma
			const updatedRecord = await db.systemEmailTemplate.update({
				where: { id: data.id },
				data: data,
			});
			revalidatePath('/admin/system/emails');
			revalidatePath(`/admin/system/emails/${data.id}`);
			return { success: true, message: 'Record updated successfully', data: updatedRecord, errors };
		} else {
			// Logic to create a new record using Prisma
			const createdRecord = await db.systemEmailTemplate.create({
				data: data,
			});
			return { success: true, message: 'Record created successfully', data: createdRecord, errors };
		}

		// TODO: ZOD

		// Validate the incoming data against the schema
		// const validatedData = SystemEmailTemplateSchema.parse(data);

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
