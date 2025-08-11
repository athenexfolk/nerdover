/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        blockquote: {
                            quotes: 'none',
                            fontStyle: 'normal',
                            paddingTop: theme('spacing.2'),
                            paddingBottom: theme('spacing.2'),
                            paddingLeft: theme('spacing.4'),
                            paddingRight: theme('spacing.4'),
                            borderWidth: '1.5px',
                            borderColor: theme('colors.black'),
                            borderRadius: theme('borderRadius.md'),
                        },
                        'blockquote p:first-of-type::before': {
                            content: 'none',
                        },
                        'blockquote p:last-of-type::after': { content: 'none' },

                        img: {
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        },
                        figure: {
                            width: '100%',
                            maxWidth: theme('maxWidth.2xl'),
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        },

                        pre: {
                            borderWidth: '1.5px',
                            borderColor: theme('colors.black'),
                        },
                    },
                },

                lesson: {
                    css: {
                        blockquote: {
                            quotes: 'none',
                            fontStyle: 'normal',
                            paddingTop: theme('spacing.0'),
                            paddingBottom: theme('spacing.0'),
                            paddingLeft: theme('spacing.4'),
                            paddingRight: theme('spacing.4'),
                            borderWidth: '1.5px',
                            borderColor: theme('colors.black'),
                            borderRadius: theme('borderRadius.md'),
                        },
                        'blockquote p:first-of-type::before': {
                            content: 'none',
                        },
                        'blockquote p:last-of-type::after': { content: 'none' },

                        img: {
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        },
                        figure: {
                            width: '100%',
                            maxWidth: theme('maxWidth.2xl'),
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        },
                        pre: {
                            borderWidth: '1.5px',
                            borderColor: theme('colors.black'),
                        },
                    },
                },
            }),
        },
    },
};
