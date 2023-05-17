/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3C8DBC',
          'accent-1': '#FF5A5F',
          'accent-2': '#FFA41C',
          'accent-3': '#FFD700',
          'accent-4': '#3FBBB2',
          text: '#333333',
          background: '#F8F8F8',
          border: '#CCCCCC',
        },
        dark: {
          primary: '#162D40',
          'accent-1': '#FF7E55',
          'accent-2': '#26B67A',
          'accent-3': '#E04880',
          'accent-4': '#8560A8',
          text: '#F5F5F5',
          background: '#222831',
          border: '#555555',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode variant for background color utilities
      textColor: ['dark'], // Enable dark mode variant for text color utilities
    },
  },
  plugins: [
    require('tailwindcss-dark-mode')(), // Plugin for dark mode support
  ],
}

