// import { getRelevantAlertForUser } from '@/db/actions/alerts/AlertsHelpers';
import { useEffect, useState } from 'react';
import HeaderAltertContainer from '@/components/alerts/HeaderAltertContainer';
import { useApp } from '@/contexts/AppContext';

const HeaderAlert = () => {
	const { systemAlerts } = useApp();
	const [loading, setLoading] = useState(true);

	// console.log(systemAlerts);

	useEffect(() => {
		if (systemAlerts) {
			setLoading(false);
		}
	}, [systemAlerts]); // This effect updates the loading state based on systemAlerts

	if (loading) {
		return; // <div>Loading alerts...</div>; // Show loading or placeholder content
	}

	return <>{systemAlerts && <HeaderAltertContainer theAlert={systemAlerts.alert} userId={systemAlerts.userId} />}</>;
};

export default HeaderAlert;
