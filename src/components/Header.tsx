import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity-data";
import MizaroMark from "@/components/MizaroMark";
import MobileNav from "@/components/MobileNav";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/accounting", label: "المحاسبة والضريبة" },
  { href: "/packages", label: "الباقات" },
  { href: "/about", label: "من أنا" },
  { href: "/contact", label: "تواصل معي" },
];

export default async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt={settings.companyName}
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-contain"
            />
          ) : (
            <MizaroMark className="h-8 w-8 text-brand-800" />
          )}
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-ink-950">
              {settings.companyName}
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-ink-400">
              {settings.companyNameEn.toUpperCase()}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-full bg-ink-950 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-800"
          >
            ابدأ الآن
          </Link>
        </div>

        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
