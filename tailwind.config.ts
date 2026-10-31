import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#07070C',
          surface: '#0C0E16',
          card: 'rgba(12, 14, 22, 0.85)',
          elevated: '#141724',
          border: 'rgba(0, 240, 255, 0.25)',
          borderHot: 'rgba(255, 42, 133, 0.6)',
        },
        vice: {
          magenta: '#FF2A85',
          cyan: '#00F0FF',
          amber: '#FF8A00',
          gold: '#FFD700',
          green: '#10FFA0',
          dark: '#07070C',
        },
      },
      fontFamily: {
        display: ['Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'glow-magenta': '0 0 30px rgba(255, 42, 133, 0.35)',
        'glow-amber': '0 0 25px rgba(255, 138, 0, 0.35)',
        'hud-card': '0 0 35px rgba(0, 240, 255, 0.12), inset 0 0 20px rgba(0, 240, 255, 0.05)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'synth-scan': 'synthScan 8s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        synthScan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
