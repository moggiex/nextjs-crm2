import React from 'react';
import HttpError from '@/components/views/HttpError';

export default function NotFound() {
	return (
		<HttpError
			title="404 Page Not Found"
			footertext="This error has been logged and we have despatched a team of coffee fueld monkeys to fix it."
		>
			The page you are looking for does not exist
		</HttpError>
	);
}
