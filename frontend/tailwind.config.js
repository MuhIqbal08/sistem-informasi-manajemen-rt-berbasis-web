/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/components/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f70214ff",
        secondary: "#F8F8F8",
        dark: "#240007",
        shadow: "#292323",
        stroke: "#E2E8F0",
      },
      inset: {
        "left-85": "340px",
      },
      borderWidth: {
        6: "6px",
      },
      borderColor: {
        "red-500": "#ef4444",
        "red-700": "#b91c1c",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "gradient-x": "gradientX 3s ease infinite",
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      width: {
        a4: "210mm",
        mda4: "120mm",
        sma4: "60mm",
        "35rem": "35rem",
      },
      height: {
        a4: "297mm",
        mda4: "160mm",
        sma4: "105mm",
        "60px": "60px",
        "10%": "10%",
        "90%": "90%",
      },
      maxHeight: {
        "4/5": "80%",
      },
      minHeight: {
        "4/5": "80%",
      },
      spacing: {
        7.5: "1.875rem",
      },
      keyframes: {
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideIn: {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
