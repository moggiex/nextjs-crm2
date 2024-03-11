'use client';

import React from 'react';
// q: can this be simplified to a functional component?
import { useApp } from '@/contexts/AppContext';
// import { FaCircleNotch } from 'react-icons/fa';
// import './loading.css';
import { Spinner } from '@nextui-org/react';

export default function LoadingOverlay() {
	const { isLoading } = useApp();

	if (!isLoading) return null;

	return (
		<div
			className="fixed inset-0 z-50 bg-primary flex items-center justify-center text-primary-content
 opacity-80"
		>
			<div className="flex items-center gap-3">
				<Spinner />
				<div className="animate-pulse font-bold text-3xl">Loading...</div>
			</div>
		</div>
	);
}
