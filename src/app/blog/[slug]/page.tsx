import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostBody from "@/components/PostBody";
import { getBlogPost, getAllBlogSlugs } from "@/lib/sanity-data";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "المقال غير موجود" };

  const description = post.seoDescription || post.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <article className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
              كل المقالات
            </Link>

            <span className="mt-6 block text-xs font-bold text-ink-400">
              {formatDate(post.publishedAt)}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink-950 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-500">{post.excerpt}</p>
          </div>

          {post.coverImageUrl && (
            <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl px-4 sm:px-6">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
            <PostBody value={post.body} />
          </div>

          <div className="mx-auto mt-14 max-w-2xl px-4 text-center sm:px-6">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
            >
              احصل على تقييم مجاني
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
