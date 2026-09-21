/**
 * هذا المسار يستضيف لوحة إدارة المحتوى (Sanity Studio) على /studio
 * لتسجيل الدخول تحتاج حساب Sanity له صلاحية على مشروع "mizaro".
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
