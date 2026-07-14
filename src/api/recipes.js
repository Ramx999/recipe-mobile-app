import { useEffect, useState, useCallback } from 'react';

// External API: TheMealDB (free, no API key)
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export function useRecipes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json.meals || []);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}
