console.log('Tailwind config loaded!');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './apps/**/*.{js,ts,jsx,tsx,html}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
