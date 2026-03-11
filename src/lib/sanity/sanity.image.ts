import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0]
) => builder.image(source);
