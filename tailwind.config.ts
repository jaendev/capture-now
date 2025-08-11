import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main background colors
        background: 'rgb(var(--color-background))',
        surface: 'rgb(var(--color-surface))',
        card: 'rgb(var(--color-card))',
        hover: 'rgb(var(--color-hover))',
        
        // Text colors
        foreground: 'rgb(var(--color-foreground))',
        muted: 'rgb(var(--color-foreground-muted))',
        accent: 'rgb(var(--color-accent-text))',
        
        // Primary colors (Purple theme)
        primary: {
          DEFAULT: 'rgb(var(--color-purple))',
          light: 'rgb(var(--color-purple-light))',
          dark: 'rgb(var(--color-purple-dark))',
        },
        
        // Secondary colors (Blue accents)
        secondary: {
          DEFAULT: 'rgb(var(--color-blue))',
          light: 'rgb(var(--color-blue-light))',
          dark: 'rgb(var(--color-blue-dark))',
        },
        
        // Border colors
        border: {
          DEFAULT: 'rgb(var(--color-border))',
          focus: 'rgb(var(--color-border-focus))',
        },
        
        // State colors
        success: 'rgb(var(--color-success))',
        warning: 'rgb(var(--color-warning))',
        error: 'rgb(var(--color-error))',
      },
      
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        mono: ['var(--font-family-mono)'],
      },
      
      boxShadow: {
        'purple-sm': 'var(--shadow-purple-sm)',
        'purple-md': 'var(--shadow-purple-md)',
        'purple-lg': 'var(--shadow-purple-lg)',
        'purple-xl': 'var(--shadow-purple-xl)',
      },
      
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, rgb(var(--color-purple)) 0%, rgb(var(--color-blue)) 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
