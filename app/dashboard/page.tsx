'use client';
import React from 'react';
import PlaceholderView from '@/components/views/PlaceholderView';
import { useSearchParams } from 'next/navigation';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

export default function AppMainPage() {
	const searchParams = useSearchParams();
	const newAccount = searchParams.get('newAccount');
	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Dashboard', href: '/dashboard' },
				]}
			/>
			{newAccount && <PlaceholderView title="New Account" text="Your account has been created!" />}
			<PlaceholderView title="App Main Page" text="This page is protected by middleware!" />
		</>
	);
}
