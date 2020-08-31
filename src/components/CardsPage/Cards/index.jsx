import React from 'react';
import UserCard from '../../UserCard';
import PropTypes from 'prop-types';
import styles from './Cards.module.scss';

function Cards(props) {
  const { data } = props;

  return (
    <>
      <ul className={styles.cardsWrapper}>
        {data.map((item, index) => (
          <li key={index} className={styles.dataLi}>
            <UserCard {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}

Cards.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};

export default Cards;
