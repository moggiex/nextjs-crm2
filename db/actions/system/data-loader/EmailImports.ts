'use server';

import { revalidatePath } from 'next/cache';

// Example data to be imported
const emailTemplates = [
	{
		id: 1,
		templateName: 'Email Header',
		internalName: 'email_header',
		enabled: true,
		emailSubject: 'EMAIL HEADER',
		htmlBody: '<p>header here</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 2,
		templateName: 'Email Footer',
		internalName: 'email_footer',
		enabled: true,
		emailSubject: 'EMAIL FOOTER',
		htmlBody: '<p>footer here</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 3,
		templateName: '[ADMIN] User Registered',
		internalName: 'admin_user_registered',
		enabled: true,
		emailSubject: '[ADMIN] A User has registered',
		htmlBody: '<p>A user has registered</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 4,
		templateName: 'User Registered',
		internalName: 'user_registered',
		enabled: true,
		emailSubject: 'Welcome aboard',
		htmlBody: '<p>Thank you for registering</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 5,
		templateName: '[ADMIN] Forgot Password',
		internalName: 'user_forgot_password',
		enabled: true,
		emailSubject: '[ADMIN] User forgot password',
		htmlBody: '<p>A user has forgotten their password</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 6,
		templateName: 'Forgot Password',
		internalName: 'forgot_password',
		enabled: true,
		emailSubject: 'Forgot Password Link',
		htmlBody: '<p>Here is the link to reset your password</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 7,
		templateName: '[ADMIN] Account Added',
		internalName: 'admin_account_added',
		enabled: true,
		emailSubject: 'User Added Marketplace Account',
		htmlBody: '<p>A user added an account to thier account</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 8,
		templateName: 'Account Added',
		internalName: 'account_added',
		enabled: true,
		emailSubject: 'Account Added',
		htmlBody: '<p>You have added an account to your system</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 9,
		templateName: '[ADMIN] Support Ticket Created',
		internalName: 'admin_support_ticket_created',
		enabled: true,
		emailSubject: 'Support Ticket Created',
		htmlBody: '<p>A support ticket was created for user</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 10,
		templateName: 'Support Ticket Created',
		internalName: 'support_ticket_created',
		enabled: true,
		emailSubject: 'Support Ticket Created',
		htmlBody: '<p>A support ticket was created</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 11,
		templateName: '[ADMIN] Support Ticket Reply',
		internalName: 'admin_support_ticket_Reply',
		enabled: true,
		emailSubject: 'Support Ticket Reply Received',
		htmlBody: '<p>A support ticket was replied to</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 12,
		templateName: 'Support Ticket Reply',
		internalName: 'support_ticket_Reply',
		enabled: true,
		emailSubject: 'Support Ticket Reply Received',
		htmlBody: '<p>dear customer, a support ticket was replied to</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	{
		id: 13,
		templateName: '[ADMIN] Support Ticket Status Change',
		internalName: 'admin_support_ticket_status_change',
		enabled: true,
		emailSubject: 'Support Ticket Status Change',
		htmlBody: '<p>A support ticket status was changed</p>',
		htmlEnabled: true,
		type: 'admin',
	},
	{
		id: 14,
		templateName: 'Support Ticket Status Change',
		internalName: 'support_ticket_status_change',
		enabled: true,
		emailSubject: 'Support Ticket Status Change',
		htmlBody: '<p>A support ticket status was changed</p>',
		htmlEnabled: true,
		type: 'customer',
	},
	// Add more templates as needed
];

// Function to import the data
export const importEmailTemplates = async () => {
	try {
		await db.systemEmailTemplate.deleteMany({});
		console.log(`Deleted all email templates`);

		for (const template of emailTemplates) {
			try {
				const createdTemplate = await db.systemEmailTemplate.create({
					data: template,
				});
				console.log(`Created template: ${createdTemplate.internalName}`);
			} catch (error) {
				console.error(`Error creating template ${template.internalName}:`, error);
				revalidatePath('/admin/system/emails');
				return { success: false, message: error?.message };
			}
		}
	} catch (error) {
		console.error(`Error deleting all email templates:`, error);
		revalidatePath('/admin/system/emails');
		return { success: false, message: error?.message };
	}

	revalidatePath('/admin/system/emails');
	return { success: true, message: 'Email templates imported successfully' };
};
