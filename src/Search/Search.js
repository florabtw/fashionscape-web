import React, {useEffect, useState} from 'react';

import config from '../config';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

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

export default Search;
