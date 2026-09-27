"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavLink from "@/components/NavLink";

type NavLink = { href: string; label: string };

export default function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-ink-950 md:hidden"
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full z-40 border-t border-ink-900/5 bg-white px-4 pb-5 pt-2 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium"
                activeClassName="bg-brand-50 text-brand-800"
                inactiveClassName="text-ink-700 hover:bg-brand-50"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/assessment"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink-950 px-3 py-3 text-center text-sm font-bold text-white"
            >
              احصل على تقييم مجاني
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
