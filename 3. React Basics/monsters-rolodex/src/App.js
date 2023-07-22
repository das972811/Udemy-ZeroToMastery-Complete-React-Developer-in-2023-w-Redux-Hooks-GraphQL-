import { Component } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( response => response.json() )
      .then( users => this.setState( () => { return {monsters: users}; } ) );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState( () => { return { searchField }; } );
  }

  render() {
    console.log('render from app');
    
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonster = monsters.filter( monster => monster.name.toLowerCase().includes(searchField) );

    return (
      <div className="App">
        <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="Search Monsters" />
        <CardList monsters={filteredMonster} />
      </div>
    );
  }
}

export default App;
