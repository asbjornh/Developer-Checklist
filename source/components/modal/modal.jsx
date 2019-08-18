import React from 'react';
import PropTypes from 'prop-types';

import css from './modal.module.scss';

import Portal from 'react-portal';
import { TransitionMotion, spring } from 'react-motion';

import RoundButton from '../round-button';
import TabTrapper from '../tab-trapper';
import utils from '../../js/utils';

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    isVisible: PropTypes.bool,
    onCloseButtonClick: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible && !this.props.isVisible) {
      requestAnimationFrame(() => {
        this.wrapper.focus();
      });
    }
  }

  onKeyDown = e => {
    e.stopPropagation();

    if (e.keyCode === 27) {
      this.props.onCloseButtonClick();
    }
  };

  render() {
    const springConf = { stiffness: 200, damping: 15 };
    const element = this.props.isVisible
      ? [
          {
            key: '1',
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
            <TabTrapper isActive={this.props.isVisible}>
              <div
                onKeyDown={this.onKeyDown}
                ref={div => (this.wrapper = div)}
                tabIndex={-1}
              >
                {interpolatedStyles.map(({ key, style }) => (
                  <div
                    className={css['modal-wrapper']}
                    key={key}
                    style={{ opacity: style.opacity }}
                  >
                    <div
                      className={css.modal}
                      style={{
                        transform: utils.transform({ scale: style.scale })
                      }}
                    >
                      {this.props.children}
                      <RoundButton
                        className={css['close-button']}
                        onClick={this.props.onCloseButtonClick}
                      >
                        <span className={css['close-button-x']}>×</span>
                      </RoundButton>
                    </div>
                    <div
                      className={css['modal-background']}
                      onClick={this.props.onCloseButtonClick}
                    />
                  </div>
                ))}
              </div>
            </TabTrapper>
          )}
        </TransitionMotion>
      </Portal>
    );
  }
}

export default Modal;
