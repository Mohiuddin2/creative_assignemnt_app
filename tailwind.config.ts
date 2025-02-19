import type { Config } from 'tailwindcss';

import daisyui from 'daisyui';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "dark", "light"], // You can switch themes dynamically
  },
};
export default config;
