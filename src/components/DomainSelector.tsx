import Link from "next/link";
import { Calculator, ShoppingBag, ArrowLeft } from "lucide-react";

export default function DomainSelector() {
  return (
    <section id="domains" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            مجالان. منظومة واحدة.
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            نساعدك في تنظيم الجانب المالي، وتحسين الجانب الرقمي لنشاطك من
            مكان واحد
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* المحاسبة والضريبة */}
          <div className="flex flex-col justify-between rounded-[2rem] bg-ink-950 p-9 text-right shadow-xl shadow-ink-950/10 sm:p-11">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Calculator className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <span className="mt-7 block text-sm font-bold tracking-wide text-brand-300">
                المحاسبة والضريبة
              </span>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                إدارة مالية أوضح، والتزام ضريبي أكثر تنظيمًا
              </h3>
            </div>
            <Link
              href="/accounting"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
            >
              استكشف المحاسبة والضريبة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {/* التجارة الإلكترونية */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-ink-100 bg-white p-9 text-right shadow-sm sm:p-11">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <ShoppingBag className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <span className="mt-7 block text-sm font-bold tracking-wide text-brand-600">
                التجارة الإلكترونية
              </span>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-ink-950 sm:text-3xl">
                من تجهيز المتجر إلى تحسين الأداء والنتائج
              </h3>
            </div>
            <Link
              href="/ecommerce"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              استكشف التجارة الإلكترونية
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
