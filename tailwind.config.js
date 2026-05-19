/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff2bd6',
          violet: '#7a5cff',
          lime: '#9dff00',
          amber: '#ffb800',
        },
        bg: {
          deep: '#05060d',
          panel: 'rgba(10, 14, 28, 0.55)',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 16px rgba(0,245,255,0.55), 0 0 48px rgba(0,245,255,0.25)',
        'neon-magenta': '0 0 16px rgba(255,43,214,0.55), 0 0 48px rgba(255,43,214,0.25)',
        'neon-violet': '0 0 16px rgba(122,92,255,0.55), 0 0 48px rgba(122,92,255,0.25)',
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 60px rgba(0,0,0,0.45)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-22px,0)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: 0.7, filter: 'drop-shadow(0 0 6px currentColor)' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 18px currentColor)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: 1 },
          '20%,22%,24%,55%': { opacity: 0.4 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        scanline: 'scanline 6s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        flicker: 'flicker 4s linear infinite',
      },
    },
  },
  plugins: [],
};
