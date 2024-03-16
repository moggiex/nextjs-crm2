export enum SystemEmailTemplateType {
	admin = 'admin',
	customer = 'customer',
}

// Define the TypeScript type for the SystemEmailTemplate model
export type SystemEmailTemplate = {
	id?: number;
	templateName: string;
	internalName: string;
	enabled: boolean;
	emailSubject: string;
	htmlBody: string;
	htmlEnabled: boolean;
	type: SystemEmailTemplateType;
	createdAt?: Date;
	updatedAt?: Date;
};
