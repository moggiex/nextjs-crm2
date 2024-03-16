'use client';
import InlineError from '@/components/InlineError';
import { importCountries } from '@/db/actions/system/data-loader/CountriesImport';
import { importEmailTemplates } from '@/db/actions/system/data-loader/EmailImports';
import { Button, Divider } from '@nextui-org/react';
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';

const DataLoadingPage = () => {
	const [importEmailsMessage, setImportEmailsMessage] = useState('');
	const [importCountriesMessage, setimportCountriesMessage] = useState('');
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

	return (
		<>
			<h1>Data Loader</h1>
			<Divider className="mb-4" />

			<p> Use these tools to pre load data to the system</p>

			<h3>Email Templates</h3>

			<Button onClick={() => runEmailTemplates()}>
				{pending ? 'Loading... Email Templates' : 'Load Email Templates'}
			</Button>
			{importEmailsMessage && <InlineError errorMessage={importEmailsMessage} />}

			<h3>Countries</h3>

			<Button onClick={() => runCountryImport()} color="primary" className="mr-2">
				{pending ? 'Loading... Countries' : 'Load Countries'}
			</Button>
			<Button onClick={() => runCountryImport(true)} color="danger" className="mr-2">
				{pending ? 'Loading... Countries' : 'Force Load Countries'}
			</Button>

			{importCountriesMessage && <InlineError errorMessage={importCountriesMessage} />}
		</>
	);
};

export default DataLoadingPage;
