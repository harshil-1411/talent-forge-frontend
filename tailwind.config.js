/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-green": "#1dbf73",
        "brand-dark": "#013914",
      },
    },
  },
  plugins: [],
};
