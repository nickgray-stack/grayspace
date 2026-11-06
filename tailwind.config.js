/** @type {import('tailwindcss').Config} */
// Tailwind is wired to the design-system tokens (defined as CSS variables in
// app/globals.css). The locked chrome + primitives live in globals.css (ported
// 1:1 from the prototype's shared.css); Tailwind utilities are for composing
// NEW layout on top of the same tokens — never for re-expressing the chrome.
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,jsx}",
  ],
  // Preflight off: the ported design system (globals.css) owns the reset and
  // the chrome. Tailwind here is utilities-only, layered on the same tokens.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: "var(--font)",
        mono: "var(--mono)",
      },
      maxWidth: {
        site: "1800px",
        statement: "2560px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
