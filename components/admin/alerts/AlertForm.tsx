import { createAlert, getAlertById, updateAlert } from '@/db/actions/alerts/AlertsHelpers';
import { Textarea, Switch } from '@nextui-org/react';
import { FaEnvelope } from 'react-icons/fa';
import AlertTypeSelect from '@/components/admin/alerts/AlertTypeSelect';
import SubmitButton from '@/components/admin/alerts/SubmitButton';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Alert } from '@/prisma/typescript.alerts';

const AlertForm = async ({ id = null }) => {
	let theAlert: Alert | null = null;

	if (id) {
		theAlert = await getAlertById(id);
	} else {
		theAlert = { message: '', type: 'primary', enabled: true };
	}

	const submitAlert = async (formData: FormData) => {
		'use server';
		const theAlert = {
			message: formData.get('message') as string,
			type: formData.get('alertType') as string,
			enabled: formData.get('enabled') as boolean | string,
		};

		theAlert.enabled = !theAlert.enabled ? false : true;

		// console.log(theAlert);
		// return;

		let resp = null;

		if (id) {
			theAlert.id = id;
			resp = await updateAlert(theAlert);
		} else {
			resp = await createAlert(theAlert);
		}

		if (!resp || !resp.success) {
			console.log('Error updating alert');
			console.log(resp.message);
			return;
		}
		revalidatePath('/admin/alerts');
		revalidatePath(`/admin/alerts/${id}`);
		redirect('/admin/alerts');
	};

	return (
		<>
			<h2 className="text-xl font-bold mb-2">Alert Details</h2>
			<p className="mb-4">
				Use the form below to edit this alert noting that this will not reset the users that have seen and
				closed this alert previously.
			</p>
			<Suspense fallback={<div>Loading...</div>}>
				<form action={submitAlert} className="flex gap-y-2 w-full">
					<div className="w-full">
						<Textarea
							id="message"
							label="Message"
							name="message"
							type="message"
							defaultValue={theAlert.message}
							placeholder="Message"
							variant="bordered"
							startContent={
								<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							className="mb-4"
						/>
						<AlertTypeSelect selectedType={theAlert.type} />
						<div className="mb-4">
							<Switch
								aria-label="Enabled"
								name="enabled"
								defaultSelected={theAlert.enabled ? theAlert.enabled : false}
								value={theAlert.enabled ? theAlert.enabled : false}
							>
								{' '}
								Enabled?
							</Switch>
						</div>
						<div className="justify-end">
							<SubmitButton />
						</div>
					</div>
				</form>
			</Suspense>
		</>
	);
};

export default AlertForm;
