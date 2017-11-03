import React from "react";
import PropTypes from "prop-types";

import css from "./modal.module.scss";

import Portal from "react-portal";
import { TransitionMotion, spring } from "react-motion";

import utils from "../../js/utils";
import RoundButton from "../round-button";

const Modal = ({ children, isVisible, onCloseButtonClick }) => {
  const springConf = { stiffness: 200, damping: 15 };
  const element = isVisible
    ? [
        {
          key: "1",
          style: {
            opacity: spring(1, springConf),
            scale: spring(1, springConf)
          }
        }
      ]
    : [];
  return (
    <Portal isOpened={true}>
      <TransitionMotion
        willEnter={() => ({ opacity: 0, scale: 0.8 })}
        willLeave={() => ({
          opacity: spring(0, springConf),
          scale: spring(0.8, springConf)
        })}
        styles={element}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(({ key, style }) => (
              <div
                className={css["modal-wrapper"]}
                key={key}
                style={{ opacity: style.opacity }}
              >
                <div
                  className={css.modal}
                  style={{
                    transform: utils.transform({ scale: style.scale })
                  }}
                >
                  {children}
                  <RoundButton
                    className={css["close-button"]}
                    onClick={onCloseButtonClick}
                  >
                    <span className={css["close-button-x"]}>×</span>
                  </RoundButton>
                </div>
                <div
                  className={css["modal-background"]}
                  onClick={onCloseButtonClick}
                />
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isVisible: PropTypes.bool,
  onCloseButtonClick: PropTypes.func
};

export default Modal;
