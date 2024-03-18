import { getSystemEmailById, getSystemEmailByInternalName } from '@/db/actions/system/emails/helper';
import { getSystemSettings } from '@/db/actions/system/helper';
import { SystemSetting } from '@/prisma/typescript.systemSetting';
import { SystemEmailTemplate } from '@/prisma/typescript.systememailtemplate';
import { User } from '@/prisma/typescript.user';
import { replaceKeywordsInEmailBody, systemEmailKeywordParser } from './keywordParsing';
const nodemailer = require('nodemailer');
/**
 * Things to do for email sending
 * DONE: Parse keywords
 * load email template by name or id
 * get the system settings for the email host
 * send the email
 */

export const sendEmail = async (user: User, internalEmailName: any, forgotPasswordId: string | null) => {
	// get system details
	const systemSetttings: SystemSetting = await getSystemSettings();

	if (!systemSetttings.emailEnabled) {
		return { success: false, message: 'Sending Emails disabled in systems settings' };
	}

	if (!user) {
		return { success: false, message: 'Invalid user' };
	}

	if (!internalEmailName) {
		return { success: false, message: 'Invalid email type' };
	}

	const email: SystemEmailTemplate | null = await getSystemEmailByInternalName(internalEmailName);

	if (!email) {
		return { success: false, message: `Email template not found: ${internalEmailName}` };
	}

	// get keywords
	const parsedKeywords = await systemEmailKeywordParser(user, systemSetttings, forgotPasswordId);

	if (!parsedKeywords || !parsedKeywords.success) {
		return { success: false, message: parsedKeywords.message };
	}

	email.htmlBody = replaceKeywordsInEmailBody(parsedKeywords.data, email.htmlBody);

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_SERVER_HOST ? process.env.EMAIL_SERVER_HOST : systemSetttings.emailServerHost,
		port: process.env.EMAIL_SERVER_PORT ? process.env.EMAIL_SERVER_PORT : systemSetttings.emailServerPort,
		secure: process.env.EMAIL_SERVER_SECURE ? process.env.EMAIL_SERVER_SECURE : systemSetttings.emailServerSecure, // Use `true` for port 465, `false` for all other ports
		auth: {
			user: process.env.EMAIL_SERVER_USER ? process.env.EMAIL_SERVER_USER : systemSetttings.emailServerUser,
			pass: process.env.EMAIL_SERVER_PASSWORD
				? process.env.EMAIL_SERVER_PASSWORD
				: systemSetttings.emailServerPassword,
		},
	});

	// now send the email
};
