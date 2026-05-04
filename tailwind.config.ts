import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'var(--font-barlow-condensed)', 'Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'var(--font-poppins)', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        cinematic: ['Barlow Condensed', 'var(--font-barlow-condensed)', 'system-ui', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
      },
      opacity: {
        '8': '0.08',
        '12': '0.12',
        '18': '0.18',
        '22': '0.22',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.9s ease-out',
        'slide-up': 'slideUp 0.9s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
