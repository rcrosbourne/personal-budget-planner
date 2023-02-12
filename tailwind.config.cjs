/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      primary: {
        50: "#EFFCF6",
        100: "#C6F7E2",
        200: "#8EEDC7",
        300: "#65D6AD",
        400: "#3EBD93",
        500: "#27AB83",
        600: "#199473",
        700: "#147D64",
        800: "#0C6B58",
        900: "#014D40"
      },
      neutral: {
        50: "#F0F4F8",
        100: "#D9E2EC",
        200: "#BCCCDC",
        300: "#9FB3C8",
        400: "#829AB1",
        500: "#627D98",
        600: "#486581",
        700: "#334E68",
        800: "#243B53",
        900: "#102A43"
      },
      secondary: {
        blue: {
          50: "#DCEEFB",
          100: "#B6E0FE",
          200: "#84C5F4",
          300: "#62B0E8",
          400: "#4098D7",
          500: "#2680C2",
          600: "#186FAF",
          700: "#0F609B",
          800: "#0A558C",
          900: "#003E6B"
        },
        purple: {
          50: "#EAE2F8",
          100: "#CFBCF2",
          200: "#A081D9",
          300: "#8662C7",
          400: "#724BB7",
          500: "#653CAD",
          600: "#51279B",
          700: "#421987",
          800: "#34126F",
          900: "#240754"
        },
        red: {
          50: "#FFEEEE",
          100: "#FACDCD",
          200: "#F29B9B",
          300: "#E66A6A",
          400: "#D64545",
          500: "#BA2525",
          600: "#A61B1B",
          700: "#911111",
          800: "#780A0A",
          900: "#610404"
        },
        yellow: {
          50: "#FFFAEB",
          100: "#FCEFC7",
          200: "#F8E3A3",
          300: "#F9DA8B",
          400: "#F7D070",
          500: "#E9B949",
          600: "#C99A2E",
          700: "#A27C1A",
          800: "#7C5E10",
          900: "#513C06"
        }
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-wotfard)", "sans-serif"],
        cursive: ["var(--font-sriacha)", "cursive"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp")
  ]
};
