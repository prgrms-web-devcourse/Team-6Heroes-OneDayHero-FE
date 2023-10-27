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
        primary: {
          DEFAULT: "#C5DD7C",
          lighten: "#D6F088",
          darken: "#B0C474"
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
      }
    }
  },
  plugins: []
};
export default config;
