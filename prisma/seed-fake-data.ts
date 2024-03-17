import { db } from '@/db';

async function main() {
	// await db.message.deleteMany({});
	// await db.account.deleteMany({});
	// await db.ticket.deleteMany({});
	// await db.user.deleteMany({});

	// await db.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;');
	// await db.$executeRawUnsafe('TRUNCATE TABLE "Account" RESTART IDENTITY CASCADE;');
	// await db.$executeRawUnsafe('TRUNCATE TABLE "Ticket" RESTART IDENTITY CASCADE;');
	// await db.$executeRawUnsafe('TRUNCATE TABLE "Message" RESTART IDENTITY CASCADE;');
	// await db.$executeRawUnsafe('TRUNCATE TABLE "Account" RESTART IDENTITY CASCADE;');

	// MySQL example (note that MySQL does not automatically reset auto-increment values with TRUNCATE)
	// await db.$executeRawUnsafe('TRUNCATE TABLE `Message`;');
	// For MySQL, to reset auto-increment you might need an additional command like:
	// await db.$executeRawUnsafe('ALTER TABLE `Message` AUTO_INCREMENT = 1;');

	// await db.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1;`;

	const users = [
		// {
		// 	id: 'cltr76i5m0000dz935mfhrn23',
		// 	email: 'moggiex@gmail.com',
		// 	username: null,
		// 	firstName: 'Matt',
		// 	lastName: null,
		// 	emailVerified: null,
		// 	phone: null,
		// 	password: '$2a$12$uZXEAll0O65/1297HL9zQ.Ir9rRyk1u68xm93umFt3hGLNgt7hF3y',
		// 	forgotPasswordToken: null,
		// 	avatar: null,
		// 	role: 'Admin',
		// 	status: 'Active',
		// 	isAdmin: true,
		// 	isSupport: false,
		// 	createdAt: '2024-03-14T12:19:41.291Z',
		// 	updatedAt: '2024-03-17T09:53:27.037Z',
		// 	deletedAt: null,
		// 	lastLogin: '2024-03-16T09:24:26.281Z',
		// 	lastSeen: '2024-03-17T09:53:27.035Z',
		// },
		{
			firstName: 'Matt',
			username: 'support',
			email: 'support@ebaycrm.com',
			password: '$2a$12$uZXEAll0O65/1297HL9zQ.Ir9rRyk1u68xm93umFt3hGLNgt7hF3y',
			isSupport: true,
			isAdmin: false,
			role: 'Admin',
		},
		{
			firstName: 'Mike',
			username: 'i_am_user_1',
			email: 'user@ebaycrm.com',
			password: '$2a$12$uZXEAll0O65/1297HL9zQ.Ir9rRyk1u68xm93umFt3hGLNgt7hF3y',
			role: 'Customer',
		},
		{
			firstName: 'Jane',
			username: 'i_am_user_2',
			email: 'user1@ebaycrm.com',
			password: '$2a$12$uZXEAll0O65/1297HL9zQ.Ir9rRyk1u68xm93umFt3hGLNgt7hF3y',
			role: 'Customer',
		},
		{
			firstName: 'Bobby',
			username: 'i_am_user_3',
			email: 'user2@ebaycrm.com',
			password: '$2a$12$uZXEAll0O65/1297HL9zQ.Ir9rRyk1u68xm93umFt3hGLNgt7hF3y',
			role: 'Customer',
		},
	];

	for (const userData of users) {
		const user = await db.user.create({
			data: userData,
		});

		const account = await db.account.create({
			data: {
				userId: user.id,
				type: 'ebay',
				account_name: `fake-ebay-account-${user.id}`,
				// Add other required fields for a ticket
			},
		});

		// console.log(account);

		// Assuming Ticket and Message models are related to User model with userId
		// Create 2 tickets for each user
		for (let i = 0; i < 2; i++) {
			await db.ticket.create({
				data: {
					subject: `Ticket ${i + 1} for ${user.firstName}`,
					message: `This is a message for ticket ${i + 1} from ${user.firstName}`,
					userId: user.id,
					type: 'Issue',
					// Add other required fields for a ticket
				},
			});
		}

		// Create 2 messages for each user
		for (let i = 0; i < 2; i++) {
			await db.message.create({
				data: {
					subject: `Message ${i + 1} from ${user.firstName}`,
					body: `Message ${i + 1} body content`,
					sender: 'test-user', // Assuming 'sender' is the name of the user
					receiveDate: new Date(),
					read: false, // Default is false, but explicitly setting it for clarity
					replied: false, // Default is false, but explicitly setting it for clarity
					user: {
						connect: {
							id: user.id, // Connect this message to the user using their ID
						},
					},
					account: {
						connect: {
							id: account.id, // Connect this message to the account using its ID
						},
					},
					// Add other required fields for a message
				},
			});
		}
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
