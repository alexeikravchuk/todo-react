import React, { Component } from 'react';
import './item-add-form.scss';

export default class ItemAddForm extends Component {
  state = {
    value: '',
  };

  onLabelChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onItemAdded } = this.props;
    const { value } = this.state;
    onItemAdded(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <form className='item-add-form d-flex' onSubmit={this.onSubmit}>
        <input
          type='text'
          className='form-control'
          onChange={this.onLabelChange}
          placeholder='What need to be done'
          value={value}
        />
        <button className='btn btn-outline-secondary'>Add Item</button>
      </form>
    );
  }
}
