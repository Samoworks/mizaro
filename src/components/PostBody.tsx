import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

type ImageBlock = {
  _type: "image";
  alt?: string;
  asset?: SanityImageSource;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      const url = urlForImage(value)?.width(1200).fit("max").url();
      if (!url) return null;
      return (
        <span className="my-8 block overflow-hidden rounded-2xl">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
          />
        </span>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-extrabold text-ink-950">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-extrabold text-ink-950">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-8 text-ink-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-r-4 border-brand-300 pr-4 text-ink-600 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 mr-5 list-disc space-y-2 text-ink-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 mr-5 list-decimal space-y-2 text-ink-700">{children}</ol>
    ),
  },
};

export default function PostBody({ value }: { value: unknown[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
