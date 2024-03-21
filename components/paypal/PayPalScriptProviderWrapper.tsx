import { PAYPAL_CLIENT_ID } from '@/lib/common/paypal';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
interface Props {
	children: React.ReactNode;
}

const PayPalScriptProviderWrapper = (props: Props) => {
	const { children } = props;
	return (
		<PayPalScriptProvider
			options={{
				clientId: PAYPAL_CLIENT_ID as string,
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
