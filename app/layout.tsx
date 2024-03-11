import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import AppWrapper from './AppWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next.js Auth + Prisma',
	description: 'Next.js Auth +Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="customTheme">
			<body className={inter.className}>
				<AppWrapper>{children}</AppWrapper>
			</body>
		</html>
	);
}
