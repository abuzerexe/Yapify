/** @type {import('tailwindcss').Config} */
const shadcnConfig = {
    darkMode: ["class"],
    content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  
  module.exports = {
    darkMode: shadcnConfig.darkMode,
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "*.{js,ts,jsx,tsx,mdx}", ...shadcnConfig.content],
    theme: {
      extend: {
        ...shadcnConfig.theme.extend,
        colors: {
          ...shadcnConfig.theme.extend.colors,
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
            950: "#022c22",
          },
          teal: {
            50: "#f0fdfa",
            100: "#ccfbf1",
            200: "#99f6e4",
            300: "#5eead4",
            400: "#2dd4bf",
            500: "#14b8a6",
            600: "#0d9488",
            700: "#0f766e",
            800: "#115e59",
            900: "#134e4a",
            950: "#042f2e",
          },
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme("colors.gray.700"),
              a: {
                color: theme("colors.emerald.600"),
                "&:hover": {
                  color: theme("colors.emerald.700"),
                },
              },
              h1: {
                color: theme("colors.gray.900"),
              },
              h2: {
                color: theme("colors.gray.900"),
              },
              h3: {
                color: theme("colors.gray.900"),
              },
              h4: {
                color: theme("colors.gray.900"),
              },
              blockquote: {
                color: theme("colors.gray.700"),
                borderLeftColor: theme("colors.emerald.500"),
              },
              "code::before": {
                content: '""',
              },
              "code::after": {
                content: '""',
              },
            },
          },
          emerald: {
            css: {
              "--tw-prose-body": theme("colors.gray.700"),
              "--tw-prose-headings": theme("colors.gray.900"),
              "--tw-prose-lead": theme("colors.gray.600"),
              "--tw-prose-links": theme("colors.emerald.600"),
              "--tw-prose-bold": theme("colors.gray.900"),
              "--tw-prose-counters": theme("colors.gray.500"),
              "--tw-prose-bullets": theme("colors.gray.500"),
              "--tw-prose-hr": theme("colors.gray.200"),
              "--tw-prose-quotes": theme("colors.gray.700"),
              "--tw-prose-quote-borders": theme("colors.emerald.500"),
              "--tw-prose-captions": theme("colors.gray.500"),
              "--tw-prose-code": theme("colors.gray.900"),
              "--tw-prose-pre-code": theme("colors.gray.100"),
              "--tw-prose-pre-bg": theme("colors.gray.900"),
              "--tw-prose-th-borders": theme("colors.gray.300"),
              "--tw-prose-td-borders": theme("colors.gray.200"),
            },
          },
          invert: {
            css: {
              "--tw-prose-body": theme("colors.gray.300"),
              "--tw-prose-headings": theme("colors.white"),
              "--tw-prose-lead": theme("colors.gray.400"),
              "--tw-prose-links": theme("colors.emerald.400"),
              "--tw-prose-bold": theme("colors.white"),
              "--tw-prose-counters": theme("colors.gray.400"),
              "--tw-prose-bullets": theme("colors.gray.400"),
              "--tw-prose-hr": theme("colors.gray.700"),
              "--tw-prose-quotes": theme("colors.gray.300"),
              "--tw-prose-quote-borders": theme("colors.emerald.500"),
              "--tw-prose-captions": theme("colors.gray.400"),
              "--tw-prose-code": theme("colors.white"),
              "--tw-prose-pre-code": theme("colors.gray.300"),
              "--tw-prose-pre-bg": theme("colors.gray.900"),
              "--tw-prose-th-borders": theme("colors.gray.600"),
              "--tw-prose-td-borders": theme("colors.gray.700"),
            },
          },
        }),
      },
    },
    plugins: [...shadcnConfig.plugins, require("@tailwindcss/typography")],
  }
  