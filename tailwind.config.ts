import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        primary: "var(--primary)",
        gray_6: "var(--gray-6)",
        gray_5: "var(--gray-5)",
      },
      boxShadow: {
        white: "inset 0 -100px 0 0 white",
      },
    },
  },
  plugins: [],
} satisfies Config;
