import React, {useState} from 'react';
import ReactGA from 'react-ga';
import Select from 'react-select';

import './SearchBox.css';

const slotOptions = [
  {label: 'Ammunition', value: 'Ammunition'},
  {label: 'Body', value: 'Body'},
  {label: 'Cape', value: 'Cape'},
  {label: 'Feet', value: 'Feet'},
  {label: 'Hand', value: 'Hand'},
  {label: 'Head', value: 'Head'},
  {label: 'Leg', value: 'Leg'},
  {label: 'Neck', value: 'Neck'},
  {label: 'Ring', value: 'Ring'},
  {label: 'Shield', value: 'Shield'},
  {label: 'Weapon', value: 'Weapon'},
];

const SearchBox = props => {
  const {setSearch} = props;

  const [query, setQuery] = useState('#3C4C3C');
  const [slot, setSlot] = useState(null);

  const handleChange = event => setQuery(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();

    ReactGA.event({
      category: 'Interaction',
      action: 'Search by Color',
      label: query
    });

    setSearch({slot: slot && slot.value, query});
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
      <Select
        className="select"
        isClearable
        onChange={option => setSlot(option)}
        options={slotOptions}
        placeholder="Any Slot"
        styles={{
          control: provided => ({...provided, height: '3rem'}),
        }}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral20: '#333333',
            neutral30: '#333333',
            neutral40: '#333333',
          },
        })}
        value={slot}
      />
      <input className="input input--submit" type="submit" value="" />
    </form>
  );
};

export default SearchBox;
