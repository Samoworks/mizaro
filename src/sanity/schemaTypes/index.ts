import type { SchemaTypeDefinition } from "sanity";

import siteSettings from "./siteSettings";
import pricingPlan from "./pricingPlan";
import ecommercePackage from "./ecommercePackage";
import faq from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, pricingPlan, ecommercePackage, faq],
};
