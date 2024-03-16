export type UserActivityLog = {
	id?: number; // Represents the `Int` type from Prisma
	userId: string; // Assuming the `id` in your `User` model is a `String`
	action: string; // Represents the `String` type from Prisma
	details?: string; // Optional field, can be `undefined` or `string`
	createdAt?: Date; // Represents the `DateTime` type from Prisma, using JavaScript's `Date` type
};
