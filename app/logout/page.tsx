'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'nextjs13-progress';

import { useApp } from '@/contexts/AppContext';
import { Button } from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';

export default function LogoutPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedOut, setIsLoggedOut] = useState(false);
	const { loadUserData } = useApp();

	useEffect(() => {
		fetch('/api/auth/logout', {
			method: 'GET',
		})
			.then(res => {
				if (res.ok) {
					setIsLoggedOut(true);
					loadUserData();
				}
			})
			.catch(() => {
				console.error('Something went wrong!');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="flex flex-col items-center gap-6 m-auto w-full max-w-md">
			{isLoading ? (
				<>
					<div className="loading loading-ring w-[200px]"></div>
					<h1 className="text-4xl font-bold">Logging Out</h1>
				</>
			) : isLoggedOut ? (
				<>
					<h1 className="text-4xl font-bold">Logout</h1>
					<p className="text-xl">
						You have been logged out. You can <Link href="/login">login</Link> again.
					</p>
					<Button as="a" color="primary" variant="solid" className="text-white" href="/">
						{' '}
						<FaArrowLeft className="mr-2" />
						Go back Home
					</Button>
				</>
			) : (
				<>
					<h1 className="text-4xl font-bold">Error</h1>
					<p className="text-xl">Something went wrong! Try again.</p>
					<Button as="a" color="primary" variant="solid" className="text-white" href="/">
						{' '}
						<FaArrowLeft className="mr-2" />
						Go back Home
					</Button>
				</>
			)}
		</div>
	);
}
