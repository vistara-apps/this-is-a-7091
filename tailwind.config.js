/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: 'hsl(140, 60%, 45%)',
        primary: 'hsl(210, 80%, 50%)',
        surface: 'hsl(210, 30%, 15%)',
        background: 'hsl(210, 30%, 10%)',
        'text-primary': 'hsl(0, 0%, 95%)',
        'text-secondary': 'hsl(0, 0%, 70%)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'card': '8px',
        'input': '6px',
        'button': '4px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 30%, 50%, 0.1)',
        'modal': '0 12px 36px hsla(210, 30%, 50%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}