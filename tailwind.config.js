/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        "fade": "fadeIn 2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
      },
      colors: {
        background: {
          dark: "#040C23",
          DEFAULT: "#fff"
        },
        purple: {
          extralight: "#F598FA",
          light: "#994EF8",
          dark: "#240F4F"
        },
        orange: {
          DEFAULT: "#F9B091"
        },
        primary: {
          light: '#1E57D4',
          DEFAULT: '#1E57D4',
        },
        secondary: {
          DEFAULT: '#8789A3',
        },
        disabled: {
          light: '#C7C7CC',
          DEFAULT: '#F9F9F9',
        },
        success: '#00B856',
        danger: {
          light: '#F8EBEB',
          DEFAULT: '#FF3A3A',
        },
        red: {
          light: "#FF6163",
          DEFAULT: '#FF3A3A',
        },
        warning: {
          DEFAULT: "#E02826"
        },
        white: '#fff',
        black: {
          DEFAULT: '#161A21',
          light: '#1C1C1E',
        },
        transparent: 'transparent',
        sunny: '#FFDC24',
        cloud: 'rgba(0, 64, 166, 0.05)',
        gray: {
          DEFAULT: '#F9F9F9',
          light: '#FAFAFA',
          dark: '#8E8E93',
          home: "#F4F6F8"
        },
      },
      fontSize: {
        40: '2.5rem',
        36: '2.25rem',
        34: '2.125rem',
        32: '2rem',
        24: '1.5rem',
        20: '1.25rem',
        18: '1.125rem',
        16: '1rem',
        14: '0.85rem',
        "xs": "0.75rem",
        "sm": "0.875rem",
        "md": "1.125rem",
        "lg": "1.25rem",
        "xl": "1.5rem",
        "2xl": "1.875rem",
        "3xl": "2.25rem",
        "4xl": "3rem",
      },
    },
  },
};
