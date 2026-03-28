import { ApiError, PaginatedContent, Content, StreamToken } from './types';

export type { ApiError, PaginatedContent, Content, StreamToken };

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown error');
    throw new ApiError(response.status, text || response.statusText);
  }

  return response.json() as Promise<T>;
}

export async function fetchContentList(
  page: number = 1,
  genre?: string,
  type?: 'movie' | 'series'
): Promise<PaginatedContent> {
  const params = new URLSearchParams({ page: String(page) });
  if (genre) params.set('genre', genre);
  if (type) params.set('type', type);
  return apiFetch<PaginatedContent>(`/api/content?${params.toString()}`);
}

export async function fetchContentDetail(slug: string): Promise<Content> {
  return apiFetch<Content>(`/api/content/${slug}`);
}

export async function fetchToken(
  slug: string,
  quality: string,
  season?: number,
  episode?: number
): Promise<StreamToken> {
  const params = new URLSearchParams({ quality });
  if (season !== undefined) params.set('season', String(season));
  if (episode !== undefined) params.set('episode', String(episode));
  return apiFetch<StreamToken>(`/api/content/${slug}/token?${params.toString()}`);
}

export async function searchContent(
  query: string,
  genre?: string,
  type?: 'movie' | 'series'
): Promise<Content[]> {
  const params = new URLSearchParams({ q: query });
  if (genre) params.set('genre', genre);
  if (type) params.set('type', type);
  return apiFetch<Content[]>(`/api/search?${params.toString()}`);
}

export async function fetchGenres(): Promise<string[]> {
  return apiFetch<string[]>('/api/genres');
}

export async function checkHealth(): Promise<{ status: string }> {
  return apiFetch<{ status: string }>('/health');
}