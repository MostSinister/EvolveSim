/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JavaScript and TypeScript files in the src directory
    './public/index.html', // Include your HTML file if you have any custom classes
  ],
  theme: {
    extend: {
      // Extend the default theme here
      colors: {
        // Add custom colors if needed
      },
    },
  },
  variants: {
    extend: {
      // Extend variants if needed
    },
  },
  plugins: [
    // Add plugins if needed
  ],
}
