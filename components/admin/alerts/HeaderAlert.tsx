// 'use server';
import { getRelevantAlertForUser } from '@/db/actions/alerts/AlertsHelpers';
import React, { useState, useEffect } from 'react';

function getAlerts() {
	return async function fetchAlert() {
		await getRelevantAlertForUser();
		// return result;
	};
}

const HeaderAlert = () => {
	const [messagePromise, setMessagePromise] = useState(null);
	const [show, setShow] = useState(false);

	function download() {
		setMessagePromise(getAlerts());
		setShow(true);
	}

	useEffect(() => {
		const fetchAlert = async () => {
			// const result = download()
			setMessagePromise(getAlerts());
		};
	});

	// download();

	if (show) {
		return <pre>{JSON.stringify(messagePromise, 2)}</pre>;
		// return <AlertContainer messagePromise={messagePromise} />;
	} else {
		return <></>;
	}

	// 	fetchAlert();
	// }, []); // Empty dependency array means this effect runs once on mount

	// // Optionally, handle the case when there's no alert or while it's being fetched
	// if (!userAlert) return <div>No relevant alerts</div>;

	// return <pre>{JSON.stringify(userAlert, null, 2)}</pre>;
};

export default HeaderAlert;
