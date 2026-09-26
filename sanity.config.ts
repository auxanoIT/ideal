import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/config";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "ideal-solutions-studio",
  title: "Ideal Solutions",
  basePath: "/sanity",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool({
    structure: (S) => S.list().title("Ideal Solutions Content").items([
      S.documentTypeListItem("post").title("Posts / Blog"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("careerOpening").title("Careers"),
    ]),
  })],
  schema: {
    types: schemaTypes,
  },
});
