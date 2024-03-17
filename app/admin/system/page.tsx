import React, { Suspense } from 'react';
import { Divider } from '@nextui-org/react';

import SystemSettingsSkeleton from '@/components/admin/system/SystemSettingsSkeleton';
import SystemSettingsForm from '@/components/admin/system/SystemSettingsForm';

const SystemSettingsPage = async () => {
	// TODO: Trhe skeleton is now showing, but the form is
	return (
		<>
			<h1>System Settings</h1>
			<Divider className="mb-4" />
			<p className="mb-4">These are the site system settings</p>
			<Suspense fallback={<SystemSettingsSkeleton />}>{<SystemSettingsForm />}</Suspense>
		</>
	);
};

export default SystemSettingsPage;
