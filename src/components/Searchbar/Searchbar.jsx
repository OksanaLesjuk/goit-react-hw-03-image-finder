import { Notify } from 'notiflix';
import { Component } from 'react';

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
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputQuery}
              value={this.state.inputQuery}
            />
          </form>
        </header>
      </div>
    );
  }
}
