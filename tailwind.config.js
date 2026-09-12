/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        panel: {
          DEFAULT: 'var(--panel)',
          card: 'var(--panel-card)',
          hover: 'var(--panel-hover)',
          border: 'var(--panel-border)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        streak: {
          flame: 'var(--streak-flame)',
          green: 'var(--streak-green)',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(255, 120, 73, 0.25)',
        'glow-md': '0 0 35px -5px rgba(255, 120, 73, 0.35)',
        'glow-lg': '0 0 50px -10px rgba(255, 120, 73, 0.45)',
      },
    },
  },
  plugins: [],
}
