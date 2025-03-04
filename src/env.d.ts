/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly INSTAGRAM_ACCESS_TOKEN: string;
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    dataLayer: any[];
  }

}

