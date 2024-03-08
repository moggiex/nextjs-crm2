import { User } from './typescript.user';

export enum AlertType {
	Primary = 'primary',
	Warning = 'warning',
	Danger = 'danger',
	Success = 'success',
	Info = 'info',
	Other = 'other',
}

export interface UserAlert {
	id: string;
	userId: string;
	alertId: string;
	user: User; // Reference to a User interface, which you should define based on your User model
	alert: Alert; // Direct reference to the Alert interface defined above
}

export interface Alert {
	id: string;
	type: AlertType;
	message: string;
	enabled: boolean;
	createdAt: Date | null;
	updatedAt: Date | null;
	dismissedBy: UserAlert[] | null; // Assuming you'll also define a TypeScript type for UserAlert
}
