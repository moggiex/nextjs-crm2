import { User } from './typescript.user';

export type PayPalSubscription = {
	id?: string;
	orderID: string;
	subscriptionID: string;
	facilitatorAccessToken: string;
	paymentSource: string;
	userId: string;
	// Assuming you have a 'User' type defined elsewhere that matches your 'User' model
	user: User;
};
