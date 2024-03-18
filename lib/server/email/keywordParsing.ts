/**
 * Keyword parser for email keywords
 */

import { getSystemSettings } from '@/db/actions/system/helper';

// Variables organized by category
export const customerVariables = [
	'%%fullName%%',
	'%%firstName%%',
	'%%lastName%%',
	'%%username%%',
	'%%userEmail%%',
	'%%userPhoneNumber%%',
];
export const linkVariables = [
	'%%link%%',
	'%%siteLink%%',
	'%%dashboardLink%%',
	'%%loginLink%%',
	'%%forgotPasswordLink%%',
	'%%resetPasswordLink%%',
];
export const siteVariables = ['%%siteName%%', '%%siteEmail%%', '%%siteAddress%%', '%%sitePhoneNumber%%'];

export const keywords = {
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

const updateUserKeywords = (data, user) => {
	const safeAccess = key => (user[key] ? user[key] : '');

	const firstName = safeAccess('firstName');
	const lastName = safeAccess('lastName');

	data.userKeywords['%%fullName%%'] = `${firstName} $lastName}`;
	data.userKeywords['%%firstName%%'] = firstName;
	data.userKeywords['%%lastName%%'] = lastName;
	data.userKeywords['%%username%%'] = safeAccess('username');
	data.userKeywords['%%userEmail%%'] = safeAccess('email');
	data.userKeywords['%%userPhoneNumber%%'] = safeAccess('phoneNumber');

	return data.userKeywords;
};
// Assuming systemSettings is the object containing the settings data
const updateSiteKeywords = (data, systemSettings) => {
	// Helper function to safely access system settings and fallback to an empty string if undefined or null
	const safeAccess = key => (systemSettings[key] ? systemSettings[key] : '');

	// Update keywords with corresponding data points, removing 'site' prefix and ensuring non-empty values
	data.siteKeywords['%%siteName%%'] = safeAccess('siteName');
	data.siteKeywords['%%siteEmailAddress%%'] = safeAccess('siteEmailAddress');
	data.siteKeywords['%%siteBusinessName%%'] = safeAccess('businessName');
	data.siteKeywords['%%siteURL%%'] = safeAccess('siteURL');
	data.siteKeywords['%%sitePhoneNumber%%'] = safeAccess('phoneNumber');

	// Concatenating address details, ensuring each value is set
	const addressLine1 = safeAccess('addressLine1');
	const addressLine2 = safeAccess('addressLine2');
	const cityState = safeAccess('cityState');
	const postcodeZipCode = safeAccess('postcodeZipCode');
	const country = safeAccess('country');

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

	return data.siteKeywords;
};

// Assuming systemSettings is the object containing the settings data
const updateLinks = (data, user, systemSettings, forgotPasswordKey = null) => {
	// Helper function to safely access system settings and fallback to an empty string if undefined or null
	const safeSiteAccess = key => (systemSettings[key] ? systemSettings[key] : '');
	const safeUserAccess = key => (user[key] ? user[key] : '');

	const siteLink = process.env.NEXT_PUBLIC_HOST_URL ? process.env.NEXT_PUBLIC_HOST_URL : safeSiteAccess('siteURL');

	data.linkKeywords['%%link%%'] = siteLink;
	data.linkKeywords['%%siteLink%%'] = siteLink;
	data.linkKeywords['%%dashboardLink%%'] = `${siteLink}/dashboard`;
	data.linkKeywords['%%loginLink%%'] = `${siteLink}/auth/login`;
	data.linkKeywords['%%forgotPasswordLink%%'] = `${siteLink}/auth/forgot-password`;
	data.linkKeywords['%%resetPasswordLink%%'] = `${siteLink}/auth/${forgotPasswordKey}`;

	return data.linkKeywords;
};

// Make sure to call `updateSiteKeywords(systemSettings)` somewhere in your code, passing in the actual systemSettings object.

export const keywordParser = async ({ user, forgotPasswordKey = null }) => {
	if (!user) {
		return { success: false, message: 'No user provided' };
	}

	const systemSetttings = await getSystemSettings();

	if (!systemSetttings) {
		return { success: false, message: 'No system settings set' };
	}

	if (systemSetttings?.emailEnabled !== true) {
		return { success: false, message: 'Emails sending disabled, see system settings' };
	}

	const data = keywords;

	// Parse customer
	data.userKeywords = updateUserKeywords(data, user);

	// Settings
	data.siteKeywords = updateSiteKeywords(data, systemSetttings);

	// And links
	data.linkKeywords = updateLinks(data, user, systemSettings, forgotPasswordKey);
};
