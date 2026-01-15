export const prerender = true;

import { photos } from '$lib/data/photos';

export function entries() {
  return photos.map((photo) => ({
    slug: photo.slug
  }));
}
