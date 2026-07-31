/**
 * Analytics adapter — Plausible/GA/custom without hard lock-in.
 */

export type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean | undefined>;
};

type Provider = {
  track: (event: AnalyticsEvent) => void;
  pageview: (path: string) => void;
};

function consoleProvider(): Provider {
  return {
    track: (event) => {
      if (process.env.NODE_ENV === "development") {
        console.info("[analytics:track]", event);
      }
    },
    pageview: (path) => {
      if (process.env.NODE_ENV === "development") {
        console.info("[analytics:pageview]", path);
      }
    },
  };
}

function plausibleProvider(domain: string): Provider {
  return {
    track: (event) => {
      if (typeof window === "undefined") return;
      const plausible = (
        window as Window & {
          plausible?: (n: string, o?: { props?: AnalyticsEvent["props"] }) => void;
        }
      ).plausible;
      plausible?.(event.name, { props: event.props });
    },
    pageview: () => {
      /* Plausible auto pageviews */
      void domain;
    },
  };
}

let provider: Provider | null = null;

export function getAnalytics(): Provider {
  if (provider) return provider;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  provider = plausibleDomain
    ? plausibleProvider(plausibleDomain)
    : consoleProvider();
  return provider;
}

export function track(event: AnalyticsEvent) {
  getAnalytics().track(event);
}

export function pageview(path: string) {
  getAnalytics().pageview(path);
}
