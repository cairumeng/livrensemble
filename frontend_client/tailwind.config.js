module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#FC0',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
