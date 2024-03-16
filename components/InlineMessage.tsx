import React from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';

type InlineMessageProps = {
	message: string;
	type?: null | 'error' | 'success';
};
const InlineMessage: React.FC<InlineMessageProps> = ({
	message = '', // Providing default value
	type = 'error', // Providing default value
}) => {
	return (
		<div className={`text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-700'} p-2 rounded mb-4`}>
			{type === 'error' ? (
				<FaExclamationTriangle className="mx-2 inline-block" />
			) : (
				<FaCheck className="mx-2 inline-block" />
			)}
			{message}
		</div>
	);
};

export default InlineMessage;
