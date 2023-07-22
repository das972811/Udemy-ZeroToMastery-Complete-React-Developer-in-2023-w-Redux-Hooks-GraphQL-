import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  console.log('render');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( response => response.json() )
      .then( users => setMonsters(users) );
  }, []);

  useEffect(() => {
    const newFilteredMonster = monsters.filter( monster => monster.name.toLowerCase().includes(searchField) );
    setFilterMonsters(newFilteredMonster);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="Search Monsters" />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then( response => response.json() )
//       .then( users => this.setState( () => { return {monsters: users}; } ) );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState( () => { return { searchField }; } );
//   }

//   render() {
//     console.log('render from app');
    
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonster = monsters.filter( monster => monster.name.toLowerCase().includes(searchField) );

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="Search Monsters" />
//         <CardList monsters={filteredMonster} />
//       </div>
//     );
//   }
// }

export default App;
