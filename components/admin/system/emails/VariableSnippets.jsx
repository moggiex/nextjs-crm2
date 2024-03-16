import { Button, Snippet } from '@nextui-org/react';
import { useState } from 'react';

// Variables organized by category
const customerVariables = [
	'%%fullName%%',
	'%%firstName%%',
	'%%lastName%%',
	'%%username%%',
	'%%userEmail%%',
	'%%userPhoneNumber%%',
];
const linkVariables = [
	'%%link%%',
	'%%siteLink%%',
	'%%dashboardLink%%',
	'%%loginLink%%',
	'%%forgotPasswordLink%%',
	'%%resetPasswordLink%%',
];
const siteVariables = ['%%siteName%%', '%%siteEmail%%', '%%siteAddress%%', '%%sitePhoneNumber%%'];

const VariableSnippets = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};
	return (
		<>
			<Button onClick={toggleVisibility} color="primary" variant="ghost">
				Show Variables
			</Button>
			<div className={isVisible ? '' : 'hidden'}>
				<div>
					<b>Customer:</b>
					<br />
					{customerVariables.map((variable, index) => (
						<Snippet
							key={`customer-${index}`}
							size="sm"
							className="p-0 pl-2 mr-2 mb-2"
							symbol=""
							variant="bordered"
						>
							{variable}
						</Snippet>
					))}
				</div>
				<div>
					<b>Links:</b>
					<br />
					{linkVariables.map((variable, index) => (
						<Snippet
							key={`link-${index}`}
							size="sm"
							className="p-0 pl-2 mr-2 mb-2"
							symbol=""
							variant="bordered"
						>
							{variable}
						</Snippet>
					))}
				</div>
				<div>
					<b>Site:</b>
					<br />
					{siteVariables.map((variable, index) => (
						<Snippet
							key={`site-${index}`}
							size="sm"
							className="p-0 pl-2 mr-2 mb-2"
							symbol=""
							variant="bordered"
						>
							{variable}
						</Snippet>
					))}
				</div>
			</div>
		</>
	);
};

export default VariableSnippets;
