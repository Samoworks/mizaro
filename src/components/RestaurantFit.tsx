import {
  TrendingUp,
  Wallet,
  ShoppingBasket,
  ReceiptText,
  Percent,
  Scale,
  type LucideIcon,
} from "lucide-react";

type Item = {
  icon: LucideIcon;
  label: string;
};

const items: Item[] = [
  { icon: TrendingUp, label: "مبيعات يومية" },
  { icon: Wallet, label: "مصروفات" },
  { icon: ShoppingBasket, label: "مشتريات" },
  { icon: ReceiptText, label: "فواتير" },
  { icon: Percent, label: "ضريبة" },
  { icon: Scale, label: "صافي النشاط" },
];

export default function RestaurantFit() {
  return (
    <section className="bg-brand-900 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          أنت ركز على تشغيل مطعمك، ونحن نتابع حساباتك.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <item.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
              </span>
              <span className="text-sm font-bold text-brand-50">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
