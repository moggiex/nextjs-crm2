// 'use client';
import React from 'react';
import AlertForm from '@/components/admin/alerts/AlertForm';

const EditAlertPage = async ({ params }: { params: { id?: string } }) => {
	// const { id } = useParams();
	// const router = useRouter();

	return <AlertForm id={params.id} />;
};

export default EditAlertPage;
