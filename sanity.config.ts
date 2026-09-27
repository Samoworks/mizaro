"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";

import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure, defaultDocumentNode } from "./src/sanity/structure";
import { mizaroStudioTheme } from "./src/sanity/studio/theme";

export default defineConfig({
  basePath: "/studio",
  title: "لوحة تحكم مِزارو",
  projectId,
  dataset,
  schema,
  theme: mizaroStudioTheme,
  plugins: [structureTool({ structure, defaultDocumentNode }), colorInput(), media()],
});
