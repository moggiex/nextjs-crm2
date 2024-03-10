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
			return { style: 'bg-blue-500 text-white', Icon: FaInfoCircle };
		case AlertType.Warning:
			return { style: 'bg-yellow-500 text-black', Icon: FaExclamationTriangle };
		case AlertType.Danger:
			return { style: 'bg-red-500 text-white', Icon: FaExclamationCircle };
		case AlertType.Success:
			return { style: 'bg-green-500 text-white', Icon: FaCheckCircle };
		case AlertType.Info:
			return { style: 'bg-cyan-500 text-white', Icon: FaInfoCircle };
		case AlertType.Other:
			return { style: 'bg-gray-500 text-white', Icon: FaQuestionCircle };
		default:
			return { style: 'bg-gray-200 text-black', Icon: FaQuestionCircle }; // Default case for unknown types
	}
};
