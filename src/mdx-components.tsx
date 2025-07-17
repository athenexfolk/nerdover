import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => (
            <Image
                {...(props as ImageProps)}
                width={1200}
                height={600}
                alt={props.alt}
            />
        ),
        ...components,
    };
}
