/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: '#343437',
        lightdark: '#29282B'
      },
      borderColor: {
        dark: '#343437',
        lightdark: '#29282B'
      },
      color: {
        dark: '#343437',
        lightdark: '#29282B'
      }
    },
  },
  plugins: [],
}
