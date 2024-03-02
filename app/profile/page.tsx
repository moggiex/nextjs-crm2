// 'use client';
import React from 'react';
import { getUserProfile } from '@/db/actions/profile';
import ProfileForm from '@/components/views/ProfileForm';
// import PlaceholderView from '@/components/views/PlaceholderView';
// import { useApp } from '@/contexts/AppContext';
// import ProfielView from '@/components/views/ProfileView';

export default async function AccountMainPage() {
	// const { userData } = useApp();
	// if (userData) {
	// 	console.log(userData);
	// }
	const { user, countries } = await getUserProfile();
	return (
		<>
			{/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
			{/* <PlaceholderView title="Account Main Page" text="This page is only accessible to logged in users!" /> */}
			<ProfileForm user={user} countries={countries} />;
		</>
	);
}
