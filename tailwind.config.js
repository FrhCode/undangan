module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./images/pexels-pixabay-265856.jpg')",
        ring: "url('./images/pexels-karen-laårk-boshoff-7436111.jpg')",
        timer: "url('./images/pexels-cottonbro-6153883.jpg')",
      },
      fontFamily: {
        dancing: ["Dancing Script"],
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        main: "0 0 40px 0px white inset",
        second: "0 0 50px 1px rgb(15,118,110) inset",
      },
      animation: {
        scale: "1s ease-in 0s infinite alternate both running scale",
      },
      keyframes: {
        scale: {
          "0%": { scale: "100%" },
          "100%": { scale: "104%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
