/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        source: ['Source Code Pro', 'monospace'],
        researcher: ['Researcher', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          alt: 'rgb(var(--color-bg-alt) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          alt: 'rgb(var(--color-primary-alt) / <alpha-value>)',
          on: 'rgb(var(--color-on-primary) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          alt: 'rgb(var(--color-secondary-alt) / <alpha-value>)',
          on: 'rgb(var(--color-on-secondary) / <alpha-value>)',
        },
        green: {
          DEFAULT: 'rgb(var(--color-green) / <alpha-value>)',
          brigth: 'rgb(var(--color-green-bright) / <alpha-value>)',
          dark: 'rgb(var(--color-green-dark) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive) / <alpha-value>)',
          dark: 'rgb(var(--color-destructive-dark) / <alpha-value>)',
          on: 'rgb(var(--color-on-destructive) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          on: 'rgb(var(--color-on-muted) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
