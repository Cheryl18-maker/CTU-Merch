/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ctu: {
          orange: '#f47721',
          orangeDark: '#ae4903',
          orangeLight: '#fff2e8',
          bg: '#f4f4f4',
          dark: '#252525',
          muted: '#6b6b6b',
          border: '#e5e5e5',
          green: '#38704d',
          greenLight: '#eef8f2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'kiosk': '0 25px 70px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
        'modal': '0px 24px 80px 0px rgba(0,0,0,0.18)'
      }
    },
  },
  plugins: [],
}
