// 'use client';
import React from 'react';
import { getUserProfile, getCountries } from '@/db/actions/profile';
import ProfileForm from '@/components/views/ProfileForm';
// import PlaceholderView from '@/components/views/PlaceholderView';
// import { useApp } from '@/contexts/AppContext';
// import ProfielView from '@/components/views/ProfileView';

export default async function AccountMainPage() {
	// const { userData } = useApp();
	// if (userData) {
	// 	console.log(userData);
	// }
	const userDetails = await getUserProfile();
	const countries = await getCountries();
	// const countries = [];

	// console.log(user);
	return (
		<>
			{/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
			{/* <PlaceholderView title="Account Main Page" text="This page is only accessible to logged in users!" /> */}
			<ProfileForm userDetails={userDetails} countries={countries} />
		</>
	);
}
