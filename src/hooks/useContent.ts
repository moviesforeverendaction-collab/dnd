import { useState, useEffect } from 'react';
import { fetchContentList, fetchContentDetail, PaginatedContent, Content } from '../lib/api';

export interface UseContentParams {
  page?: number;
  genre?: string;
  type?: 'movie' | 'series';
}

export function useContent(params?: UseContentParams) {
  const [data, setData] = useState<PaginatedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchContentList(
        params?.page ?? 1,
        params?.genre,
        params?.type
      );
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, [params?.page, params?.genre, params?.type]);

  return { data, loading, error, refetch: fetch };
}

export function useContentDetail(slug: string) {
  const [data, setData] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchContentDetail(slug);
      setData(result);
    } catch (e) {
      setError(
        e instanceof Error && (e as any).status === 404
          ? 'Content not found'
          : e instanceof Error
          ? e.message
          : 'Failed to fetch content'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, [slug]);

  return { data, loading, error, refetch: fetch };
}