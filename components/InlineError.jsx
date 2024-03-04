import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
const InlineError = ({ errorMessage }) => {
	return (
		<div className="text-white bg-red-600 p-2 rounded mb-4">
			<FaExclamationTriangle className="mx-2 inline-block" />
			{errorMessage}
		</div>
	);
};

export default InlineError;
