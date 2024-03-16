import React, { Suspense } from 'react';
import AdminEmailList from '@/components/admin/system/emails/AdminEmailList';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import { Divider } from '@nextui-org/react';
import { getSystemEmailTemplates } from '@/db/actions/system/emails/helper';

const EmailTemplateSettingsList = async () => {
	// Fetch system email templates
	const SystemEmailTemplates = await getSystemEmailTemplates();

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin Dashboard', href: '/admin' },
					{ name: 'System', href: '/admin/system' },
					{ name: 'System Emails', href: '/admin/system/emails' },
				]}
			/>
			<h1>System Email Templates</h1>
			<Divider className="mb-4" />
			<p className="mb-4">This is a list of system templates used for emails</p>

			<Suspense fallback={<div>Loading...</div>}>
				<AdminEmailList SystemEmailTemplates={SystemEmailTemplates} />
			</Suspense>
		</>
	);
};

export default EmailTemplateSettingsList;
