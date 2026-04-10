/// <reference types="astro/client" />

export {};

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  }
}
