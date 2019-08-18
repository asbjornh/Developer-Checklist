import React from 'react';
import PropTypes from 'prop-types';

import emoji from 'emoji.json';
import { Motion, spring } from 'react-motion';

import styles from './emoji.module.scss';

const getEmoji = () => {
  let emojis = emoji
    .slice(0, 107) // Remove all the boring ones
    .filter(emoji => emoji.name.indexOf('⊛') === -1) // Filter out weird ones
    .filter(emoji => emoji.char !== '🤥'); // Remove buggy ones

  const index = Math.floor(Math.random() * emojis.length);

  return emojis[index].char;
};

class Emoji extends React.Component {
  state = {
    emoji: getEmoji()
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    size: PropTypes.number
  };

  checkValidEmoji = () => {
    // Unsupported emojis will render as "🤢", which is narrower than a supported one
    if (this.innerEmoji.offsetWidth < this.props.size) {
      this.setState({ emoji: getEmoji() }, () => {
        requestAnimationFrame(() => {
          this.checkValidEmoji();
        });
      });
    }
  };

  componentDidMount() {
    this.checkValidEmoji();
  }

  render() {
    return (
      <Motion
        initialStyle={{ scale: 0 }}
        style={{
          scale: this.props.isVisible
            ? spring(1, { stiffness: 600, damping: 13 })
            : 0
        }}
      >
        {interpolatedStyle => (
          <div
            className={styles.emoji}
            style={{
              fontSize: this.props.size,
              height: this.props.size,
              width: this.props.size,
              transform: `scale(${interpolatedStyle.scale})`
            }}
          >
            <span ref={span => (this.innerEmoji = span)}>
              {this.state.emoji}
            </span>
          </div>
        )}
      </Motion>
    );
  }
}

export default Emoji;
