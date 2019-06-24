import React, {useEffect, useState} from 'react';
import ReactGA from 'react-ga';
import queryString from 'query-string';

import config from '../config';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const searchUrl = ({color, item, isByColor, slot}) => {
  color = encodeURIComponent(color);
  item = encodeURIComponent(item);
  slot = slot || '';

  return isByColor
    ? `${config.fashionscapeApi}/colors/${color}?slot=${slot}`
    : `${config.fashionscapeApi}/items/${item}?slot=${slot}`;
};

const decodeOrElse = (param, els) =>
  (param && decodeURIComponent(param)) || els;

const Search = props => {
  const {location, match} = props;

  const color = decodeOrElse(match.params.color, '#3C4C3C');
  const isByColor = !/\/items/.test(location.pathname);
  const item = decodeOrElse(match.params.item, 'Gnome scarf');
  const slot = queryString.parse(location.search).slot;

  const [results, setResults] = useState([]);

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!color && !item) return;

      const url = searchUrl({color, isByColor, item, slot});
      const results = await fetch(url).then(res => res.json());

      if (results.items) setResults(results.items);
    };

    fetchResults();
  }, [color, isByColor, item, slot]);

  return (
    <div>
      <SearchBox color={color} isByColor={isByColor} item={item} slot={slot} />
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
