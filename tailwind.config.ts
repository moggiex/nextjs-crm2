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
		extend: {},
	},
	darkMode: 'class',
	plugins: [require('daisyui'), nextui()],
	daisyui: {
		themes: [
			{
				customTheme: {
					// Previously included colors
					primary: '#2C2C54',
					'primary-content': '#ECECEC',
					secondary: '#474787',
					'secondary-content': '#ECECEC',
					accent: '#AAABB8',
					'accent-content': '#2C2C54',
					neutral: '#AAABB8',
					'neutral-content': '#2C2C54',
					'base-100': '#ECECEC',
					'base-content': '#2C2C54',
					// info: '#3ABFF8',
					success: '#36D399', // Default daisyUI success color
					warning: '#FBBD23', // Default daisyUI warning color
					error: '#f31260', // Default daisyUI error color

					// Additional colors for NextUI-like button roles
					default: '#AAABB8', // Assuming cool gray as the default button color
					'default-content': '#2C2C54', // Dark text on the default color background for readability
					// Using the same success, warning, and error colors, but adding -content colors for readability
					'success-content': '#FFFFFF', // White text on success background
					'warning-content': '#FFFFFF', // White text on warning background
					'error-content': '#FFFFFF', // White text on error background
				},
			},
		],
		// themes: [
		// 	'light',
		// 	'dark',
		// 	'cupcake',
		// 	'bumblebee',
		// 	'emerald',
		// 	'corporate',
		// 	'synthwave',
		// 	'retro',
		// 	'cyberpunk',
		// 	'valentine',
		// 	'halloween',
		// 	'garden',
		// 	'forest',
		// 	'aqua',
		// 	'lofi',
		// 	'pastel',
		// 	'fantasy',
		// 	'wireframe',
		// 	'black',
		// 	'luxury',
		// 	'dracula',
		// 	'cmyk',
		// 	'autumn',
		// 	'business',
		// 	'acid',
		// 	'lemonade',
		// 	'night',
		// 	'coffee',
		// 	'winter',
		// 	'dim',
		// 	'nord',
		// 	'sunset',
		// ],
	},
};
export default config;
