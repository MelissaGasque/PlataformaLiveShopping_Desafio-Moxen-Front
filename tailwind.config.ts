import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        black: {
          950:"#0a0a0a"
        },
        white:{
          50:"#fafafa"
        },
        purple:{
          200:"#e9d5ff",
          400:"#c084fc"
        }
      }
    },
  },
  plugins: [],
};
export default config;
