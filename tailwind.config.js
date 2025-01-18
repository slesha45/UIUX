/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6699CE',
        event_1: '#B8719B',
        event_2: '#7E493B',
        event_3: '#4D527F',
        event_4: '#549D94',
        event_5: '#D1A00A',
        event_6: '#365110',
        event_7: '#D14D37',
      },
      fontFamily: {
        jacques: ['"Jacques Francois"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};