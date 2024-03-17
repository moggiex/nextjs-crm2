'use server';

import { revalidatePath } from 'next/cache';

const settings = {
	id: 1,
	siteName: 'Your Amazing Website',
	siteURL: 'http://localhost:3000',
	siteEmailAddress: 'email@email.com',
	loginEnabled: true,
	loginDisabledMessage: "<p>We're sorry, logging in is currently disabled.</p><p>Check back shortly.</p>",
	createAccountEnabled: true,
	createAccountDisabledMessage:
		'<p><span style="color: oklch(0.314576 0.070431 281.57);">We\'re sorry, the ability to create an account is currently disabled.</span></p><p><span style="color: oklch(0.314576 0.070431 281.57);">Check back shortly.</span></p>',
	registrationEnabled: true,
	registrationDisabledMessage:
		"<p>We're sorry, the ability to create an account is currently disabled.</p><p>Check back shortly.</p>",
	forgotPasswordEnabled: true,
	forgotPasswordDisabledMessage:
		"<p>We're sorry, the ability to create a forgot password is currently disabled.</p><p>Check back shortly.</p>",
	emailEnabled: true,
	emailFrom: 'email@email.com',
	emailServerUser: 'user',
	emailServerPassword: 'password',
	emailServerHost: 'some.host.smtp',
	emailServerPort: 587,
	emailServerSecure: true,
	businessName: '',
	addressLine1: '',
	addressLine2: '',
	cityState: '',
	postcodeZipCode: '',
	country: '',
	phoneNumber: '',
};

// Function to import the data
export const imporSystemSettings = async () => {
	try {
		await db?.systemSetting.deleteMany({});
		console.log(`Deleted all email templates`);

		const resp = await db.systemSetting.create({
			data: settings,
		});
	} catch (error) {
		console.error(`Error deleting or updating system settings`, error);
		revalidatePath('/admin/system');
		return { success: false, message: error?.message };
	}

	revalidatePath('/admin/system');
	return { success: true, message: 'System settings imported successfully' };
};

export const exportTableRecords = async () => {
	try {
		const record = await db.user.findFirst({});

		if (record) {
			console.log(
				JSON.stringify(
					{
						record,
					},
					null,
					2,
				),
			); // Pretty print the record
		} else {
			console.log('Record not found.');
		}
	} catch (error) {
		console.error('Error fetching the record:', error);
	}
};
