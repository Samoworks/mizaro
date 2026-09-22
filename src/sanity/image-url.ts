import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/** يبني رابط صورة قابل للاستخدام من مرجع صورة Sanity، أو null إن ما فيه صورة */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source);
}
