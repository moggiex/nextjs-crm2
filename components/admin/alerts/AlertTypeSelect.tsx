'use client';
import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { AlertType } from '@/prisma/typescript.alerts';

const alertTypes = [
	{ value: AlertType.Primary, label: 'Primary' },
	{ value: AlertType.Warning, label: 'Warning' },
	{ value: AlertType.Danger, label: 'Danger' },
	{ value: AlertType.Success, label: 'Success' },
	{ value: AlertType.Info, label: 'Info' },
	{ value: AlertType.Other, label: 'Other' },
];

interface AlertTypeSelectProps {
	selectedType: AlertType | null;
}

const AlertTypeSelect: React.FC<AlertTypeSelectProps> = ({ selectedType = AlertType.Primary }) => {
	return (
		<Select
			name="alertType"
			label="Alert Type"
			placeholder="Select Alert Type"
			className="mb-4"
			variant="bordered"
			defaultSelectedKeys={['Primary']}
		>
			{alertTypes.map(({ key, value, label }) => (
				<SelectItem key={label} value={value} textValue={label}>
					{label}
				</SelectItem>
			))}
		</Select>
	);
};

export default AlertTypeSelect;
