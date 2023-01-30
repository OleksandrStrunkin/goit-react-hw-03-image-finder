import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleText = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      alert('Заповніть поле пошуку');
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(this.state.value);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="searchText"
            value={this.state.value}
            onChange={this.handleText}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
