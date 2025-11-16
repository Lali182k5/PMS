import { useState, useEffect, useCallback } from 'react';

// Simulates fetching data with a delay and provides loading/error states.
const useFetchData = (initialData, delay = 1000) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    let timeoutId;
    
    try {
      setIsLoading(true);
      timeoutId = setTimeout(() => {
        setData(initialData);
        setIsLoading(false);
      }, delay);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [initialData, delay]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [fetchData]);

  return { data: data || initialData, isLoading, error };
};

export default useFetchData;
