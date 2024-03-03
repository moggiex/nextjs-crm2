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
	address?: Address | null; // Update to singular, as it's a one-to-one relationship
	messages: Message[];
	accounts: Account[];
	sessions: Session[];
	createdTickets: Ticket[];
	assignedTickets: Ticket[];
}

export enum AccountType {
	ebay = 'ebay',
	amazon = 'amazon',
	other = 'other',
}

export interface Account {
	id: string;
	userId: string;
	type: AccountType;
	account_name: string;
	provider?: string | null;
	providerAccountId?: string | null;
	refresh_token?: string | null;
	access_token?: string | null;
	expires_at?: number | null;
	user: User;
	messages: Message[];
}

export interface Session {
	id: string;
	sessionToken: string;
	userId: string;
	expires: Date;
	user: User;
}

export interface VerificationToken {
	identifier: string;
	token: string;
	expires: Date;
}

export interface Address {
	id: string;
	userId: string;
	businessName?: string | null;
	addressLine1: string;
	addressLine2?: string | null;
	city: string;
	countyOrState: string;
	postZipCode: string;
	countryId: number;
	user: User;
	country: Country;
}

export interface Country {
	id: number;
	iso: string;
	name: string;
	nicename: string;
	iso3?: string | null;
	numcode?: number | null;
	phonecode: number;
	addresses: Address[];
}

export interface Message {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	accountId: string;
	parentId?: string | null;
	sender: string;
	subject: string;
	body: string;
	receiveDate: Date;
	read: boolean;
	replied: boolean;
	user: User;
	account: Account;
	parent?: Message | null;
	replies: Message[];
}

export enum TicketStatus {
	Open = 'Open',
	Closed = 'Closed',
	Pending = 'Pending',
}

export enum TicketType {
	Issue = 'Issue',
	FeatureRequest = 'FeatureRequest',
	Query = 'Query',
}

export interface Ticket {
	id: string;
	subject: string;
	message: string;
	type: TicketType;
	status: TicketStatus;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	assignedTo?: string | null;
	user: User;
	supportUser?: User | null;
}
