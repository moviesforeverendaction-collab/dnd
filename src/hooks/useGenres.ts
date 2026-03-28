import { useEffect, useState } from 'react';
import { fetchGenres } from '../lib/api';

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchGenres();
      setGenres(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch genres');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return { genres, loading, error, refetch: fetch };
}