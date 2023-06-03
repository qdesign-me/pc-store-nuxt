/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    extend: {
      colors: {
        coral: '#ff8484',
        orange: '#FFBC57',
        milk: '#FFF8F1',
        sea: '#6FF4DC',
        blue: '#8CD1F8',
        lightred: '#FF8484',
        lightblue: '#00B3D7',
        lightgray: '#A1A1A1',
        lightbeige: '#00A35B',
        yellow: '#FDFF92',
      },
      boxShadow: {
        DEFAULT: '4px 4px 10px rgba(0, 0, 0, 0.1)',
      },
      borderColor: {
        DEFAULT: '#D9D9D9',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
    },
  },
  plugins: [],
};
