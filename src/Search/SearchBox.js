import React, {useState} from 'react';

import './SearchBox.css';

const SearchBox = props => {
  const {setSearch} = props;

  const [query, setQuery] = useState('#3C4C3C');

  const handleChange = event => setQuery(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    setSearch(query);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="color-picker">
        <label>
          Choose color (# hex)
          <input
            className="input input--text"
            onChange={handleChange}
            type="text"
            value={query}
          />
        </label>
        <input
          className="input input--color"
          onChange={handleChange}
          type="color"
          value={query}
        />
      </div>
      <input className="input input--submit" type="submit" value="" />
    </form>
  );
};

export default SearchBox;
