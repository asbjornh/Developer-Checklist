import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './round-button.module.scss';

class RoundButton extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  state = {};

  render() {
    return (
      <button
        className={cn(styles.button, this.props.className)}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default RoundButton;
