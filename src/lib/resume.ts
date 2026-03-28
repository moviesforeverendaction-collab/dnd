const RESUME_PREFIX = 'resume:';

function getKey(slug: string, quality: string): string {
  return `${RESUME_PREFIX}${slug}:${quality}`;
}

export function save(slug: string, quality: string, time: number): void {
  if (Math.floor(time) % 5 !== 0) return;
  const key = getKey(slug, quality);
  localStorage.setItem(key, String(time));
}

export function load(slug: string, quality: string): number | null {
  const key = getKey(slug, quality);
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  const time = parseFloat(saved);
  return time > 30 ? time : null;
}

export function clear(slug: string, quality: string): void {
  const key = getKey(slug, quality);
  localStorage.removeItem(key);
}