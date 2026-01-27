/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'odont-primary': '#052A3D',   // Azul oscuro
        'odont-secondary': '#117192', // Azul claro
        'odont-turquoise': '#19D1E6',    // Verde para estados positivos
        'odont-gray': '#614943',   // Gris muy claro para fondos
        'odont-skyblue': '#bde0eeff',
        'odont-skyblue': '#bde0eeff',
      }
    },
  },
  plugins: [],
}