import type { SchemaTypeDefinition } from "sanity";

import siteSettings from "./siteSettings";
import pricingPlan from "./pricingPlan";
import faq from "./faq";
import post from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, pricingPlan, faq, post],
};
