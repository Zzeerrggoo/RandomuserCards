import React, { useState, useCallback } from 'react';
import { getUsers } from '../../api';
import Loader from 'react-loader-spinner';
import Cards from './Cards';
import Controls from '../Controls';
import styles from './CardsPage.module.scss';
import useData from '../../hooks/useData';

function CardsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const getData = useCallback(
    () => getUsers({ page: currentPage, results: 12 }),
    [currentPage]
  );

  const { error, isFetching, data } = useData(getData);

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
