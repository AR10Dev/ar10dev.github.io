/// <reference types="astro/client" />

export {};

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  }

  interface CalApi {
    (...args: unknown[]): void;
    loaded?: boolean;
    ns: Record<string, CalApi>;
    q?: unknown[][];
  }

  interface Window {
    Cal?: CalApi;
    __calEmbedLoaded?: boolean;
  }
}
