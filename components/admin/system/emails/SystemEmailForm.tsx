'use client';
import React, { useState } from 'react';
import { useRouter } from 'nextjs13-progress';
// import HtmlEditor from '../HtmlEditor';
import { Input, Select, SelectItem, Snippet, Switch, Textarea } from '@nextui-org/react';
import { FaCode, FaEnvelope, FaList, FaToggleOn } from 'react-icons/fa';
import SubmitButton from '@/components/SubmitButton';
import { updateSystemEmail } from '@/db/actions/system/emails/helper';
import InlineMessage from '@/components/InlineMessage';
import VariableSnippets from '@/components/admin/system/emails/VariableSnippets';

// Quill
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { quillFormats, quillModules } from '@/lib/common/quill';

const SystemEmailForm = ({ template }) => {
	// console.log('template', template);
	// Initialize state for form fields

	const id = template?.id || null;

	const router = useRouter();

	const [templateName, setTemplateName] = useState(template?.templateName || '');
	const [internalName, setInternalName] = useState(template?.internalName || '');
	const [emailSubject, setEmailSubject] = useState(template?.emailSubject || '');
	const [htmlBody, setHtmlBody] = useState(template?.htmlBody || '');
	const [htmlEnabled, setHtmlEnabled] = useState(template?.htmlEnabled || true);
	const [isEnabled, setIsEnabled] = useState(template?.enabled ? true : false);
	const [type, setType] = useState(template?.type || 'customer');
	const [isError, setIsError] = useState();

	// const handleQuillChange = (content, delta, source, editor) => {
	// 	setHtmlBody(editor.getHTML()); // Get HTML content
	// 	console.log(htmlBody);
	// };
	const handleQuillChange = newContent => {
		setHtmlBody(newContent);
	};

	const formAction = async () => {
		console.log('here');
		const resp = await updateSystemEmail({
			id,
			templateName,
			internalName,
			emailSubject,
			htmlBody,
			type,
			htmlEnabled,
			enabled: isEnabled,
		});

		// console.log(resp);

		if (!resp.success) {
			setIsError(resp?.message);
			return;
		}

		router.push('/admin/system/emails');
	};

	// const [formState, formAction] = useFormState(updateSystemEmail, initialState);

	return (
		<form action={formAction}>
			<div className="flex w-full">
				{isError && <InlineMessage message={isError} />}
				<div className=" w-1/2 pr-4">
					<Input
						id="templateName"
						label="Template Name"
						name="templateName"
						defaultValue={templateName}
						placeholder="Template Name"
						onChange={e => setTemplateName(e.target.value)}
						startContent={<FaList className="text-default-400 pointer-events-none flex-shrink-0" />}
						variant="bordered"
						className="mb-4"
					/>
				</div>
				<div className=" w-1/4 pr-2">
					<Input
						id="internalName"
						label="Internal Name"
						name="internalName"
						defaultValue={internalName}
						placeholder="Internal Name"
						onChange={e => setInternalName(e.target.value)}
						startContent={<FaList className="text-default-400 pointer-events-none flex-shrink-0" />}
						variant="bordered"
						className="mb-4"
					/>
				</div>
				<div className="w-1/4">
					<Select
						name="type"
						label="Select Type"
						className="max-w-xs"
						defaultSelectedKeys={[type]}
						onChange={e => setType(e.target.value)}
						onValueChange={setType}
					>
						<SelectItem key="admin" value="admin">
							Admin
						</SelectItem>
						<SelectItem key="customer" value="customer">
							Customer
						</SelectItem>
					</Select>
				</div>
			</div>

			<Input
				id="emailSubject"
				label="Email Subject"
				name="emailSubject"
				defaultValue={emailSubject}
				placeholder="Email Subject"
				onChange={e => setEmailSubject(e.target.value)}
				startContent={<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />}
				variant="bordered"
				className="mb-4"
			/>

			<div className="w-full mb-4">
				<div className="w-full flex items-center justify-between">
					<div className="justify-left">
						<h4>Email Body</h4>
					</div>
					<div className="justify-end">
						<VariableSnippets />
					</div>
				</div>
				{htmlEnabled ? (
					<QuillEditor
						theme="snow"
						placeholder="Compose an epic..."
						defaultValue={htmlBody}
						value={htmlBody}
						// onChange={value => handleEditorChange(value)}
						onChange={handleQuillChange}
						modules={quillModules}
						formats={quillFormats}
						className="w-full h-[10 0%] mt-2 bg-white"
					/>
				) : (
					<Textarea
						id="htmlBody"
						label="HTML Body"
						name="htmlBody"
						defaultValue={htmlBody}
						placeholder="HTML Body"
						onChange={e => setHtmlBody(e.target.value)}
						startContent={<FaCode className="text-default-400 pointer-events-none flex-shrink-0" />}
						variant="bordered"
						className="mb-4"
					/>
				)}
			</div>

			<div className="flex w-full mb-2">
				<div className=" w-1/3 pr-4">
					<Switch name="htmlEnabled" isSelected={htmlEnabled} onValueChange={setHtmlEnabled}>
						HTML Email Enabled?
					</Switch>
					{/* <p className="text-small text-default-500">Selected: {htmlEnabled ? 'true' : 'false'}</p> */}
				</div>
				<div className=" w-1/3 pr-4">
					<Switch
						className=""
						name="isEnabled"
						aria-label="Email Enabled?"
						defaultSelected={isEnabled}
						isSelected={isEnabled}
						// onChange={e => setEnabled(!!isEnabled)}
						onValueChange={setIsEnabled}
					>
						{/* <Switch name="isEnabled" isSelected={isEnabled} onValueChange={setIsEnabled}> */}
						Email Enabled?
					</Switch>
				</div>
				<div className=" w-1/3"></div>
			</div>

			{/* <Select id="type" defaultValue={type} onChange={e => setType(e.target.value)} className="mb-4">
				<Select.Option value="admin">Admin</Select.Option>
				<Select.Option value="customer">Customer</Select.Option>
			</Select> */}

			<div className="justify-end">
				<SubmitButton />
				{/* <button>Sign up</button> */}
			</div>
		</form>
	);
};

export default SystemEmailForm;
