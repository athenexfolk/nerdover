import type { Config } from 'tailwindcss';

export default {
    content: [],
    theme: {
        extend: {
            typography: ({ theme }) => ({
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
                            borderColor: theme('colors.stone.200'),
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
                            borderColor: theme('colors.stone.200'),
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
                            borderColor: theme('colors.stone.200'),
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
                            borderColor: theme('colors.stone.200'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [],
} satisfies Config;
