import EcommerceContactForm from "@/components/EcommerceContactForm";

export default function EcommerceContactSection() {
  return (
    <section id="store-assessment" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-wide text-amber-600">
            التجارة الإلكترونية
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            اطلب تقييم متجرك
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            عبّي النموذج وبنراجع متجرك ونتواصل معك بأنسب طريقة للتطوير.
          </p>
        </div>

        <div className="mt-10">
          <EcommerceContactForm />
        </div>
      </div>
    </section>
  );
}

