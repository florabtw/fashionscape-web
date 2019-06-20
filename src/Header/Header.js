import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">
        <a href="https://scape.fashion">scape.fashion</a>
      </h1>
      <p className="subtitle">
        A fashionscape tool for Old School Runescape{' '}
        <img
          alt="gnome scarf"
          src="https://oldschool.runescape.wiki/images/3/3a/Gnome_scarf.png?2d77d"
        />
      </p>
    </div>
  );
};

export default Header;
