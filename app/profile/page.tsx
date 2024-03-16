// 'use client';
import React from 'react';
import { getUserProfile, getCountries } from '@/db/actions/user/profile';
import ProfileForm from '@/components/views/ProfileForm';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
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
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Profile', href: '/profile' },
					{ name: 'Edit Profile', href: '/profile' },
				]}
			/>
			<ProfileForm userDetails={userDetails} countries={countries} />
		</>
	);
}
