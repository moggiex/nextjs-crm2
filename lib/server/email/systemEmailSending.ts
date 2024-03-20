import { getSystemEmailById, getSystemEmailByInternalName } from '@/db/actions/system/emails/helper';
import { getSystemSettings } from '@/db/actions/system/helper';
import { SystemSetting } from '@/prisma/typescript.systemSetting';
import { SystemEmailTemplate } from '@/prisma/typescript.systememailtemplate';
import { User } from '@/prisma/typescript.user';
import { KeywordGroups, replaceKeywordsInEmailBody, systemEmailKeywordParser } from './keywordParsing';
const nodemailer = require('nodemailer');
/**
 * Things to do for email sending
 * DONE: Parse keywords
 * load email template by name or id
 * get the system settings for the email host
 * send the email
 */

export const sendEmail = async (
	user: User,
	internalEmailName: any,
	forgotPasswordId: string | null,
): Promise<ApiResponse> => {
	// get system details
	const systemSetttings: SystemSetting = await getSystemSettings();

	if (!systemSetttings || !systemSetttings.emailEnabled) {
		return { success: false, message: 'Sending Emails disabled in systems settings' };
	}

	if (!user) {
		return { success: false, message: 'Invalid user' };
	}

	if (!internalEmailName) {
		return { success: false, message: 'Invalid email type' };
	}

	const emailTemplate: SystemEmailTemplate | null = await getSystemEmailByInternalName(internalEmailName);

	if (!emailTemplate) {
		return { success: false, message: `Email template not found: ${internalEmailName}` };
	}

	// get keywords
	const parsedKeywords: {
		success: boolean;
		message?: string;
		data?: KeywordGroups;
	} = await systemEmailKeywordParser(user, systemSetttings, forgotPasswordId);

	if (!parsedKeywords || !parsedKeywords.success) {
		return { success: false, message: parsedKeywords.message };
	}

	emailTemplate.htmlBody = replaceKeywordsInEmailBody(parsedKeywords.data, emailTemplate.htmlBody);

	const {
		EMAIL_SERVER_HOST,
		EMAIL_SERVER_PORT,
		EMAIL_SERVER_SECURE,
		EMAIL_SERVER_USER,
		EMAIL_SERVER_PASSWORD,
		EMAIL_FROM,
	} = process.env;

	const transporter = nodemailer.createTransport({
		host: EMAIL_SERVER_HOST ? EMAIL_SERVER_HOST : systemSetttings.emailServerHost,
		port: EMAIL_SERVER_PORT ? EMAIL_SERVER_PORT : systemSetttings.emailServerPort,
		secure: EMAIL_SERVER_SECURE ? EMAIL_SERVER_SECURE : systemSetttings.emailServerSecure, // Use `true` for port 465, `false` for all other ports
		auth: {
			user: EMAIL_SERVER_USER ? EMAIL_SERVER_USER : systemSetttings.emailServerUser,
			pass: EMAIL_SERVER_PASSWORD ? EMAIL_SERVER_PASSWORD : systemSetttings.emailServerPassword,
		},
	});

	const fromEmailAddress = EMAIL_FROM ? EMAIL_FROM : systemSetttings.emailFrom;

	// now send the email
	try {
		const info = await transporter.sendMail({
			from: `"${emailTemplate.emailSubject}" <${fromEmailAddress}>`, // sender address
			to: `${user.email}`, // list of receivers
			subject: `${emailTemplate.emailSubject}`, // Subject line
			// text: 'Hello world?', // plain text body
			html: `${emailTemplate.htmlBody}`,
			dsn: {
				id: `${user.id}-${emailTemplate.internalName}-${Date.now().toLocaleString()}`,
				return: 'headers',
				notify: ['failure', 'delay'],
				recipient: `${fromEmailAddress}`,
			},
		});
		// TODO: see here for better handling
		// https://nodemailer.com/usage/
		// TODO: I think we these need to be logged, especially for errors as we may have an issue with emails being sent and not even know!
		console.log('Message sent: %s', info.messageId);
		return { success: true, message: `Message sent sucessfully ${info.messageId}` };
	} catch (error) {
		console.error(error);
		return { success: false, message: error?.message };
	}
};
