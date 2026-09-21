import {
  Package,
  Store,
  Search,
  Megaphone,
  ClipboardList,
  CreditCard,
  Truck,
  UserCheck,
  Database,
  type LucideIcon,
} from "lucide-react";
import { ecommerceFlowStages } from "@/lib/site-config";

const icons: LucideIcon[] = [
  Package,
  Store,
  Search,
  Megaphone,
  ClipboardList,
  CreditCard,
  Truck,
  UserCheck,
  Database,
];

export default function EcommerceFlow() {
  return (
    <section className="bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-300">
            رحلة المتجر
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            من المنتج إلى البيانات
          </h2>
          <p className="mt-4 text-ink-400 leading-8">
            نراقب كل مرحلة في رحلة متجرك، ونتأكد أن كل خطوة تخدم التي بعدها.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
          {ecommerceFlowStages.map((stage, index) => {
            const Icon = icons[index];
            const isLast = index === ecommerceFlowStages.length - 1;
            return (
              <div key={stage} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:px-5">
                  <Icon className="h-5 w-5 text-brand-300" strokeWidth={1.7} />
                  <span className="text-xs font-bold text-white sm:text-sm">
                    {stage}
                  </span>
                </div>
                {!isLast && (
                  <span className="hidden text-ink-600 sm:inline">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
