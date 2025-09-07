/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'cairo': ['Cairo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
        '13xl': '16rem',
        '14xl': '18rem',
        '15xl': '20rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1)' },
          '50%': { boxShadow: '0 0 50px rgba(255,255,255,0.4), 0 0 100px rgba(255,255,255,0.2)' },
        },
      },
    },
  },
  plugins: [],
}


