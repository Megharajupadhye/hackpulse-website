import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'dark-gray': '#1a1a1a',
        red: '#ff0000',
        'light-gray': '#cccccc',
        'red-glow': 'rgba(255, 0, 0, 0.4)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(255, 0, 0, 0.3)',
        'red-glow-lg': '0 0 40px rgba(255, 0, 0, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 0, 0, 0.5)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
