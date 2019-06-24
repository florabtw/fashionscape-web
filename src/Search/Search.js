import React, {useEffect, useState} from 'react';

import config from '../config';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const searchUrl = ({color, item, isByColor, slot }) => {
  color = encodeURIComponent(color);
  item = encodeURIComponent(item);
  slot = slot || '';

  return isByColor
    ? `${config.fashionscapeApi}/colors/${color}?slot=${slot}`
    : `${config.fashionscapeApi}/items/${item}?slot=${slot}`;
};

const Search = () => {
  const [search, setSearch] = useState({slot: null, query: null});
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search.color && !search.item) return;

      const url = searchUrl(search);
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
