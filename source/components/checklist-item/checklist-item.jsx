import React from "react";
import PropTypes from "prop-types";

import styles from "./checklist-item.module.scss";

// import { markdown } from "markdown";
import marked from "marked";
import highlight from "highlight.js";

import Emoji from "../emoji";
import Modal from "../modal";
import RoundButton from "../round-button";

class ChecklistItem extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    modalIsVisible: false
  };

  componentDidMount() {
    if (this.props.info) {
      fetch(this.props.info)
        .then(response => {
          return response.text();
        })
        .then(text => {
          marked.setOptions({
            highlight: code => {
              return highlight.highlightAuto(code).value;
            }
          });
          this.setState({ infoText: marked(text) });
          // this.setState({ infoText: markdown.toHTML(text) });
        });
    }
  }

  onChange = e => {
    this.setState({ isChecked: e.currentTarget.checked });
    this.props.onChange(e);
  };

  hideModal = () => {
    this.setState({ modalIsVisible: false });
  };

  showModal = () => {
    this.setState({ modalIsVisible: true });
  };

  render() {
    return (
      <li className={styles["checklist-item"]}>
        <input type="checkbox" id={this.props.id} onChange={this.onChange} />
        <label htmlFor={this.props.id}>
          <span className={styles.emoji}>
            <Emoji size={24} isVisible={this.state.isChecked} />
          </span>
          <span className={styles.text}>{this.props.text}</span>
        </label>

        {this.state.infoText && (
          <RoundButton
            className={styles["help-button"]}
            onClick={this.showModal}
          >
            ?
          </RoundButton>
        )}

        {this.state.infoText && (
          <Modal
            isVisible={this.state.modalIsVisible}
            onCloseButtonClick={this.hideModal}
          >
            <div dangerouslySetInnerHTML={{ __html: this.state.infoText }} />
          </Modal>
        )}
      </li>
    );
  }
}

export default ChecklistItem;
