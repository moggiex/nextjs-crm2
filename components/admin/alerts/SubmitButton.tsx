'use client';
import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" color="primary" disabled={pending}>
			{pending ? 'Saving...' : 'Save'}
		</Button>
	);
};

export default SubmitButton;
