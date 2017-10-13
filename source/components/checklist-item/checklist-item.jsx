import React from "react";
import PropTypes from "prop-types";

import styles from "./checklist-item.module.scss";

class ChecklistItem extends React.Component {
  static propTypes = {
    emoji: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    return (
      <li className={styles["checklist-item"]}>
        <input
          type="checkbox"
          id={this.props.id}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.id}>
          <span className={styles.emoji}>{this.props.emoji}</span>
          <span className={styles.text}>{this.props.text}</span>
        </label>
      </li>
    );
  }
}

export default ChecklistItem;
