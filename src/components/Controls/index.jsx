import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
        <button onClick={onClick} value={item}>
          {item}
        </button>
      </li>
    ));
  }

  return (
    <>
      <button onClick={onClick} value={currentIndex - 1}>
        {'<'}
      </button>

      <ul>
        <li key="1">
          <button onClick={onClick} value={1}>
            1
          </button>
        </li>

        {isOverflowingStartRange && (
          <li key="...">
            <button>...</button>
          </li>
        )}

        {getButtons()}
      </ul>

      <button onClick={onClick} value={currentIndex + 1}>
        {'>'}
      </button>
    </>
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
