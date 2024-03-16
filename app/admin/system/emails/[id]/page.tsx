import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import InlineError from '@/components/InlineError';
import SystemEmailForm from '@/components/admin/system/emails/SystemEmailForm';
import { getSystemEmailById } from '@/db/actions/system/emails/helper';
import { Divider } from '@nextui-org/react';
import { Suspense } from 'react';

const EmailTemplateSettingsEditPage = async ({ params }: { params: { id?: string } }) => {
	const template = await getSystemEmailById({ id: params.id });

	if (!template) {
		return <InlineError errorMessage="System Email Template not found" />;
	}

	// const handleSubmit = async (formData: FormData) => {
	// 	'use server';
	// 	console.log('Form submitted');
	// };

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin Dashboard', href: '/admin' },
					{ name: 'System', href: '/admin/system' },
					{ name: 'System Emails', href: '/admin/system/emails' },
					{ name: 'Edit Email', href: '/admin/system/emails' },
				]}
			/>

			<h1>Edit: System Email Templates {template?.id}</h1>
			<Divider className="mb-4" />
			<p className="mb-4">You can edit the system template below.</p>

			<Suspense fallback={<div>Loading...</div>}>
				<SystemEmailForm template={template} />
			</Suspense>
		</>
	);
};

export default EmailTemplateSettingsEditPage;
