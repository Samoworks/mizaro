import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-brand-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            اطلب الخدمة
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            جاهز نبدأ؟ عبّي بياناتك
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            عبّي النموذج وبنراجع نشاطك ونتواصل معك لاقتراح الباقة الأنسب.
          </p>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
