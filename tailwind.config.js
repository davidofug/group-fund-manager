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
				myblue: "#1472C9",
				mygray: "#464646",
			},
			animation: {
				"bounce-short": "bounce 1s ease-in 1",
			},
		},
	},
	plugins: [],
};
