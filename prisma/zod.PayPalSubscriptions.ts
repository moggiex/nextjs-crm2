import { z } from 'zod';

export type PayPalSubscriptionsInput = z.infer<typeof PayPalSubscriptionsSchema>;

export const PayPalSubscriptionsSchema = z.object({
	id: z.string().uuid().optional(), // ID is generated automatically, so it's optional in input
	planId: z.string(),
	description: z.string().optional(),
	title: z.string(),
	enabled: z.coerce.boolean().default(true),
	price: z.number().default(0),
	currency: z.string().default('GBP'),
	trailAvailable: z.boolean().default(true),
	trialPeriodDays: z.number().int().default(7),
	// `createdAt` and `updatedAt` are managed by the database, so they're not included in the input schema
});
