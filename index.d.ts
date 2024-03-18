declare interface ApiResponse {
	success: boolean;
	message?: string;
}

declare interface AuthPayload {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	// phone: string;
	role: string;
	isAdmin: boolean;
	isSupport: boolean;
	iat: number;
	exp: number;
}

declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
