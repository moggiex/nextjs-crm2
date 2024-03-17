import React from 'react';
import { getSystemSettings, updateSystemSettings } from '@/db/actions/system/helper';
import InlineMessage from '@/components/InlineMessage';

const SystemSettingsCheck = async () => {
	const resp = await getSystemSettings();

	if (!resp || resp?.siteName === '' || resp?.siteName === null || resp?.siteName === 'Your Amazing Website') {
		return (
			<InlineMessage
				type="error"
				message={`Please update your <a href='/admin/system'>system settings</a> before continuing.`}
			/>
		);
	}

	return;
};

export default SystemSettingsCheck;
