'use client';

import React from 'react';

import { useApp } from '@/contexts/AppContext';
import { FaCircleNotch } from 'react-icons/fa';
import './loading.css';

export default function LoadingOverlay() {
	const { isLoading } = useApp();

	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center text-white">
			<div className="flex items-center gap-3">
				<div className="loading loading-lg">
					<FaCircleNotch className="spinner text-3xl" />
				</div>
				<div className="animate-pulse font-bold text-3xl">Loading...</div>
			</div>
		</div>
	);
}
