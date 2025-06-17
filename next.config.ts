import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/nerdoverbucket/**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkToc],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, { theme: "github-light" }], rehypeSlug],
  },
});

export default withMDX(nextConfig);
