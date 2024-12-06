const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class", "class"],
	theme: {
		extend: {
			colors: {
				primary: {
				  DEFAULT: '#2C3E50',  // Deep Navy Blue
				  foreground: '#ECF0F1', // Light text on Navy Blue
				},
				secondary: {
				  DEFAULT: '#F0A6A1', // Soft Coral
				  foreground: '#2C3E50', // Dark text on Coral
				},
				highlight: '#F9F9F9',
				background: '#FFFFFF',
				foreground: '#2C3E50',
				card: {
				  DEFAULT: '#FFFFFF',
				  foreground: '#4F5B62', // Slate Gray text
				},
				accent: {
				  DEFAULT: '#F0A6A1', // Soft Coral accent
				  foreground: '#2C3E50', // Dark text
				},
				border: '#D0D0D0', // Light border for contrast
			  },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({
	addBase,
	theme
}) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

	addBase({
		":root": newVars,
	});
}


