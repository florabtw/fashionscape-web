import React from 'react';

import './SearchResults.css';

const SearchResults = props => {
  const {results} = props;

  if (results.length === 0) return null;

  return (
    <section className="results">
      <ol className="grid">
        {results.map(item => (
          <SearchResult key={item.wiki.pageId} {...item} />
        ))}
      </ol>
    </section>
  );
};

const SearchResult = ({colors, name, images, wiki}) => {
  return (
    <li className="grid-item">
      <div className="name">{name}</div>
      <a className="image" href={wiki.link}>
        <img alt={name} src={images.detail} />
      </a>
      <div className="colors">
        {colors.map(color => (
          <div
            className="color"
            key={color}
            style={{backgroundColor: color}}>
            {color}
          </div>
        ))}
      </div>
    </li>
  );
};

export default SearchResults;
