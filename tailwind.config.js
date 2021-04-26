module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        container: {
            padding: '28px 94px'
        },
        fontSize: {
            sm: '.875rem',
            xl: ['18px', '60px'],
            base: ['14px', '28px'],
            '5xl': ['32px', '60px'],
            '4xl': ['28px', '60px'],
            '3xl': ['24px', '60px'],
            '2xl': ['20px', '60px']
        },
        fontFamily: {
            roboto: ['Roboto', 'ui-monospace', 'SFMono-Regular']
        },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
};
