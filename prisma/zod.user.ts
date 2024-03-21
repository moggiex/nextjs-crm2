import { z } from 'zod';

export const UserRoleSchema = z.enum(['Admin', 'Support', 'Customer']);

export const UserStatusSchema = z.enum(['Pending', 'Active', 'Inactive', 'Banned']);

export type UserInput = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
	id: z.string().cuid().optional(), // ID is generated automatically, so it's optional in input
	email: z.string().email(),
	username: z.string().optional().nullable(),
	firstName: z.string(),
	lastName: z.string().optional().nullable(),
	emailVerified: z.date().optional().nullable(),
	phone: z.string().optional().nullable(),
	password: z.string(), // Consider hashing or other security measures
	forgotPasswordToken: z.string().optional().nullable(),
	avatar: z.string().optional().nullable(),
	role: UserRoleSchema.default('Customer'),
	status: UserStatusSchema.default('Active'),
	isAdmin: z.boolean().default(false),
	isSupport: z.boolean().default(false),

	deletedAt: z.date().optional().nullable(),

	lastLogin: z.date().default(new Date()),
	lastSeen: z.date().optional().nullable(),

	createdAt: z.date().optional(), // Managed by the database
	updatedAt: z.date().optional(), // Managed by the database

	// Assuming the related schemas for Address, Message, Account, etc., are defined elsewhere
	// address: AddressSchema.optional().nullable(),
	// Relationships are usually handled outside of input schemas, so they're not included here
});
