/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      minHeight: {
        '12': '12px',
        '24': '24px',
        '25': '25px',
        '36': '36px',
        '48': '48px',
        '50': '50px',
        '75': '75px',
        '90': '90px',
        '100': '100px',
        '125': '125px',
        '150': '150px',
        '175': '175px',
        '200': '200px',
        '250': '250px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
      },
      minWidth: {
        '12': '12px',
        '24': '24px',
        '25': '25px',
        '36': '36px',
        '48': '48px',
        '50': '50px',
        '75': '75px',
        '90': '90px',
        '100': '100px',
        '125': '125px',
        '150': '150px',
        '175': '175px',
        '200': '200px',
        '250': '250px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
      },
      flex: {
        '2': '2 2 0%'
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
