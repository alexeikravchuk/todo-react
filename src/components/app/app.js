import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all', // all, active, done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => item.id !== id) }));
  };

  addItem = (text) => {
    if (!text) return;
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }));
  };

  toggleProperty(arr, id, propName) {
    return arr.map((item) => (item.id === id ? { ...item, [propName]: !item[propName] } : item));
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'important'),
    }));
  };
  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  search(todoData, term) {
    return todoData.filter(({ label }) => label.toLowerCase().includes(term.toLowerCase()));
  }

  filter(todoData, filter) {
    switch (filter) {
      case 'all':
        return todoData;
      case 'done':
        return todoData.filter(({ done }) => done);
      case 'active':
        return todoData.filter(({ done }) => !done);
      default:
        return todoData;
    }
  }

  addTerm = (term) => {
    this.setState({ term });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(({ done }) => done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearch={this.addTerm} />
          <ItemStatusFilter onChangeFilter={this.changeFilter} filter={filter} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
