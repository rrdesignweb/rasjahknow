/** Contentful asset `file.url` → absolute AVIF URL for `<img src>`. */
export function contentfulAssetUrl(url: string | undefined | null): string {
  if (!url) return "";
  const absolute = url.startsWith("//") ? `https:${url}` : url;
  return `${absolute}?fm=avif`;
}
