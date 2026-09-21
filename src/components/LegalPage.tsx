import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-extrabold text-brand-900">{title}</h1>
        <p className="mt-2 text-sm text-neutral-500">آخر تحديث: {updatedAt}</p>
        <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-8 text-neutral-700">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
