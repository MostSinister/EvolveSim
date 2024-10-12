/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scans all your source files for Tailwind classes
    './public/index.html',         // Scans your HTML file(s) for Tailwind classes
  ],
  darkMode: 'class', // Enables dark mode using a CSS class
  theme: {
    extend: {
      // Add custom theme extensions here
      colors: {
        primary: '#3B82F6', // Customize primary color
        secondary: '#64748B', // Customize secondary color
      },
    },
  },
  plugins: [
    // Add any additional plugins like typography, forms, etc.
  ],
}
