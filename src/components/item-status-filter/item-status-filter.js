import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onChangeFilter } = this.props;

    return (
      <div className='btn-group'>
        {this.buttons.map(({ name, label }) => (
          <button
            type='button'
            key={name}
            className={`btn ${name === filter ? 'btn-info' : 'btn-outline-secondary'}`}
            onClick={() => onChangeFilter(name)}>
            {label}
          </button>
        ))}
      </div>
    );
  }
}
