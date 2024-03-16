'use client';
import { Select, SelectItem } from '@nextui-org/react';
// import InlineMessage from '@/components/InlineMessage';

const IssueTypeSelect = ({ onIssueTypeChange, typeError }) => {
	return (
		<>
			<Select
				name="issuetype"
				id="issuetype"
				label="Select a Ticket Type "
				className="max-w-xs p-2 mb-2"
				defaultSelectedKeys={['Issue']}
				isInvalid={!!typeError}
				errorMessage={typeError}
				onChange={e => onIssueTypeChange(e.target.value)} // Call the parent's function with the new value
			>
				<SelectItem key="Issue" value="Issue">
					Issue
				</SelectItem>
				<SelectItem key="FeatureRequest" value="FeatureRequest">
					Feature Request
				</SelectItem>
				<SelectItem key="Query" value="Query">
					Query
				</SelectItem>
			</Select>

			{/* {typeError && <InlineMessage message={typeError} />} */}
		</>
	);
};

export default IssueTypeSelect;
