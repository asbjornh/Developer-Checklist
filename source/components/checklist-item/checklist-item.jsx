import React from "react";
import PropTypes from "prop-types";

import styles from "./checklist-item.module.scss";

import Emoji from "../emoji";

class ChecklistItem extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {};

  onChange = e => {
    this.setState({ isChecked: e.currentTarget.checked });
    this.props.onChange(e);
  };

  render() {
    return (
      <li className={styles["checklist-item"]}>
        <input
          type="checkbox"
          id={this.props.id}
          onChange={this.onChange}
        />
        <label htmlFor={this.props.id}>
          <span className={styles.emoji}>
            <Emoji size={24} isVisible={this.state.isChecked} />
          </span>
          <span className={styles.text}>{this.props.text}</span>
        </label>
      </li>
    );
  }
}

export default ChecklistItem;
