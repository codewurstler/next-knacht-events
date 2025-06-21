import {client} from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const {projectId, dataset} = client.config();
const builder = imageUrlBuilder({projectId, dataset});

export async function getAllEvents() {
    const ALLEVENTS_QUERY = `*[_type == "event"]`;
    return await client.fetch(ALLEVENTS_QUERY);
}

export async function getEventBySlug(slug) {
    const SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]`;
    return await client.fetch(SLUG_QUERY, {slug});
}

export async function getUpcomingEvents(slug) {
    const UPCOMING_QUERY = `  *[_type == "event" && startDateTime > now()] 
  | order(startDateTime asc)[0...5] {
    _id,
    title,
    startDateTime,
    endDateTime,
    "slug": slug.current,
    image,
    showEnd,
    body
}`;
    return await client.fetch(UPCOMING_QUERY);
}

export function getEventImageUrl(image, width = 550, height = 310) {
    return image ? builder.image(image).width(width).height(height).url() : null;
}