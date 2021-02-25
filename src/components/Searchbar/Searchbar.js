import React, { Component } from 'react';

import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            placeholder="search for characters"
            value={value}
            onChange={this.handleChange}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}></span>
          </button>
        </form>
      </header>
    );
  }
}
