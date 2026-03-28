import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchToken } from '../lib/api';

interface UseTokenResult {
  token: string | null;
  loading: boolean;
  error: string | null;
  refreshToken: () => void;
}

const TOKEN_REFRESH_THRESHOLD_SECONDS = 60;
const REFRESH_CHECK_INTERVAL_MS = 30000;

export function useToken(
  slug: string,
  quality: string,
  season?: number,
  episode?: number
): UseTokenResult {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number>(0);

  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const fetchNewToken = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchToken(slug, quality, season, episode);
      setToken(result.token);
      setTokenExpiresAt(Date.now() + result.expires_in * 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch token');
    } finally {
      setLoading(false);
    }
  }, [slug, quality, season, episode]);

  useEffect(() => {
    fetchNewToken();
  }, [fetchNewToken]);

  useEffect(() => {
    if (!tokenExpiresAt) return;

    refreshIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const secondsUntilExpiry = (tokenExpiresAt - now) / 1000;

      if (secondsUntilExpiry <= TOKEN_REFRESH_THRESHOLD_SECONDS) {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
        fetchNewToken();
      }
    }, REFRESH_CHECK_INTERVAL_MS);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [tokenExpiresAt, fetchNewToken]);

  return { token, loading, error, refreshToken: fetchNewToken };
}