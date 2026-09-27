"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  onClick?: () => void;
};

/**
 * رابط تنقل يعرف الصفحة الحالية ويظلّل نفسه تلقائيًا عندما يكون
 * الزائر بداخل تلك الصفحة (أو أحد مساراتها الفرعية).
 */
export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-brand-800",
  inactiveClassName = "text-ink-600 hover:text-brand-800",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      {children}
    </Link>
  );
}
