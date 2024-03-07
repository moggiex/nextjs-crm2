'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { getAlertById } from '@/db/actions/alerts/AlertsHelpers';

const EditAlertPage = async () => {
	const { id } = useParams();
	const alert = getAlertById(id);

	return (
		<div>
			<pre>{JSON.stringify(alert)}</pre>
		</div>
	);
};

export default EditAlertPage;
