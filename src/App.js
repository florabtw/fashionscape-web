import React, {useEffect, useState} from 'react';
import config from './config';

import './App.css';

const App = () => {
  return [<Logo />, <Search />];
};

const Logo = () => {
  return (
    <h1>
      <a href="https://scape.fashion">scape.fashion</a>
    </h1>
  );
};

const Search = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search) return;

      const hex = encodeURIComponent(search);
      const url = `${config.fashionscapeApi}/colors/${hex}/items`;
      const results = await fetch(url).then(res => res.json());

      setResults(results.items);
    };

    fetchResults();
  }, [search]);

  return (
    <div>
      <SearchBox setSearch={setSearch} />
      <SearchResults results={results} />
    </div>
  );
};

const SearchBox = props => {
  const {setSearch} = props;

  const [query, setQuery] = useState('#3C4C3C');

  const handleChange = event => setQuery(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    setSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} />
      <input type="submit" />
    </form>
  );
};

const SearchResults = props => {
  const {results} = props;
  console.log(results);

  return (
    <div>
      <ul>
        {results.map(item => (
          <SearchResult {...item} />
        ))}
      </ul>
    </div>
  );
};

const SearchResult = ({colors, name, images}) => {
  return (
    <li>
      <span>{name}</span>
      <img width="30" src={images.detail} />
    </li>
  );
};

export default App;
