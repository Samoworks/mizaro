import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";
import MizaroMark from "@/components/MizaroMark";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/accounting", label: "المحاسبة والضريبة" },
  { href: "/ecommerce", label: "التجارة الإلكترونية" },
  { href: "/packages", label: "الباقات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 py-16 text-ink-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <MizaroMark className="h-8 w-8 text-brand-400" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-white">
                  {siteConfig.companyName}
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-ink-400">
                  MIZARO
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-ink-400">
              {siteConfig.tagline} — المحاسبة والضريبة والتجارة الإلكترونية،
              من مكان واحد.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">روابط</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-400">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">تواصل معنا</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-400">
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
            <ul className="flex flex-col gap-2.5 text-sm text-ink-400">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-ink-500">
          © {year} {siteConfig.companyName} · Mizaro. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
