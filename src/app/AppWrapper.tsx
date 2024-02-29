'use client';

import React from 'react';
import Header from './Header';
import LoadingOverlay from './LoadingOverlay';

import { AppProvider } from '@/contexts/AppContext';
import { Next13NProgress } from 'nextjs13-progress';
import { NextUIProvider } from '@nextui-org/react';

interface Props {
	children: React.ReactNode;
}

export default function AppWrapper(props: Props) {
	const { children } = props;
	return (
		<AppProvider>
			<NextUIProvider>
				<div className="flex flex-col min-h-screen text-base-content">
					<Header />
					{children}
				</div>
				<LoadingOverlay />
				<Next13NProgress height={7} color="#fcba03" />
			</NextUIProvider>
		</AppProvider>
	);
}
