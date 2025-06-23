import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => (
            <Image width={1200} height={600} {...(props as ImageProps)} />
        ),
        ...components,
    };
}
