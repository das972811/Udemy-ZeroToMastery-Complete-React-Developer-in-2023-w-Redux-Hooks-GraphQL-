import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };

    console.log('constructor');
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( response => response.json() )
      .then( users => this.setState( () => { return {monsters: users} }, () => console.log(this.state) ));
      console.log('componentDidMount');
  }

  render() {
    console.log('render');

    const filteredMonster = this.state.monsters.filter( monster => monster.name.toLowerCase().includes(this.state.searchField) );

    return (
      <div className="App">
        <input
          type='search'
          placeholder='search monsters'
          onChange={
            (event) => {
              const searchField = event.target.value.toLowerCase();
              this.setState(() => { return { searchField }; });
            } 
          }
        />
        {
          filteredMonster.map(monster => {
            return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;
