/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Green: "#1DB954",
        Black: "#191414",
        White: "#FFFFFF",
        Gray: "#535353",
        LightGray: "#B3B3B3",
        GoogleRed: "#DB4437",
        GoogleBlue: "#4285F4",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"], // Enable dark mode variant for background color utilities
      textColor: ["dark"], // Enable dark mode variant for text color utilities
    },
  },
  plugins: [
    require("tailwindcss-dark-mode")(), // Plugin for dark mode support
  ],
};
