"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";

import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "لوحة تحكم مِزارو",
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure }), colorInput()],
});
