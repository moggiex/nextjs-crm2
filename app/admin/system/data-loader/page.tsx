'use client';
import InlineMessage from '@/components/InlineMessage';
import { importCountries } from '@/db/actions/system/data-loader/CountriesImport';
import { importEmailTemplates } from '@/db/actions/system/data-loader/EmailImports';
import { exportRecord, imporSystemSettings } from '@/db/actions/system/data-loader/SystemSettings';
import { Button, Divider } from '@nextui-org/react';
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';

const DataLoadingPage = () => {
	const [importEmailsMessage, setImportEmailsMessage] = useState('');
	const [importCountriesMessage, setimportCountriesMessage] = useState('');
	const [exportTableMessage, setExportTableMessage] = useState('');
	const [importSystemSettingsMessage, setImportSystemSettingsMessage] = useState('');
	const { pending } = useFormStatus();

	const runEmailTemplates = async () => {
		// 'use server';
		console.log('Running email templates');
		const resp = await importEmailTemplates();
		if (!resp) {
			setImportEmailsMessage(resp.message);
		} else {
			setImportEmailsMessage('Email Templates Loaded');
		}
	};
	const runCountryImport = async (force = false) => {
		// 'use server';
		console.log('Running country imports');
		const resp = await importCountries(force);
		if (!resp || resp.success === false) {
			setimportCountriesMessage(resp.message);
		} else {
			setimportCountriesMessage('Countires Loaded');
		}
	};
	const runExportTable = async () => {
		// 'use server';
		console.log('Running export table ');
		const resp = await exportRecord();
		if (!resp || resp.success === false) {
			setExportTableMessage(resp.message);
		} else {
			setExportTableMessage('Export Table Loaded');
		}
	};
	const runSystemSettingsImport = async () => {
		// 'use server';
		console.log('Running import system settings ');
		const resp = await imporSystemSettings();
		if (!resp || resp.success === false) {
			setImportSystemSettingsMessage(resp.message);
		} else {
			setImportSystemSettingsMessage('System Settings Loaded');
		}
	};

	return (
		<>
			<h1>Data Loader</h1>
			<Divider className="mb-4" />

			<p> Use these tools to pre load data to the system</p>

			<h3>System Settings</h3>

			<Button onClick={() => runSystemSettingsImport()}>
				{pending ? 'Loading... System Settings' : 'Load System Settings'}
			</Button>
			{importSystemSettingsMessage && <InlineMessage message={importSystemSettingsMessage} />}

			<h3>Email Templates</h3>

			<Button onClick={() => runEmailTemplates()}>
				{pending ? 'Loading... Email Templates' : 'Load Email Templates'}
			</Button>
			{importEmailsMessage && <InlineMessage message={importEmailsMessage} />}

			<h3>Countries</h3>

			<Button onClick={() => runCountryImport()} color="primary" className="mr-2">
				{pending ? 'Loading... Countries' : 'Load Countries'}
			</Button>
			<Button onClick={() => runCountryImport(true)} color="danger" className="mr-2">
				{pending ? 'Loading... Countries' : 'Force Load Countries'}
			</Button>

			{importCountriesMessage && <InlineMessage message={importCountriesMessage} />}

			<h3>Export Table</h3>

			<Button onClick={() => runExportTable()}>{pending ? 'Running... Export Table' : 'Export Table'}</Button>
			{exportTableMessage && <InlineMessage message={exportTableMessage} />}
		</>
	);
};

export default DataLoadingPage;
