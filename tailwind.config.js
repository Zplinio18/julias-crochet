export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001B50",
        secondary: "#004094",
        suport: {
          100: "#151C2A",
          200: "#00142E",
          300: "#0A0A0A",
          400: "#000714",
        },
        subtitle: "#3E6292",
      },
      screens: {
        mobile: "980px",
        tablet: "1130px",
        laptop: "1351px",
        fullhd: "1897px",
      },
      fontFamily: {
        dyna: ['"DynaPuff"', "sans‑serif"],
        exo2: ['"Exo 2"', "sans‑serif"],
      },
      animation: {
        "pulse-neon-fail": "pulse-neon-fail 4s infinite steps(1,end)",
      },
      keyframes: {
        "pulse-neon-fail": {
          "0%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "1.5%": { boxShadow: "none" },
          "3.33%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "7.40%": { boxShadow: "none" },
          "8.33%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "18%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "19%": { boxShadow: "none" },
          "22%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "33.33%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
          "100%": {
            boxShadow: "0 0 5px #004094, 0 0 10px #004094, 0 0 15px #004094",
          },
        },
      },
    },
  },
  plugins: [],
};
