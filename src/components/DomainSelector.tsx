import { Calculator, ShoppingBag, ArrowLeft } from "lucide-react";

export default function DomainSelector() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* المحاسبة والضريبة */}
          <div className="flex flex-col justify-between rounded-3xl bg-brand-900 p-8 text-right shadow-xl shadow-brand-900/15 sm:p-10">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Calculator className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <span className="mt-6 block text-sm font-bold tracking-wide text-brand-200">
                المحاسبة والضريبة
              </span>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                خل حسابات نشاطك علينا
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-100/85 sm:text-base">
                مسك حسابات، فواتير، ضريبة القيمة المضافة، وإقرارات ضريبية —
                متابعة شهرية عن بُعد للبوفيهات والمطاعم والكافيهات والمنشآت
                الصغيرة والمتوسطة.
              </p>
            </div>
            <a
              href="#accounting"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-900 transition-transform hover:scale-[1.02]"
            >
              اكتشف خدمات المحاسبة
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>

          {/* التجارة الإلكترونية */}
          <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 text-right shadow-sm sm:p-10">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <ShoppingBag className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <span className="mt-6 block text-sm font-bold tracking-wide text-amber-600">
                التجارة الإلكترونية
              </span>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-brand-900 sm:text-3xl">
                خل متجرك يشتغل بشكل أفضل
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
                تجهيز المتجر، تحسين المنتجات وSEO، ربط الإعلانات والكتالوجات،
                وتحسين تجربة العميل من الزيارة إلى الشراء.
              </p>
            </div>
            <a
              href="#ecommerce"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              اكتشف خدمات المتاجر
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

