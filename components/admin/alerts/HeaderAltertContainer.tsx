import {
	FaExclamationCircle,
	FaInfoCircle,
	FaCheckCircle,
	FaExclamationTriangle,
	FaQuestionCircle,
	FaTimes,
} from 'react-icons/fa';
import React, { useState } from 'react';
import { Alert, AlertType } from '@/prisma/typescript.alerts';
import { dismissAlert } from '@/db/actions/alerts/AlertsHelpers';
import { usePathname } from 'next/navigation';
import { getAlertStyles } from '@/ultis/alert';

const HeaderAltertContainer = ({ theAlert, userId }: Alert) => {
	const [isAlertVisible, setIsAlertVisible] = useState(true); // Initially, the alert is visible

	const pathname = usePathname();
	// console.log(theAlert);
	const style = getAlertStyles(theAlert.type);

	const handleDismissAlert = async (alertId, userId, currentUrl) => {
		// Call your dismissAlert function and await its result
		const result = await dismissAlert(alertId, userId, currentUrl);

		// If the dismiss was successful, hide the alert
		if (result && result.success) {
			setIsAlertVisible(false);
		}
	};

	if (!isAlertVisible) return null; // Don't render anything if the alert is not supposed to be visible

	return (
		<>
			{isAlertVisible && (
				<div className={`${style.style} w-full relative`}>
					<div className="max-w-4xl mx-auto p-4 flex items-center">
						<style.Icon className="inline-block mr-4 text-3xl" />
						<div className="flex-grow">
							{theAlert.message} {theAlert.type} {String(theAlert.enabled)}{' '}
							<a
								href="#"
								onClick={() =>
									handleDismissAlert(
										theAlert.id,
										userId,
										`${window.location.origin}${pathname}`,
									)
								}
								className="ml-2 underline"
							>
								Dismiss
							</a>
						</div>
						<FaTimes
							onClick={() =>
								handleDismissAlert(theAlert.id, userId, `${window.location.origin}${pathname}`)
							}
							className="ml-auto hover:cursor-pointer text-2xl"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default HeaderAltertContainer;
