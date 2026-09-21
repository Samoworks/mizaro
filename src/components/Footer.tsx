import { Calculator, Mail, MessageCircle } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 py-14 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
                <Calculator className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold text-white">
                {siteConfig.companyName}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-brand-200/80">
              محاسبة وضريبة شهرية عن بُعد، وخدمات مستقلة لتطوير وتحسين
              المتاجر الإلكترونية، لأصحاب المنشآت الصغيرة والمتوسطة في
              السعودية.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">روابط</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-200/80">
              <li>
                <a href="#accounting" className="hover:text-white">
                  المحاسبة والضريبة
                </a>
              </li>
              <li>
                <a href="#ecommerce" className="hover:text-white">
                  التجارة الإلكترونية
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white">
                  الباقات
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">تواصل معنا</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-200/80">
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">قانوني</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-200/80">
              <li>
                <a href="/privacy" className="hover:text-white">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  الشروط والأحكام
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-brand-300/70">
          © {year} {siteConfig.companyName}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
