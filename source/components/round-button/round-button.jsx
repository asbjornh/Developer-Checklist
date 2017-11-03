import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

import styles from "./round-button.module.scss";

const RoundButton = ({ children, className, onClick }) => (
  <button
    className={cn(styles.button, className)}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default RoundButton;
