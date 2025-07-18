console.log("Cargando Tailwind config");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { testcolor: "green" },
  },
  plugins: [],
};
