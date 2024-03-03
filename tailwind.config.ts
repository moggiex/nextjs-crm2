import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			// backgroundImage: {
			// 	'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			// 	'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			// },
		},
	},
	arkMode: 'class',
	plugins: [
		nextui(),
		function ({ addComponents }) {
			const buttons = {
				'.btn-primary': {
					backgroundColor: '#3490dc', // Example primary color
					'&:hover': {
						backgroundColor: '#2779bd', // Darken on hover
					},
					color: '#fff',
					fontWeight: 'bold',
					padding: '0.5rem 1rem',
					borderWidth: '1px',
					borderColor: '#2779bd',
					borderRadius: '.25rem',
				},
				'.btn-danger': {
					backgroundColor: '#e3342f', // Example danger color
					'&:hover': {
						backgroundColor: '#cc1f1a', // Darken on hover
					},
					color: '#fff',
					fontWeight: 'bold',
					padding: '0.5rem 1rem',
					borderWidth: '1px',
					borderColor: '#cc1f1a',
					borderRadius: '.25rem',
				},
				'.btn-success': {
					backgroundColor: '#38c172', // Example success color
					'&:hover': {
						backgroundColor: '#2d995b', // Darken on hover
					},
					color: '#fff',
					fontWeight: 'bold',
					padding: '0.5rem 1rem',
					borderWidth: '1px',
					borderColor: '#2d995b',
					borderRadius: '.25rem',
				},
				// Add more button styles as needed...
			};

			addComponents(buttons);
		},
	],
};
export default config;
