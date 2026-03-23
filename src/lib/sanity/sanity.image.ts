import { createImageUrlBuilder } from "@sanity/image-url";
import { getSanityClient } from "./sanity.client";

const builder = createImageUrlBuilder(getSanityClient());
export const urlFor = (
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0]
) => builder.image(source);
