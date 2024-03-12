import { PrismaClient } from '@prisma/client';

// Use a global variable to store the PrismaClient instance, so it's reused across hot reloads in development
declare global {
	var db: PrismaClient | undefined;
}

const db =
	globalThis.db ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
		// log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

if (process.env.NODE_ENV !== 'production') globalThis.db = db;

export { db };

// const db = new PrismaClient();

// db.$connect()
// 	.then(() => {
// 		console.log('Prisma DB connected');
// 	})
// 	.catch(error => {
// 		console.error('Failed to connect to Prisma DB:', error);
// 	});

// // Change this to use named export
// export { db };
