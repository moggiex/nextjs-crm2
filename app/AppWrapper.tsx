'use client';

import React from 'react';
import Header from './Header';
import LoadingOverlay from './LoadingOverlay';

import { AppProvider } from '@/contexts/AppContext';
import { Next13NProgress } from 'nextjs13-progress';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '@/app/Footer';
import HeaderAlert from '@/components/admin/alerts/HeaderAlert';

interface Props {
	children: React.ReactNode;
}

export default function AppWrapper(props: Props) {
	const { children } = props;
	return (
		<AppProvider>
			<NextUIProvider>
				<div className="flex flex-col min-h-screen text-base-content">
					{/* <HeaderAlert /> */}
					<Header />

					<main className="flex-1 w-full px-4 md:px-6 lg:px-0 pt-8">
						<div className="max-w-4xl mx-auto">{children}</div>
					</main>

					<Footer />
				</div>
				<LoadingOverlay />

				<Next13NProgress height={7} color="rgb(0, 112, 240)" />
			</NextUIProvider>
		</AppProvider>
	);
}
