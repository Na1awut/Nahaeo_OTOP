// ================================================
// Tailwind CSS Configuration
// ================================================

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Exact colors from skill.md
                "pastel-pink": "#FFD1DC",
                "pastel-peach": "#FFE5B4",
                "pastel-mint": "#98FF98",
                "off-white": "#FAFAFA",
                // Darker variants
                "pink-dark": "#FFB6C1",
                "peach-dark": "#FFDAB9",
                "mint-dark": "#7AE47A",
                // UI colors
                "text-main": "#2D2A26",
                "text-soft": "#6B6B6B",
            },
            fontFamily: {
                display: ["Kanit", "sans-serif"],
                sans: ["Inter", "sans-serif"],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'pink-glow': '0 20px 50px rgba(255, 182, 193, 0.5)',
                'mint-glow': '0 20px 50px rgba(152, 255, 152, 0.4)',
                'peach-glow': '0 20px 50px rgba(255, 229, 180, 0.5)',
                'soft': '0 10px 40px rgba(0, 0, 0, 0.08)',
            },
            animation: {
                'float-slow': 'float 8s ease-in-out infinite',
                'float-medium': 'float 6s ease-in-out infinite',
                'float-fast': 'float 4s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'pulse-soft': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 209, 220, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 209, 220, 0.8)' },
                }
            }
        },
    },
};
