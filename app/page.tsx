import React from 'react';
import PlaceholderView from '@/components/views/PlaceholderView';
import LoginActionsCard from '@/components/LoginActionsCard';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

export default function MainPage() {
	return (
		<>
			<BreadcrumbTrail items={[{ name: 'Home', href: '/' }]} />
			<PlaceholderView title="Main Page" text="This page is not protected." />
		</>
	);
}
