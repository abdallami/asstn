import type { Config } from "tailwindcss"
import daisyui from "daisyui"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: "#1B2A56",
        steel: "#3E5C8A",
        sable: "#C89B3C",
        papier: "#F7F4EC",
        encre: "#1F2430",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        aeestn: {
          primary: "#1B2A56",
          secondary: "#3E5C8A",
          accent: "#C89B3C",
          neutral: "#1F2430",
          "base-100": "#F7F4EC",
          "base-200": "#EDE8DA",
          info: "#3E5C8A",
          success: "#4C7A5B",
          warning: "#C89B3C",
          error: "#B3432F",
        },
      },
    ],
  },
}

export default config