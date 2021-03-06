import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './Controls.module.scss';
import FirstPageButton from './FirstPageButton';

function Controls(props) {
  const { currentIndex, numOfNeighborButtons } = props;
  const { onClick } = props;

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
      <li key={item}>
        <button
          onClick={onClick}
          value={item}
          className={classNames(styles.controlBtn, {
            [styles.currentBtn]: item === currentIndex,
          })}
        >
          {item}
        </button>
      </li>
    ));
  }

  function getPrevOrNextButton(value, children) {
    return (
      <li>
        <button
          tabIndex="0"
          onClick={onClick}
          value={value}
          className={styles.prevNextBtn}
        >
          {children}
        </button>
      </li>
    );
  }

  return (
    <ul className={styles.dataList}>
      {getPrevOrNextButton(currentIndex - 1, '<')}
      <FirstPageButton
        onClick={onClick}
        currentIndex={currentIndex}
        isOverflowingStartRange={isOverflowingStartRange}
      />
      {getButtons()}
      {getPrevOrNextButton(currentIndex + 1, '>')}
    </ul>
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
