import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8F7F3",
          darken: "#D6D5D0"
        },
        primary: {
          DEFAULT: "#C5DD7C",
          lighten: "#D6F088",
          darken: "#B0C474",
          lightest: "#F8FFCD",
          light: "#E5F3BD"
        },
        sub: {
          DEFAULT: "#FF8551",
          lighten: "#FFAA7A",
          darken: "#D77247",
          lightest: "#FFE6CF"
        },
        active: {
          DEFAULT: "#EB6A4E",
          lighten: "#FFA08B",
          darken: "#CC634C"
        },
        cancel: {
          DEFAULT: "#ABABAB",
          lighten: "#D6D6D6",
          darken: "#717171"
        },
        inactive: {
          DEFAULT: "#D8D8D8",
          lighten: "#EFEFEF",
          darken: "#939393"
        },
        bad: "#A990C1"
      },
      boxShadow: {
        upper: "0px -2px 5px rgba(0, 0, 0, 0.07)",
        down: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        moreDown: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      },
      screens: {
        cs: "0px"
      }
    },
    keyframes: {
      "show-toast": {
        "0%": { bottom: "8%" },
        "70%": { bottom: "8%" },
        "100%": { bottom: "0" }
      },
      "bottom-sheet-up": {
        "0%": { transform: "translateY(30rem)" },
        "100%": { transform: "translateY(0)" }
      }
    },
    animation: {
      "show-toast": "show-toast 3s ease-in-out",
      "bottom-sheet-up": "bottom-sheet-up 1s ease-in-out"
    }
  },
  plugins: []
};
export default config;
