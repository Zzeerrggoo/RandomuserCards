import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../Controls.module.scss';

function FirstPageButton(props) {
  const { onClick, currentIndex, isOverflowingStartRange } = props;
  return (
    <>
      <li key="1">
        <button
          onClick={onClick}
          value={1}
          className={classNames(styles.controlBtn, {
            [styles.currentBtn]: 1 === currentIndex,
          })}
        >
          1
        </button>
      </li>

      {isOverflowingStartRange && (
        <li key="...">
          <button
            className={classNames(styles.controlBtn, styles.dottedButton)}
            disabled
          >
            ...
          </button>
        </li>
      )}
    </>
  );
}

FirstPageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isOverflowingStartRange: PropTypes.bool.isRequired,
};

export default FirstPageButton;
