import React, { useState, useEffect } from 'react';
import { getData } from '../../config';
import Loader from 'react-loader-spinner';
import Cards from './Cards';
import Controls from '../Controls';
import styles from './CardsPage.module.scss';

function CardsPage() {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData({ page: currentPage, results: 12 })
      .then(data => setData(data.results))
      .catch(error => setError(error))
      .finally(() => setIsFetching(false));
  }, [currentPage]);

  function handleClick({ target: { value } }) {
    value < 1 ? setCurrentPage(1) : setCurrentPage(value);
  }

  return (
    <>
      {isFetching && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={300}
          width={300}
          className={styles.loader}
        />
      )}

      {error && <h1 className={styles.error}>Oops, something went wrong</h1>}

      {!isFetching && !error && (
        <>
          <Cards data={data} />
          <Controls currentIndex={Number(currentPage)} onClick={handleClick} />
        </>
      )}
    </>
  );
}

export default CardsPage;
