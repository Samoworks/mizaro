"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import MizaroMark from "@/components/MizaroMark";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/accounting", label: "المحاسبة والضريبة" },
  { href: "/ecommerce", label: "التجارة الإلكترونية" },
  { href: "/packages", label: "الباقات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <MizaroMark className="h-8 w-8 text-brand-800" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-ink-950">
              {siteConfig.companyName}
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-ink-400">
              MIZARO
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-950 md:hidden"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-900/5 bg-white px-4 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink-950 px-3 py-3 text-center text-sm font-bold text-white"
            >
              ابدأ الآن
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
