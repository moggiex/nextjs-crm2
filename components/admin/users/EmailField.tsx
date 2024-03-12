'use client';
import InlineError from '@/components/InlineError';
import { Input, Switch } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

const EmailField = ({ email, emailError, emailErrorMessage }) => {
	const [isSelected, setIsSelected] = useState(false);
	// console.log(email);
	// console.log(isSelected);

	return (
		<>
			<Input
				id="email"
				label="Email Address"
				name="email"
				type="email"
				color={isSelected ? 'danger' : 'default'}
				defaultValue={email}
				placeholder="Email Address"
				variant="bordered"
				startContent={<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />}
				className="mb-4"
				isDisabled={isSelected ? false : true}
				isInvalid={emailError}
				errorMessage={emailErrorMessage}
			/>
			{isSelected && (
				<InlineError errorMessage="With is enabled, you will change the users email address when updating" />
			)}

			<Switch
				// defaultSelected={!!emailDisabled}
				className="mb-3"
				aria-label="Edit Email Address?"
				defaultSelected={isSelected}
				isSelected={isSelected}
				onValueChange={setIsSelected}
				// onChange={e => enableEmailField(e.target.checked)}
			>
				Edit Email Address?
			</Switch>
		</>
	);
};

export default EmailField;
