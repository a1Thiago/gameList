/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'pulse-Xslow': 'pulse 5s linear infinite',
        'pulse-slow': 'pulse 3s linear infinite',
        'bounce-slow': 'bounce 7s ease-out infinite',
      },
    }
    ,
    fontSize: {
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '24': '24px',
      '32': '32px',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      grey: '#CCCCCC',
      transparent: 'transparent',
      amber: {
        400: '#fbbf24'
      },
      sky: {
        500: '#0ea5e9'
      },
      yellow: {
        500: '#FFFF00'
      },
      red: {
        500: '#ff0000',
      },
      green: {
        500: '#00ff00',
      },
      theme: {
        primary: {
          DEFAULT: '#9CC9FF',
          dark: '#7CA0CC',
        },
        secondary: {
          DEFAULT: '#4F9EFF',
          dark: '#284F80',
        },

        dark: '#1A1918',
      },
    },
    screens: {
      'mobile': { 'max': '414px' },
      'tablet': { 'min': '415px', 'max': '768px' },
      'smdesktop': { 'min': '769px', 'max': '1024px' },
      'desktop': { 'min': '1025px' },
    },
  },
  plugins: [],
}
