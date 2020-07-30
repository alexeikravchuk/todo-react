import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    value: '',
  };

  onChange = ({ target: { value } }) => {
    const { onSearch } = this.props;
    this.setState({ value });
    onSearch(value);
  };

  render = () => (
    <input
      type='text'
      className='form-control search-input'
      placeholder='type to search'
      onChange={this.onChange}
    />
  );
}
