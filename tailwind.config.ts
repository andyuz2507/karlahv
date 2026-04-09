import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        berry: '#7F334E',
        'berry-dark': '#6B2A42',
        'berry-light': '#9B4464',
        'dusty-rose': '#DDAAAA',
        'dusty-rose-light': '#E8C4C4',
        cream: '#F5F0EB',
        'cream-light': '#F8F4F2',
        charcoal: '#4A3C42',
        'charcoal-light': '#6B5B62',
        peach: '#F4B680',
        'peach-light': '#F8D4B8',
        ink: '#0F0A0C',
        'ink-soft': '#1E1420',
        'off-white': '#FAFAF7',
        sand: '#EDE7DC',
        'sand-dark': '#D8D0C4',
        wine: '#2A0F1A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 30px -4px rgba(127, 51, 78, 0.08)',
        'soft-lg': '0 20px 50px -12px rgba(127, 51, 78, 0.12)',
        'bold': '0 8px 40px -8px rgba(15, 10, 12, 0.25)',
        'bold-lg': '0 20px 60px -10px rgba(15, 10, 12, 0.35)',
        'berry-glow': '0 8px 40px -4px rgba(127, 51, 78, 0.45)',
      },
      animation: {
        'fade-in': 'fadeInUp 0.5s ease-out both',
        'reveal': 'reveal 0.7s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
export default config
