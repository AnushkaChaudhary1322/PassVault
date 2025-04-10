/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7b2ff7',
        'primary-light': '#b18cff',
        'primary-dark': '#5a1cae',
        accent: '#f8d4ec',
        'soft-blue': '#bce3ff',
        'light-bg': '#f9f9fc',
        'light-gray': '#e5e5f7',
        'text-dark': '#2e2e2e',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #f8d4ec 0%, #d4d4f8 50%, #bce3ff 100%)',
      },
    },
  },
  plugins: [],
};
