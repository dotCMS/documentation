module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        backgroundColor: (theme) => ({
            ...theme('colors'),
            header: '#F3F6FD',
            gray: '#ECE8FC',
        }),
        borderColor: (theme) => ({
            ...theme('colors'),
            DEFAULT: theme('colors.gray.300', 'currentColor'),
            primary: '#542FE7',
            secondary: '#D7DBDF',
            gray: '#4A4A4A',
            purple: '#5E3CE9'
        }),
        container: {
            padding: '2.5rem'
        },
        fontFamily: {
            roboto: ['Roboto', 'ui-monospace', 'SFMono-Regular']
        },
        textColor: (theme) => ({
            ...theme('colors'),
            purple: '#542FE7',
            gray: '#4A4A4A',
            'gray-secondary': '#ACB4C0',
            'gray-200': '#777777'
        }),
        extend: {
            fontSize: {
                '3.5xl': '2rem'
            },
            rotate: {
                135: '135deg',
                315: '315deg'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
