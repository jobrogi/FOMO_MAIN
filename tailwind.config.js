/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        500: "500px",
      },
      colors: {
        Green: "#1DB954",
        Black: "#191414",
        White: "#FFFFFF",
        Gray: "#535353",
        LightGray: "#B3B3B3",
        GoogleRed: "#DB4437",
        GoogleBlue: "#4285F4",
        DarkGray: "#202327",
      },
      spacing: {
        120: "500px",
        230: "230px",
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
