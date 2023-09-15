import { Notify } from 'notiflix';
import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    inputQuery: '',
  };

  handleInputQuery = e => {
    this.setState({ inputQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputQuery.trim() === '') {
      Notify.info('Enter your request');
      return;
    }
    this.props.onSubmit(this.state.inputQuery.trim());
    this.setState({ inputQuery: '' });
  };

  render() {
    return (
      <div>
        <SearchbarHeader>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputQuery}
              value={this.state.inputQuery}
            />
          </SearchForm>
        </SearchbarHeader>
      </div>
    );
  }
}
