// 'use client';
import React from 'react';
import AlertForm from '@/components/admin/alerts/AlertForm';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const EditAlertPage = async ({ params }: { params: { id?: string } }) => {
	// const { id } = useParams();
	// const router = useRouter();

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Alerts', href: '/admin/alerts' },
					{ name: 'Edit', href: `/admin/alerts/${params.id}` },
				]}
			/>
			<AlertForm alertId={params.id} />;
		</>
	);
};

export default EditAlertPage;
