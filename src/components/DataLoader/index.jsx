import React, { useState, useEffect } from 'react';
import { getUsers } from '../../config/getUsers';

function DataLoader() {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers({ page: currentPage, results: 10 })
      .then(data => setData(data.results))
      .catch(error => setError(error))
      .finally(() => setIsFetching(false));
  }, [currentPage]);

  function nextPage() {
    setCurrentPage(prev => prev + 1);
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  return (
    <>
      <ul>
        {data.map((item, index) => (
          <>
            <li key={index}>{`${index} ${JSON.stringify(item)}`}</li>
            <br />
          </>
        ))}
      </ul>
      <button onClick={prevPage}>PREV</button>
      <button onClick={nextPage}>NEXT</button>
    </>
  );
}

export default DataLoader;
