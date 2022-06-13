module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xs: "320px",
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		fontFamily: {
			sans: ["Didact Gothic", "Helvetica", "Arial", "sans-serif"],
		},
		extend: {
			colors: {
				blue: "#1472C9",
				gray: "#464646",
			},
		},
	},
	plugins: [],
};
