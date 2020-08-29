import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './Controls.module.scss';

function Controls(props) {
  const { currentIndex, numOfNeighborButtons } = props;
  const { onClick } = props;

  function getFirstPage() {
    return (
      <>
        <li
          key="1"
          className={classNames(styles.controlBtn, {
            [styles.currentBtn]: 1 === currentIndex,
          })}
        >
          <button onClick={onClick} value={1}>
            1
          </button>
        </li>

        {isOverflowingStartRange && (
          <li key="..." className={styles.dottedButton}>
            <button>...</button>
          </li>
        )}
      </>
    );
  }

  const isOverflowingStartRange =
    currentIndex - numOfNeighborButtons > numOfNeighborButtons + 1;

  function getRange() {
    if (!isOverflowingStartRange) {
      return _.range(2, numOfNeighborButtons * 2 + 3);
    }

    return _.range(
      currentIndex - numOfNeighborButtons,
      currentIndex + numOfNeighborButtons + 1
    );
  }

  function getButtons() {
    return getRange().map(item => (
      <li
        key={item}
        className={classNames(styles.controlBtn, {
          [styles.currentBtn]: item === currentIndex,
        })}
      >
        <button onClick={onClick} value={item}>
          {item}
        </button>
      </li>
    ));
  }

  return (
    <div className={styles.dataWrapper}>
      <button onClick={onClick} value={currentIndex - 1}>
        {'<'}
      </button>

      <ul className={styles.dataList}>
        {getFirstPage()}
        {getButtons()}
      </ul>

      <button onClick={onClick} value={currentIndex + 1}>
        {'>'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  numOfNeighborButtons: PropTypes.number,
};

Controls.defaultProps = {
  numOfNeighborButtons: 2,
};

export default Controls;
