import { useEffect, useState } from 'react';

import API_URLS from '../config';
import { Currency } from '../types';

const useFetchCurrencies = () => {
  const [data, setData] = useState<Record<string, Currency>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URLS.CURRENCIES);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URLS.CURRENCIES]);

  return { data, loading };
};

export default useFetchCurrencies;
