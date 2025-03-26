/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
    },
    extend: {
      backgroundColor: ["responsive", "hover"],
      textColor: ["responsive", "hover"],
      colors: {
        // UNIK Brand Colors (more subtle)
        unik: {
          blue: "#4FB3F6", // Softer blue
          purple: "#8B5CF6", // Softer purple
          green: "#34D399", // Success green
          yellow: "#FBBF24", // Warning yellow
          red: "#F87171", // Error red
        },
        // Semantic colors
        primary: {
          DEFAULT: "#4FB3F6",
          hover: "#3B9EE2",
          light: "#EBF5FE",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          hover: "#7C4DEE",
          light: "#F3EEFF",
        },
        // Background colors
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F9FAFB",
          tertiary: "#F3F4F6",
        },
        // Text colors
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        // Border colors
        border: {
          DEFAULT: "#E5E7EB",
          secondary: "#D1D5DB",
        },
        // Status colors
        status: {
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
          info: "#4FB3F6",
        },
        primarySecondary: "#F3D8F3",
        secondaryContrast: "#FFFFFF",
        gray: "#f9f9f9",
        paleSilver: "#EBEBEB",
        mediumGray: "#808080",
        card: "#F8F8F8",
        lightGray: "#C3C3C3",
        newGray: "#F5F6F9",
        hoverGray: "#E1E5F0",
        iconGray: "#E8E8E8",
        lightSkyBlue: "#CFF3FB",
        customTextGray: "#4D5059",
        customTextGray2: "#999999",
        customBgGray: "#A0A0A0",
        customTextPink: "#4A037D",
        customTextPink2: "#9F00D9",
        customBorderGray: "#BFBFBF",
      },
      backgroundImage: {
        "unik-gradient": "linear-gradient(135deg, #4FB3F6 0%, #8B5CF6 100%)",
        "unik-gradient-hover":
          "linear-gradient(135deg, #3B9EE2 0%, #7C4DEE 100%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
        dropdown: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
      });
    },
  ],
};
