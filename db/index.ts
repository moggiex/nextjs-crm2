// import { PrismaClient } from '@prisma/client';

// let connected = false;

// export const db = new PrismaClient();

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

db.$connect()
	.then(() => {
		console.log('Prisma DB connected');
	})
	.catch((error) => {
		console.error('Failed to connect to Prisma DB:', error);
	});

// Change this to use named export
export { db };
