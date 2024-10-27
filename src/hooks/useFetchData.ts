import { useState, useEffect } from 'react';

type UseFetchDataResult<T> = {
  data: T;
  loading: boolean;
};

export function useFetchData<T>(url: string): UseFetchDataResult<T> {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
      } catch (err: any) {
        console.error(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
}
