import React, {useEffect, useState} from 'react';

import config from '../config';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const Search = () => {
  const [search, setSearch] = useState({slot: null, query: null});
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search.query) return;

      const slot = search.slot || '';
      const hex = encodeURIComponent(search.query);
      const url = `${config.fashionscapeApi}/colors/${hex}/items?slot=${slot}`;
      const results = await fetch(url).then(res => res.json());

      if (results.items) setResults(results.items);
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
