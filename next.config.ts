import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    turbopack: {},
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            ['remark-gfm'] as any,
            ['remark-math'] as any,
            ['remark-toc', { heading: 'สารบัญ' }] as any,
        ],
        rehypePlugins: [
            ['rehype-katex'] as any,
            ['rehype-pretty-code', { theme: 'github-light' }] as any,
            ['rehype-slug'] as any,
        ],
    },
});

export default withMDX(nextConfig);
