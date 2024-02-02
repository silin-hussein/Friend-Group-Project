/** @type {import('tailwindcss').default} */
module.exports = {
  content: ['./public/*.html'],
  theme: {
    extend: {
      colors: {
        original: {
          primary: '#127C87',
          secondary: '#65B8BE',
          text: '#0F0F0F',
          background: '#F7FCFA',
          accent: '#D1F3F3'
        },
        // Here you can add as many custom color palletes as you want
      },
    },
  },
  plugins: [],
}