import * as React from "react";

/** Matches flagcdn.com image URLs and captures the ISO code (e.g. "fr", "gb-eng"). */
const FLAGCDN_URL = /flagcdn\.com\/(?:w\d+\/)?([a-z]{2}(?:-[a-z]+)?)\.(?:svg|png)/i;

/** Real flag shipped with the app (public/flags), so it works offline and needs no CDN. */
export function localFlagUrl(code: string): string {
  return `/flags/${code.toLowerCase()}.svg`;
}

/**
 * Ordered list of image URLs to try for a flag: the bundled local flag first,
 * then the remote URL supplied by the data source.
 */
export function flagCandidates(src?: string, countryCode?: string): string[] {
  const fromUrl = src ? FLAGCDN_URL.exec(src)?.[1] : undefined;
  // The code inside the flag URL is authoritative; a passed-in code is only a hint.
  const code = fromUrl ?? (countryCode && /^[a-z]{2}$/i.test(countryCode) ? countryCode : undefined);
  const list: string[] = [];
  if (code && /^[a-z]{2}$/i.test(code)) list.push(localFlagUrl(code));
  if (src) list.push(src);
  else if (code) list.push(`https://flagcdn.com/w320/${code.toLowerCase()}.png`);
  return Array.from(new Set(list));
}

/**
 * Picks the first working flag URL. Call `onError` from the <img> error handler to
 * move on to the next candidate; `failed` is true once every candidate has failed.
 */
export function useFlagSource(src?: string, countryCode?: string) {
  const candidates = React.useMemo(() => flagCandidates(src, countryCode), [src, countryCode]);
  const key = candidates.join("|");
  const [state, setState] = React.useState({ key, attempt: 0 });
  const attempt = state.key === key ? state.attempt : 0;
  const onError = React.useCallback(() => setState({ key, attempt: attempt + 1 }), [key, attempt]);
  return {
    src: candidates[attempt] ?? "",
    failed: attempt >= candidates.length,
    onError,
  };
}
