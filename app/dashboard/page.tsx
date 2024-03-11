'use client';
import React from 'react';
import PlaceholderView from '@/components/views/PlaceholderView';
import { useSearchParams } from 'next/navigation';

export default function AppMainPage() {
	const searchParams = useSearchParams();
	const newAccount = searchParams.get('newAccount');
	return (
		<>
			{newAccount && <PlaceholderView title="New Account" text="Your account has been created!" />}
			<PlaceholderView title="App Main Page" text="This page is protected by middleware!" />
		</>
	);
}
