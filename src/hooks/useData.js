import { useEffect, useState } from 'react';

function useData(getData) {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    getData()
      .then(data => setData(data.results))
      .catch(error => setError(error))
      .finally(() => setIsFetching(false));
  }, [getData]);

  return { error, isFetching, data };
}

export default useData;
