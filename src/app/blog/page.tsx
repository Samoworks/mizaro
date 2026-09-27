import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/sanity-data";

export const metadata: Metadata = {
  title: "المدونة",
  description: "مقالات حول المحاسبة، الضريبة، والمتابعة المالية للمنشآت الصغيرة والمتوسطة في السعودية.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Newspaper className="h-7 w-7" strokeWidth={1.6} />
          </span>
          <span className="mt-5 block text-sm font-bold tracking-wide text-brand-600">
            المدونة
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            مقالات عن المحاسبة والضريبة
          </h1>
          <p className="mt-4 text-ink-500 leading-8">
            شروحات عملية تساعدك تفهم حسابات منشأتك والتزاماتها الضريبية.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-ink-200 p-10 text-center text-ink-500">
              لا توجد مقالات منشورة بعد — تابع المدونة قريبًا.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-50">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-brand-300">
                        <Newspaper className="h-10 w-10" strokeWidth={1.4} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 text-right">
                    <span className="text-xs font-bold text-ink-400">
                      {formatDate(post.publishedAt)}
                    </span>
                    <h2 className="text-base font-extrabold leading-7 text-ink-950">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 flex-1 text-sm leading-7 text-ink-500">
                      {post.excerpt}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                      اقرأ المقال
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
