/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070d19',
          900: '#0b132b',
          850: '#111c38',
          800: '#1c2a4e',
          700: '#273863',
          600: '#3a5080',
        },
        card: {
          bg: '#0f1a30',
          border: '#1d2d4f',
          hover: '#162444'
        },
        brand: {
          blue: '#1e68d7',
          cyan: '#00d2ff',
          green: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
          purple: '#8b5cf6'
        }
      }
    },
  },
  plugins: [],
}
