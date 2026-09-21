"use client";

import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#services", label: "الخدمات" },
  { href: "#why-us", label: "ليش نحن؟" },
  { href: "#packages", label: "الباقات" },
  { href: "#how-we-work", label: "كيف نشتغل" },
  { href: "#faq", label: "الأسئلة الشائعة" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* مكان الشعار: استبدل هذا الرمز بشعارك الفعلي عند توفره */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-white">
            <Calculator className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold text-brand-900">
            {siteConfig.companyName}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            اطلب استشارة مجانية
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-900 md:hidden"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-4 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-brand-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-brand-800 px-3 py-3 text-center text-sm font-bold text-white"
            >
              اطلب استشارة مجانية
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
