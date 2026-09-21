import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * عميل Sanity للقراءة العامة (بدون توكن) — يُستخدم لجلب المحتوى المعروض
 * في الموقع. useCdn=true لأداء أسرع؛ إن احتجنا بيانات لحظية بعد التعديل
 * مباشرة نستخدم client.withConfig({ useCdn: false }) في مكان الاستخدام.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
