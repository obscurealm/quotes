/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tingker-bell-green": "#b3e61c",
        "emperor-king-yusuf-purple": "#a348a5",
      },
    },
  },
  plugins: [],
};
