import React, { useState, useEffect } from 'react';
import { getUsers } from '../../config/getUsers';
import Controls from '../Controls';
import UserCard from '../UserCard';
import styles from './Data.module.scss';

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

  function handleClick({ target: { value } }) {
    value < 1 ? setCurrentPage(1) : setCurrentPage(value);
  }

  return (
    <>
      <ul className={styles.cardsWrapper}>
        {data.map((item, index) => (
          <li key={index} className={styles.dataLi}>
            <UserCard {...item} />
          </li>
        ))}
      </ul>

      <Controls currentIndex={Number(currentPage)} onClick={handleClick} />
    </>
  );
}

export default DataLoader;
