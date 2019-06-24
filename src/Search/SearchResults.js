import React from 'react';
import {Link} from 'react-router-dom';

import './SearchResults.css';

const SearchResults = props => {
  const {results, slot} = props;

  if (results.length === 0) return null;

  return (
    <section className="results">
      <ol className="grid">
        {results.map(item => (
          <SearchResult key={item.wiki.pageId} {...item} slot={slot} />
        ))}
      </ol>
    </section>
  );
};

const toUrl = ({color, slot}) => {
  slot = slot ? `?slot=${slot}` : '';
  return `/colors/${encodeURIComponent(color)}${slot}`;
};

const SearchResult = ({colors, match, name, images, wiki, slot}) => {
  return (
    <li className="grid-item">
      <div className="name">{name}</div>
      <a className="image" href={wiki.link}>
        <img alt={name} src={images.detail} />
      </a>
      <div className="colors">
        {colors.map(color => (
          <Link
            className="color"
            key={color}
            to={toUrl({color, slot})}
            style={{backgroundColor: color}}>
            {color}
          </Link>
        ))}
      </div>
    </li>
  );
};

export default SearchResults;
