import { getRelevantAlertForUser } from '@/db/actions/alerts/AlertsHelpers';
import { useEffect, useState } from 'react';
import HeaderAltertContainer from './HeaderAltertContainer';

const HeaderAlert = () => {
	const [theAlert, setTheAlert] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getRelevantAlertForUser();
			// console.log(result);

			if (!result) {
				return;
			}

			setTheAlert(result);
			// console.log(result);
		};

		fetchData();
	}, []);

	return <>{theAlert && <HeaderAltertContainer theAlert={theAlert.alert} userId={theAlert.userId} />}</>;
};

export default HeaderAlert;
