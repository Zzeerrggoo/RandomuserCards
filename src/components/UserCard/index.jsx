import React, { useState, useEffect } from 'react';
import styles from './UserCard.module.scss';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

function UserCard(props) {
  const { name, email, picture } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }

  function handleError() {
    setIsLoaded(false);
    setError(true);
  }

  useEffect(() => {
    function loadImage() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', error => reject(error));
        img.src = picture.large;
      });
    }
    loadImage().then(handleLoad, handleError);
  }, [picture.large]);

  return (
    <article className={styles.card}>
      <header className={styles.imageWrapper}>
        {!isLoaded && (
          <Loader
            type="Rings"
            color="#00BFFF"
            height={150}
            width={150}
            className={styles.loader}
          />
        )}
        {isLoaded && !error && (
          <img src={picture.large} alt={`${name.first}'s user profile`} />
        )}
      </header>

      <h1>
        {name.first} {name.last}
      </h1>
      <h2>{email}</h2>
    </article>
  );
}

UserCard.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  email: PropTypes.string,
  picture: PropTypes.shape({ large: PropTypes.string }).isRequired,
};

UserCard.defaultProps = {
  name: { first: 'Anonymous', last: 'Anonymous' },
  email: 'anon@example.com',
};

export default UserCard;
