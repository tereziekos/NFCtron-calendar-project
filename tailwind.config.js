/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'f7e7ce': '#F7E7CE',
        'fffff5': '#FFFFF5', // Add this line
      },
      borderColor: {
        'brown-300': '#A87F5A',
      },
      textColor: {
        'brown-600': '#5B3C11',
      },
    },
  },
  variants: {},
  plugins: [],
}