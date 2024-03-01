'use client';
import React from 'react';
import PlaceholderView from '@/components/views/PlaceholderView';
import { useApp } from '@/contexts/AppContext';

export default function AccountMainPage() {
	const { userData } = useApp();
	if (userData) {
		console.log(userData);
	}
	return (
		<>
			<pre>{JSON.stringify(userData, null, 2)}</pre>
			{/* <PlaceholderView title="Account Main Page" text="This page is only accessible to logged in users!" /> */}
		</>
	);
}
