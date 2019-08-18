import React from 'react';
import PropTypes from 'prop-types';

import css from './search.module.scss';
import labels from '../../data/labels.json';

class Search extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func
  };

  static defaultProps = {
    onSearch: () => {}
  };

  state = {
    isVisible: false,
    searchTerm: ''
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onChange = () => {
    this.props.onSearch(this.input.value);
  };

  handleKeyDown = e => {
    const key = e.keyCode;

    // Check for a-z and æ, ø and å
    if ((key >= 65 && key <= 90) || key === 222 || key === 186 || key === 219) {
      if (!this.state.searchTerm) {
        this.input.focus();
      }
    } else if (key === 27) {
      this.input.value = '';
      this.setState({ searchTerm: '' });
      this.props.onSearch('');
    }
  };

  render() {
    return (
      <div className={css.search}>
        <input
          onChange={this.onChange}
          placeholder={labels.searchPlaceholder}
          ref={input => (this.input = input)}
        />
      </div>
    );
  }
}

export default Search;
