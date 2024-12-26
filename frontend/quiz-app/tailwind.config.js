/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:  '#2563eb',
          'primary-hover': '#1d4ed8',
          
      },
      // Extend the theme with custom scrollbar styles
      
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    
  ],
}

