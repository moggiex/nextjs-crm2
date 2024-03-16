import React from 'react';
import AlertForm from '@/components/admin/alerts/AlertForm';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const CreateAlterPage = () => {
	<BreadcrumbTrail
		items={[
			{ name: 'Home', href: '/' },
			{ name: 'Admin', href: '/admin' },
			{ name: 'Alerts', href: '/admin/alerts' },
			{ name: 'Create', href: `/` },
		]}
	/>;

	return <AlertForm id={null} />;
};

export default CreateAlterPage;
