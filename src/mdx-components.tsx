import Image, { ImageProps } from 'next/image';

import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => (
            <Image
                {...(props as ImageProps)}
                width={1200}
                height={600}
                alt={props.alt}
                priority
            />
        ),
        ...components,
    };
}
