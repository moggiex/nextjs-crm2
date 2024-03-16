'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

type ButtonProps = {
	type?: 'submit' | 'button' | 'reset';
	colour?: 'primary' | 'default' | 'secondary' | 'success' | 'warning' | 'danger';
	className?: string;
	label?: string;
	labelUpdating?: string;
};

const SubmitButton: React.FC<ButtonProps> = ({
	type = 'submit',
	colour = 'primary',
	className = '',
	label = 'Update',
	labelUpdating = 'Updating',
}) => {
	const { pending } = useFormStatus();
	return (
		<Button type={type} color={colour} className={className}>
			{pending ? `${labelUpdating}...` : `${label}`}
		</Button>
	);
};

export default SubmitButton;
