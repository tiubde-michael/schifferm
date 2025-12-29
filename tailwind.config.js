/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "implementers-blue": "#0066CC",
        "implementers-green": "#00A86B",
        "implementers-accent": "#FBBF24",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Manrope"', "ui-sans-serif", "system-ui"],
        body: ['"Manrope"', "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0066CC, #1E40AF 50%, #00A86B)",
      },
      boxShadow: {
        "glow-green": "0 25px 70px -25px rgba(0, 168, 107, 0.45)",
      },
    },
  },
  plugins: [],
};
