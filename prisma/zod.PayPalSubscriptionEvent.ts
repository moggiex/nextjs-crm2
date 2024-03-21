import { z } from 'zod';
import { UserSchema } from './zod.user';

export type PayPalSubscriptionEvents = z.infer<typeof PayPalSubscriptionEventSchema>;

export const PayPalSubscriptionEventSchema = z.object({
	id: z.string().uuid().optional(), // ID is generated automatically, so it's optional in input
	orderID: z.string(),
	subscriptionID: z.string(),
	facilitatorAccessToken: z.string(),
	paymentSource: z.string(),
	userId: z.string().uuid(), // Assuming the userId is also a UUID
	// The user relation is handled outside of the input schema, so it's not included here
	createdAt: z.date().optional(), // createdAt is managed by the database, so it's optional in input
	updatedAt: z.date().optional(), // updatedAt is managed by the database, so it's optional in input
	user: UserSchema.optional(),
});
