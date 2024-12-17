/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
   
    extend: {
      fontFamily:{
        title: ['Inter', 'sans-serif'],
      },
      colors: {
        black:'#000000',
        l_black:'#101828',
        d_gray:'#475467',
        gray:'#344054'
      },
    },
  },
  plugins: [],
}

