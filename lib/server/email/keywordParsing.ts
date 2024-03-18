/**
 * Keyword parser for email keywords
 */

import { getSystemSettings } from '@/db/actions/system/helper';
import { SystemSetting } from '@/prisma/typescript.systemSetting';
import { User } from '@/prisma/typescript.user';

export type KeywordGroups = {
	userKeywords: Record<string, string | Date | boolean | number>;
	linkKeywords: Record<string, string | Date | boolean | number>;
	siteKeywords: Record<string, string | Date | boolean | number>;
};

/**
 * Keywords for variables like %%fullName%%
 */
export const keywords: KeywordGroups = {
	userKeywords: {
		'%%fullName%%': '',
		'%%firstName%%': '',
		'%%lastName%%': '',
		'%%username%%': '',
		'%%userEmail%%': '',
		'%%userPhoneNumber%%': '',
	},
	linkKeywords: {
		'%%link%%': '',
		'%%siteLink%%': '',
		'%%dashboardLink%%': '',
		'%%loginLink%%': '',
		'%%forgotPasswordLink%%': '',
		'%%resetPasswordLink%%': '',
	},
	siteKeywords: {
		'%%siteName%%': '',
		'%%siteEmail%%': '',
		'%%siteAddress%%': '',
		'%%siteBusinessName%%': '',
		'%%siteAddressLine1%%': '',
		'%%siteAddressLine2%%': '',
		'%%siteCityState%%': '',
		'%%sitePostcodeZipCode%%': '',
		'%%siteCountry%%': '',
		'%%sitePhoneNumber%%': '',
	},
};
/**
 *
 * @param data on going data var
 * @param user : User
 * @returns data var with user keywords populated
 */
const updateUserKeywords = (data: KeywordGroups, user: User) => {
	const safeAccess = (key: keyof User) => user[key] ?? '';

	const firstName = safeAccess('firstName');
	const lastName = safeAccess('lastName');

	data.userKeywords['%%fullName%%'] = `${firstName} $lastName}`;
	data.userKeywords['%%firstName%%'] = firstName;
	data.userKeywords['%%lastName%%'] = lastName;
	data.userKeywords['%%username%%'] = safeAccess('username');
	data.userKeywords['%%userEmail%%'] = safeAccess('email');
	data.userKeywords['%%userPhone%%'] = safeAccess('phone');

	return data;
};
/**
 *
 * @param data on going data var
 * @param systemSettings : SystemSettings
 * @returns data cvar with site keywords completed
 */
const updateSiteKeywords = (data: KeywordGroups, systemSettings: SystemSetting) => {
	// Helper function to safely access system settings and fallback to an empty string if undefined or null
	// const safeAccess = key => (systemSettings[key] ? systemSettings[key] : '');
	const safeSiteAccess = (key: keyof SystemSetting) => systemSettings[key] ?? '';

	// Update keywords with corresponding data points, removing 'site' prefix and ensuring non-empty values
	data.siteKeywords['%%siteName%%'] = safeSiteAccess('siteName');
	data.siteKeywords['%%siteEmailAddress%%'] = safeSiteAccess('siteEmailAddress');
	data.siteKeywords['%%siteBusinessName%%'] = safeSiteAccess('businessName');
	data.siteKeywords['%%siteURL%%'] = safeSiteAccess('siteURL');
	data.siteKeywords['%%sitePhoneNumber%%'] = safeSiteAccess('phoneNumber');

	// Concatenating address details, ensuring each value is set
	const addressLine1 = safeSiteAccess('addressLine1');
	const addressLine2 = safeSiteAccess('addressLine2');
	const cityState = safeSiteAccess('cityState');
	const postcodeZipCode = safeSiteAccess('postcodeZipCode');
	const country = safeSiteAccess('country');

	// Construct the full address, adding each part only if it's not empty, and joining with a comma
	const fullAddress = [addressLine1, addressLine2, cityState, postcodeZipCode, country]
		.filter(part => part !== '')
		.join(', ');

	data.siteKeywords['%%siteAddress%%'] = fullAddress;

	// Individual address components - in case they're needed individually
	data.siteKeywords['%%siteAddressLine1%%'] = addressLine1;
	data.siteKeywords['%%siteAddressLine2%%'] = addressLine2;
	data.siteKeywords['%%siteCityState%%'] = cityState;
	data.siteKeywords['%%sitePostcodeZipCode%%'] = postcodeZipCode;
	data.siteKeywords['%%siteCountry%%'] = country;

	return data;
};

/**
 *
 * @param data data var
 * @param user : User
 * @param systemSettings : SystemSettings
 * @param forgotPasswordKey : decodeed
 * @returns Updated links in data var
 */
const updateLinks = (
	data: KeywordGroups,
	user: User,
	systemSettings: SystemSetting,
	forgotPasswordKey: string | null,
) => {
	// Helper function to safely access system settings and fallback to an empty string if undefined or null
	// const safeSiteAccess = key => (systemSettings[key] ? systemSettings[key] : '');
	const safeSiteAccess = (key: keyof SystemSetting) => systemSettings[key] ?? '';

	const siteLink = process.env.NEXT_PUBLIC_HOST_URL ? process.env.NEXT_PUBLIC_HOST_URL : safeSiteAccess('siteURL');

	if (forgotPasswordKey && forgotPasswordKey.length > 1) {
		// Needs to be URL encoded
		forgotPasswordKey = encodeURIComponent(forgotPasswordKey);
	}

	data.linkKeywords['%%link%%'] = siteLink;
	data.linkKeywords['%%siteLink%%'] = siteLink;
	data.linkKeywords['%%dashboardLink%%'] = `${siteLink}/dashboard`;
	data.linkKeywords['%%loginLink%%'] = `${siteLink}/auth/login`;
	data.linkKeywords['%%forgotPasswordLink%%'] = `${siteLink}/auth/forgot-password`;
	data.linkKeywords['%%resetPasswordLink%%'] = forgotPasswordKey ? `${siteLink}/auth/${forgotPasswordKey}` : '';

	return data;
};

// Make sure to call `updateSiteKeywords(systemSettings)` somewhere in your code, passing in the actual systemSettings object.

/**
 *
 * @param user : User
 * @param systemSettings : SystemSetting
 * @param forgotPasswordKey : decoded key
 * @returns parsed keywords to new values
 */
export const systemEmailKeywordParser = async (
	user: User,
	systemSetttings: SystemSetting,
	forgotPasswordKey: string | null,
) => {
	if (!user) {
		return { success: false, message: 'No user provided' };
	}

	if (!systemSetttings) {
		return { success: false, message: 'No system settings set' };
	}

	if (systemSetttings?.emailEnabled !== true) {
		return { success: false, message: 'Emails sending disabled, see system settings' };
	}

	let data = keywords;

	// Parse customer
	data = updateUserKeywords(data, user);

	// Settings
	data = updateSiteKeywords(data, systemSetttings);

	// And links
	data = updateLinks(data, user, systemSetttings, forgotPasswordKey);

	return { success: true, data };
};
/**
 *
 * @param emailBody html template from system settings
 * @param data the data var with the options already made in
 * @returns sendable emailBody
 */
export const replaceKeywordsInEmailBody = (emailBody: string, data: KeywordGroups): string => {
	let updatedEmailBody = emailBody;

	// Function to replace keywords in the current text
	const replaceKeywords = (keywords: Record<string, string>) => {
		Object.entries(keywords).forEach(([keyword, value]) => {
			updatedEmailBody = updatedEmailBody.replace(new RegExp(keyword, 'g'), value);
		});
	};

	// Replace keywords for each group
	replaceKeywords(data.userKeywords);
	replaceKeywords(data.linkKeywords);
	replaceKeywords(data.siteKeywords);

	return updatedEmailBody;
};
