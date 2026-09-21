/**
 * علامة مِزارو — شكل هندسي مجرّد أصلي (ليست شعارًا مأخوذًا من مصدر خارجي).
 * تُستخدم في الهيدر والفوتر.
 */
export default function MizaroMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="36" height="36" rx="10" className="fill-current" opacity={0.08} />
      <path
        d="M12 28V13.5C12 12.67 12.9 12.17 13.6 12.62L20 16.75L26.4 12.62C27.1 12.17 28 12.67 28 13.5V28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 28L17 22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 28L23 22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
