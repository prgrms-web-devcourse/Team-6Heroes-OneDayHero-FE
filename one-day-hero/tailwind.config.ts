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
        base: {
          DEFAULT: "#F8F7F3",
          darken: "#D6D5D0"
        },
        primary: {
          DEFAULT: "#C5DD7C",
          lighten: "#D6F088",
          darken: "#B0C474",
          lightest: "#F8FFCD"
        },
        sub: {
          DEFAULT: "#FF8551",
          lighten: "#FFAA7A",
          darken: "#D77247"
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
        }
      },
      boxShadow: {
        upper: "0px -2px 5px rgba(0, 0, 0, 0.07)",
        down: "0px 2px 8px rgba(0, 0, 0, 0.15)"
      }
    }
  },
  plugins: []
};
export default config;
