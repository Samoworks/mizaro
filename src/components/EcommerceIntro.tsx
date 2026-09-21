import {
  Rocket,
  Wrench,
  Megaphone,
  Search,
  UserCheck,
  Link2,
  type LucideIcon,
} from "lucide-react";
import DomainIntro from "@/components/DomainIntro";

type Audience = {
  icon: LucideIcon;
  label: string;
};

const audiences: Audience[] = [
  { icon: Rocket, label: "أصحاب المتاجر الإلكترونية" },
  { icon: Wrench, label: "أصحاب المشاريع الجديدة" },
  { icon: Search, label: "المتاجر التي تحتاج تحسين" },
  { icon: Megaphone, label: "المتاجر التي لديها مشاكل في التسويق" },
  { icon: UserCheck, label: "المتاجر التي تريد تحسين تجربة العميل" },
  { icon: Link2, label: "من يريد ربط أدوات التسويق والتتبع والكتالوجات" },
];

export default function EcommerceIntro() {
  return (
    <div id="ecommerce">
      <DomainIntro
        icon={Rocket}
        eyebrow="التجارة الإلكترونية"
        title="كل ما يحتاجه متجرك للنمو"
        description="خبرة عملية في تشغيل وتطوير المتاجر الإلكترونية — من تجهيز المتجر وتحسين المنتجات، إلى الإعلانات والتتبع وتحسين تجربة العميل. هذا القسم مستقل تمامًا عن خدمات المحاسبة."
        variant="ecommerce"
      />

      <div className="mx-auto mt-12 max-w-5xl px-4 pb-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.label}
              className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-right"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <audience.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="text-sm font-bold text-brand-900">
                {audience.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

