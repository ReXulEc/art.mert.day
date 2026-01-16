export const prerender = true;

export async function load({ fetch, url }) {
    return { url: url.href }
   }