import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";

export default function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
      <span className="sr-only">تواصل عبر واتساب</span>
    </a>
  );
}
