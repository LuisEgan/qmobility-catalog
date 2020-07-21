module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./pages/**/*.js",
    "./components/**/*.tsx",
    "./src/**/*.scss",
    "./src/**/*.less",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          background: "#e2e8ed",
          dark: "#5a5a5a",
          light: "#d9d9d9",
        },
        purple: {
          main: "#c028b9",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
