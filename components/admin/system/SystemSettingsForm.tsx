'use client';
import React, { useEffect, useState } from 'react';
import { Divider, Input, Select, SelectItem, Snippet, Switch, Textarea } from '@nextui-org/react';
import { FaAddressBook, FaGlobe, FaKey, FaLink, FaMapMarker, FaPhone, FaPlug, FaServer, FaUser } from 'react-icons/fa';
import SubmitButton from '@/components/SubmitButton';
import InlineMessage from '@/components/InlineMessage';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

// Quill
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { quillFormats, quillModules } from '@/lib/common/quill';
import { getSystemSettings, updateSystemSettings } from '@/db/actions/system/helper';
import SystemSettingsSkeleton from './SystemSettingsSkeleton';

const SystemSettingsForm = () => {
	// const router = useRouter();
	const [isError, setIsError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccessUpdating, setIsSuccessUpdating] = useState('');

	// State for each setting
	const [settings, setSettings] = useState({
		siteName: 'My Site',
		siteURL: 'http://localhost:3000',
		siteEmailAddress: 'email@email.com',
		loginEnabled: true,
		loginDisabledMessage: '',
		createAccountEnabled: true,
		createAccountDisabledMessage: '',
		registrationEnabled: true,
		registrationDisabledMessage: '',
		forgotPasswordEnabled: true,
		forgotPasswordDisabledMessage: '',
		emailEnabled: true,
		emailFrom: '',
		emailServerUser: '',
		emailServerPassword: '',
		emailServerHost: '',
		emailServerPort: 587,
		emailServerSecure: true,
		businessName: '',
		addressLine1: '',
		addressLine2: '',
		cityState: '',
		postcodeZipCode: '',
		country: '',
		phoneNumber: '',
	});

	useEffect(() => {
		console.log('Fetching system settings...');
		setIsLoading(true);
		setIsError('');
		setIsSuccessUpdating('');
		const fetchSettings = async () => {
			try {
				const systemSettings = await getSystemSettings(); // Call your async function
				if (systemSettings) {
					setSettings(systemSettings);
				}
				// Update state with fetched settings
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setIsError(`Failed to fetch system settings: ${error.message}`);
				console.error('Failed to fetch system settings:', error);
				// Handle error (e.g., show a notification or set an error state)
			}
		};

		fetchSettings();
	}, []); // The empty dependency array ensures this effect runs only once after the initial render

	// Handler for text input changes
	const handleInputChange = e => {
		const { name, value } = e.target;
		setSettings(prev => ({ ...prev, [name]: value }));
		console.log(settings);
	};

	// Handler for switch changes
	const handleSwitchChange = name => value => {
		setSettings(prev => ({ ...prev, [name]: value }));
	};

	// Quill
	const handleQuillChange = (field, value) => {
		setSettings(prev => ({ ...prev, [field]: value }));
		console.log(settings);
	};

	// form submit handler
	const formHandler = async e => {
		setIsError('');
		setIsSuccessUpdating('');
		console.log('Submitting form...');
		const resp = await updateSystemSettings(settings);
		if (!resp.success) {
			setIsError(resp?.message);
			return;
		}
		setIsSuccessUpdating(resp.message);
		// router.push('/admin/system');
	};

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin Dashboard', href: '/admin' },
					{ name: 'System', href: '/admin/system' },
					{ name: 'System Settings', href: '/admin/system' },
				]}
			/>
			<form action={formHandler} className="space-y-4 mb-8">
				{isLoading && <SystemSettingsSkeleton />}
				{isError && <InlineMessage message={isError} />}
				{isSuccessUpdating && <InlineMessage message={isSuccessUpdating} type="success" />}
				{!isLoading && settings && (
					<>
						<div className="justify-end">
							<SubmitButton />
							{/* <button>Sign up</button> */}
						</div>
						<h3>Basic Site Details</h3>
						<Input
							id="siteName"
							label="Site Name"
							name="siteName"
							value={settings.siteName}
							onChange={handleInputChange}
							startContent={
								<FaList className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
							className="mb-4"
						/>
						<Input
							id="siteURL"
							label="Site Url"
							name="siteURL"
							value={settings.siteURL}
							onChange={handleInputChange}
							startContent={
								<FaLink className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
							className="mb-4"
						/>
						<Input
							id="siteEmailAddress"
							label="siteEmailAddress"
							name="siteEmailAddress"
							type="email"
							value={settings.siteEmailAddress}
							onChange={handleInputChange}
							startContent={
								<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
							className="mb-4"
						/>

						<div className="flex mb-4 space-x-4">
							<div className="w-1/2">
								<h3>Email Server Settings</h3>
								<Divider className="mb-4" />

								<Switch
									name="emailEnabled"
									isSelected={settings.emailEnabled}
									onValueChange={handleSwitchChange('emailEnabled')}
									className="mb-4"
								>
									Emails Enabled?
								</Switch>

								<Input
									id="emailFrom"
									label="Email From"
									name="emailFrom"
									type="email"
									value={settings.emailFrom}
									onChange={handleInputChange}
									startContent={
										<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									disabled={!settings.emailEnabled}
									className="mb-4"
								/>
								<Input
									id="emailServerUser"
									label="Email Server User"
									name="emailServerUser"
									value={settings.emailServerUser}
									onChange={handleInputChange}
									startContent={
										<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									disabled={!settings.emailEnabled}
									className="mb-4"
								/>
								{process.env.EMAIL_SERVER_USER ? 'yes' : 'no'}
								{Boolean(process.env.EMAIL_SERVER_USER) && (
									<InlineMessage
										message={`process.env.EMAIL_SERVER_USER has already been set to ${process.env.EMAIL_SERVER_USER}`}
										type="error"
									/>
								)}

								<Input
									id="emailServerPassword"
									label="Email Server Password"
									name="emailServerPassword"
									value={settings.emailServerPassword}
									onChange={handleInputChange}
									startContent={
										<FaKey className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									disabled={!settings.emailEnabled}
									type="password"
									className="mb-4"
								/>
								{Boolean(process.env.EMAIL_SERVER_PASSWORD) && (
									<InlineMessage
										message={`process.env.EMAIL_SERVER_PASSWORD has already been set to ${process.env.EMAIL_SERVER_PASSWORD}`}
										type="error"
									/>
								)}

								<Input
									id="emailServerHost"
									label="Email Server Host"
									name="emailServerHost"
									value={settings.emailServerHost}
									onChange={handleInputChange}
									startContent={
										<FaServer className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									disabled={!settings.emailEnabled}
									className="mb-4"
								/>
								{Boolean(process.env.EMAIL_SERVER_HOST) && (
									<InlineMessage
										message={`process.env.EMAIL_SERVER_HOST has already been set to ${process.env.EMAIL_SERVER_HOST}`}
										type="error"
									/>
								)}

								<Input
									id="emailServerPort"
									label="Email Server Port"
									name="emailServerPort"
									value={settings.emailServerPort}
									onChange={handleInputChange}
									startContent={
										<FaPlug className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									disabled={!settings.emailEnabled}
									className="mb-4"
								/>
								{Boolean(process.env.EMAIL_SERVER_PORT) && (
									<InlineMessage
										message={`process.env.EMAIL_SERVER_PORT has already been set to ${process.env.EMAIL_SERVER_PORT}`}
										type="error"
									/>
								)}

								<Switch
									name="emailServerSecure"
									isSelected={settings.emailServerSecure}
									onValueChange={handleSwitchChange('emailServerSecure')}
									className="mb-4"
								>
									Secure Server?
								</Switch>
								{Boolean(process.env.EMAIL_SERVER_SECURE) && (
									<InlineMessage
										message={`process.env.EMAIL_SERVER_SECURE has already been set to ${process.env.EMAIL_SERVER_SECURE?.toString()}`}
										type="error"
									/>
								)}
							</div>

							<div className="w-1/2">
								<h3>Business Details</h3>
								<Divider className="mb-4" />

								<Input
									id="businessName"
									label="Business Name"
									name="businessName"
									value={settings.businessName}
									onChange={handleInputChange}
									startContent={
										<FaAddressBook className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="addressLine1"
									label="Address Line 1"
									name="addressLine1"
									value={settings.addressLine1}
									onChange={handleInputChange}
									startContent={
										<FaAddressBook className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="addressLine2"
									label="Address Line 2"
									name="addressLine2"
									value={settings.addressLine2}
									onChange={handleInputChange}
									startContent={
										<FaAddressBook className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="cityState"
									label="City or State"
									name="cityState"
									value={settings.cityState}
									onChange={handleInputChange}
									startContent={
										<FaAddressBook className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="postcodeZipCode"
									label="Postcode or ZipCode"
									name="postcodeZipCode"
									value={settings.postcodeZipCode}
									onChange={handleInputChange}
									startContent={
										<FaMapMarker className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="country"
									label="Country"
									name="country"
									value={settings.country}
									onChange={handleInputChange}
									startContent={
										<FaGlobe className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
								<Input
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									value={settings.phoneNumber}
									onChange={handleInputChange}
									startContent={
										<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
									}
									variant="bordered"
									className="mb-4"
								/>
							</div>
						</div>

						<h3>Registration Forms</h3>
						<Divider className="mb-4" />

						<Switch
							name="loginEnabled"
							isSelected={settings.loginEnabled}
							onValueChange={handleSwitchChange('loginEnabled')}
						>
							Login Enabled?
						</Switch>

						<QuillEditor
							theme="snow"
							placeholder="Login Disabled Message..."
							value={settings.loginDisabledMessage}
							onChange={content => handleQuillChange('loginDisabledMessage', content)}
							modules={quillModules} // Define your Quill modules here
							formats={quillFormats} // Define your Quill formats here
							className="w-full h-[100%] mt-2 bg-white"
						/>

						<Switch
							name="createAccountEnabled"
							isSelected={settings.createAccountEnabled}
							onValueChange={handleSwitchChange('createAccountEnabled')}
						>
							Create Account Enabled?
						</Switch>

						<QuillEditor
							theme="snow"
							placeholder=" Create Account Disabled Message..."
							value={settings.createAccountDisabledMessage}
							onChange={content => handleQuillChange('createAccountDisabledMessage', content)}
							modules={quillModules} // Define your Quill modules here
							formats={quillFormats} // Define your Quill formats here
							className="w-full h-[100%] mt-2 bg-white"
						/>

						<Switch
							name="registrationEnabled"
							isSelected={settings.registrationEnabled}
							onValueChange={handleSwitchChange('registrationEnabled')}
						>
							Registration Enabled?
						</Switch>

						<QuillEditor
							theme="snow"
							placeholder="Registation Disabled Message..."
							value={settings.registrationDisabledMessage}
							onChange={content => handleQuillChange('registrationDisabledMessage', content)}
							modules={quillModules} // Define your Quill modules here
							formats={quillFormats} // Define your Quill formats here
							className="w-full h-[100%] mt-2 bg-white"
						/>

						<Switch
							name="forgotPasswordEnabled"
							isSelected={settings.forgotPasswordEnabled}
							onValueChange={handleSwitchChange('forgotPasswordEnabled')}
						>
							Forgot Password Enabled?
						</Switch>

						<QuillEditor
							theme="snow"
							placeholder="Forgot Password Disabled Message..."
							value={settings.forgotPasswordDisabledMessage}
							onChange={content => handleQuillChange('forgotPasswordDisabledMessage', content)}
							modules={quillModules} // Define your Quill modules here
							formats={quillFormats} // Define your Quill formats here
							className="w-full h-[100%] mt-2 bg-white"
						/>

						<div className="justify-end">
							<SubmitButton />
							{/* <button>Sign up</button> */}
						</div>
					</>
				)}
			</form>
		</>
	);
};

export default SystemSettingsForm;
