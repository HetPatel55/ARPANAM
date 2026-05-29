import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "1.5rem"
      },
      screens: {
        "2xl": "1520px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1E40AF",
          foreground: "#FFFFFF"
        },
        sky: {
          brand: "#38BDF8"
        },
        sunshine: {
          DEFAULT: "#FACC15",
          deep: "#F59E0B"
        },
        leaf: "#22C55E",
        grape: "#A855F7",
        rose: "#EC4899",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(30, 64, 175, 0.14)",
        glow: "0 22px 70px rgba(56, 189, 248, 0.25)",
        card: "0 18px 45px rgba(15, 23, 42, 0.10)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 15% 20%, rgba(250, 204, 21, 0.25), transparent 28%), radial-gradient(circle at 80% 12%, rgba(56, 189, 248, 0.26), transparent 30%), linear-gradient(135deg, #eff6ff 0%, #ffffff 42%, #fdf2f8 100%)",
        "admission-gradient": "linear-gradient(135deg, #1E40AF 0%, #38BDF8 42%, #F59E0B 100%)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
