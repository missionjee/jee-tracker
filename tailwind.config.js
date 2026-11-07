/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jee: {
          physics: '#3b82f6',
          chemistry: '#10b981',
          maths: '#f59e0b',
          dark: '#0f172a',
          card: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}
