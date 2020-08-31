import React, { useState, useEffect } from 'react';
import styles from './UserCard.module.scss';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

function UserCard(props) {
  const { name, email, picture } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [img] = useState(new Image());

  function handleLoad() {
    setIsLoaded(true);
  }

  function handleError() {
    setIsLoaded(false);
  }

  useEffect(() => {
    function loadImage() {
      return new Promise((resolve, reject) => {
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', error => reject(error));
        img.src = picture.medium;
      });
    }
    loadImage().then(handleLoad, handleError);
  }, [img, picture.medium]);

  return (
    <article className={styles.card}>
      <header className={styles.imageWrapper}>
        {(isLoaded && <img src={picture.large} alt="User profile" />) || (
          <Loader
            type="Rings"
            color="#00BFFF"
            height={80}
            width={80}
            className={styles.loader}
          />
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
  picture: PropTypes.shape({ medium: PropTypes.string }).isRequired,
};

UserCard.defaultProps = {
  name: { first: 'Anonymous', last: 'Anonymous' },
  email: 'anon@example.com',
};

export default UserCard;
