import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Link, withRouter} from 'react-router-dom';

import ColorPicker from './ColorPicker';
import ItemPicker from './ItemPicker';
import {searchFromRoute} from './Search';

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

const toOption = value => value && {label: value, value};
const toUrl = ({color, isByColor, item, slot}) => {
  const slotQuery = slot ? `?slot=${slot.value}` : '';

  return isByColor
    ? `/colors/${encodeURIComponent(color)}${slotQuery}`
    : `/items/${encodeURIComponent(item)}${slotQuery}`;
};

const SearchBox = props => {
  const {history, location, match} = props;

  const {
    color: defaultColor,
    isByColor: defaultIsByColor,
    item: defaultItem,
    slot: defaultSlot,
  } = searchFromRoute({location, match});

  const [color, setColor] = useState(defaultColor);
  const [item, setItem] = useState(defaultItem);
  const [slot, setSlot] = useState(toOption(defaultSlot));
  const [isByColor, setIsByColor] = useState(defaultIsByColor);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    const search = searchFromRoute({location, match});

    setColor(search.color);
    setIsByColor(search.isByColor);
    setItem(search.item);
    setSlot(toOption(search.slot));
  }, [shouldUpdate, location, match]);

  useEffect(() => history.listen(() => setShouldUpdate(true)));

  const handleToggle = () => setIsByColor(!isByColor);

  return (
    <div className="search">
      <div className="search__row">
        <button className="input input--square toggle" onClick={handleToggle}>
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
      <Link
        to={toUrl({color, isByColor, item, slot})}
        className="input input--submit"
      />
    </div>
  );
};

export default withRouter(SearchBox);
