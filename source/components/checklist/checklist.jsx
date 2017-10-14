import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";
import { Collapse } from "react-collapse";

import ChecklistItem from "../checklist-item";
import Emoji from "../emoji";
import labels from "../../data/labels.json";

import styles from "./checklist.module.scss";

const getItemId = (idBase, index) => {
  return idBase + index;
};

const collapseDelay = 700; // Number of milliseconds to wait before collapsing list after all elements have been completed

class Checklist extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    items: PropTypes.array,
    onUpdate: PropTypes.func,
    title: PropTypes.string
  };

  static defaultProps = {
    items: []
  };

  state = {
    isExpanded: false,
    items: this.props.items.map((item, index) => {
      return {
        id: getItemId(this.props.id, index),
        checked: false
      };
    })
  };

  toggleList = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  setFocus = () => {
    this.setState({ hasFocus: true });
  };

  unsetFocus = () => {
    this.setState({ hasFocus: false });
  };

  getLabelText = () => {
    const numberOfCompleted = this.state.items.reduce((accum, item) => {
      return accum + (item.checked ? 1 : 0);
    }, 0);
    const total = this.state.items.length;
    return labels.numberOfCompletedItems
      .replace("{0}", numberOfCompleted)
      .replace("{1}", total);
  };

  onCheckboxChange = e => {
    const { checked, id } = e.currentTarget;
    this.setState(
      state => {
        return state.items.map(item => {
          if (item.id === id) {
            item.checked = checked;
          }
        });
      },
      () => {
        const isCompleted = this.state.items.every(
          item => item.checked === true
        );
        this.setState({ isCompleted });
        this.props.onUpdate({ isCompleted, id: this.props.id });

        setTimeout(() => {
          if (isCompleted) {
            this.button.focus();
            this.setState({ isExpanded: false });
          }
        }, collapseDelay);
      }
    );
  };

  render() {
    return (
      <div
        className={cn(styles.checklist, {
          [styles["is-expanded"]]: this.state.isExpanded,
          [styles["has-focus"]]: this.state.hasFocus,
          [styles["is-completed"]]: this.state.isCompleted
        })}
      >
        <button
          onClick={this.toggleList}
          onFocus={this.setFocus}
          onBlur={this.unsetFocus}
          type="button"
          ref={button => (this.button = button)}
          className={cn({
            [styles["is-expanded"]]: this.state.isExpanded
          })}
        >
          <div className={styles["button-content"]}>
            <span className={styles.emoji}>
              <Emoji isVisible={this.state.isCompleted} size={36} />
            </span>
            <span className={styles.text}>
              <h2>{this.props.title}</h2>
              <p>{this.getLabelText()}</p>
            </span>
          </div>
        </button>

        <Collapse
          isOpened={this.state.isExpanded}
          springConfig={{ stiffness: 200, damping: 25 }}
        >
          <ul>
            {this.props.items.map((item, index) => (
              <ChecklistItem
                id={getItemId(this.props.id, index)}
                key={index}
                onChange={this.onCheckboxChange}
                {...item}
              />
            ))}
          </ul>
        </Collapse>
      </div>
    );
  }
}

Checklist.collapseDelay = collapseDelay;

export default Checklist;
