import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
interface Props {
	children: React.ReactNode;
}

const isProduction = process.env.VERCEL_ENV === 'production';
const clientId = isProduction
	? process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID
	: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID;

const PayPalScriptProviderWrapper = (props: Props) => {
	const { children } = props;
	return (
		<PayPalScriptProvider
			options={{
				clientId: clientId,
				components: 'buttons',
				intent: 'subscription',
				vault: true,
			}}
		>
			{children}
		</PayPalScriptProvider>
	);
};

export default PayPalScriptProviderWrapper;
