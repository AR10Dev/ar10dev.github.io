import type { ProcessOptions } from "postcss";

type PostCssConfig = {
  plugins: Record<string, ProcessOptions>;
};

const config: PostCssConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;