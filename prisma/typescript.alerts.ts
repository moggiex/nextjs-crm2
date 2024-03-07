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
	createdAt: Date;
	updatedAt: Date;
	dismissedBy: UserAlert[]; // Assuming you'll also define a TypeScript type for UserAlert
}
