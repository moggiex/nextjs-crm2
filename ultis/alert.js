import {
	FaExclamationCircle,
	FaInfoCircle,
	FaCheckCircle,
	FaExclamationTriangle,
	FaQuestionCircle,
	FaTimes,
} from 'react-icons/fa';

import { Alert, AlertType } from '@/prisma/typescript.alerts';

export const getAlertStyles = (type) => {
	switch (type) {
		case AlertType.Primary:
			return { style: 'bg-primary text-primary-content', Icon: FaInfoCircle };
		case AlertType.Warning:
			return { style: 'bg-warning text-warning-content', Icon: FaExclamationTriangle };
		case AlertType.Danger:
			return { style: 'bg-error text-error-content', Icon: FaExclamationCircle };
		case AlertType.Success:
			return { style: 'bg-success text-success-content', Icon: FaCheckCircle };
		case AlertType.Info:
			return { style: 'bg-info text-info-content', Icon: FaInfoCircle };
		case AlertType.Other:
			return { style: 'bg-neutral text-neutral-content', Icon: FaQuestionCircle };
		default:
			return { style: 'bg-neutral text-neutral-content', Icon: FaQuestionCircle }; // Default case for unknown types
	}
};
