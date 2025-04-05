// postcss.config.js
// postcss.config.js (or .mjs) - Might not work as reliably as .cjs
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default { // Using export default
  plugins: [
    tailwindcssNesting,
    tailwindcss,
    autoprefixer,
  ],
};