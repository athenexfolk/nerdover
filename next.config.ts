import createMDX from '@next/mdx';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            ['remark-gfm'],
            ['remark-math'],
            ['remark-toc', { heading: 'สารบัญ' }],
        ],
        rehypePlugins: [
            ['rehype-katex'],
            [
                'rehype-pretty-code',
                { theme: { light: 'vitesse-light', dark: 'github-dark' } },
            ],
            ['rehype-slug'],
        ],
    },
});

export default withMDX(nextConfig);
