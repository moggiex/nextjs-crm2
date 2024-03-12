export enum UserRole {
    Admin = 'Admin',
    Support = 'Support',
    Customer = 'Customer',
}

export enum UserStatus {
	Pending = 'Pending',
	Active = 'Active',
	Inactive = 'Inactive',
	Banned = 'Banned',
}

export interface User {
	id: string;
	email: string;
	username?: string | null;
	firstName: string;
	lastName?: string | null;
	emailVerified?: Date | null;
	phone?: string | null;
	password: string;
	forgotPasswordToken?: string | null;
	avatar?: string | null;
	role: UserRole;
	status: UserStatus;
	isAdmin: boolean;
	isSupport: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	lastLogin: Date;
	lastSeen?: Date | null;
	// address?: Address | null; // Update to singular, as it's a one-to-one relationship
	// messages: Message[];
	// accounts: Account[];
	// sessions: Session[];
	// createdTickets: Ticket[];
	// assignedTickets: Ticket[];
}
