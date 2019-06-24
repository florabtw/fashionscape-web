import React, {useState} from 'react';
import ReactGA from 'react-ga';
import Select from 'react-select';

import ColorPicker from './ColorPicker';
import ItemPicker from './ItemPicker';

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

  const [color, setColor] = useState('#3C4C3C');
  const [isByColor, setIsByColor] = useState(true);
  const [item, setItem] = useState(null);
  const [slot, setSlot] = useState(null);

  const toggleByColor = e => {
    e.preventDefault();
    setIsByColor(!isByColor);
  };

  const handleSubmit = event => {
    event.preventDefault();

    ReactGA.event({
      category: 'Interaction',
      action: 'Search',
      label: isByColor ? color : item.value,
    });

    setSearch({
      color,
      isByColor,
      item: item && item.value,
      slot: slot && slot.value,
    });
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__row">
        <button className="input input--square toggle" onClick={toggleByColor}>
          {isByColor ? 'By item' : 'By color'}
        </button>
        {isByColor ? (
          <ColorPicker onChange={setColor} value={color} />
        ) : (
          <ItemPicker onChange={setItem} value={item} />
        )}
      </div>
      <Select
        className="select"
        isClearable
        onChange={option => setSlot(option)}
        options={slotOptions}
        placeholder="Any Slot"
        styles={{
          control: provided => ({
            ...provided,
            cursor: 'pointer',
            height: '3rem',
          }),
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
