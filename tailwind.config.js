const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        container: {
            padding: '2.5rem'
        },
        fontFamily: {
            sans: [
                'Roboto',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol'
            ]
        },
        extend: {
            fontSize: {
                base: '14px'
            },
            rotate: {
                135: '135deg'
            },
            transitionProperty: {
                width: 'width'
            },
            colors: {
                blue: {
                    100: '#F4FBFF',
                    200: '#9FCBE7'
                },
                purple: {
                    DEFAULT: '#2A0753',
                    50: '#FBF9FE',
                    100: '#E3CEFB',
                    200: '#B27AF4',
                    300: '#8125ED',
                    400: '#550EA8',
                    500: '#2A0753',
                    600: '#230645',
                    700: '#1C0537',
                    800: '#150329',
                    900: '#0D021B'
                },
                pink: {
                    DEFAULT: '#E172FD'
                },
                gray: {
                    DEFAULT: colors.trueGray,
                    50: '#5B6175',
                    75: 'rgba(231, 231, 231, 0.4)',
                    100: '#A2A2A2',
                    150: '#4A4A4A'
                }
            },
            rotate: {
                135: '135deg'
            },
            borderWidth: {
                3: '3px'
            },
            minWidth: {
                72: '18rem'
            },
            height: {
                'mobile-nav': 'calc(100vh - 5rem)'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
