import React from 'react';

import Header from './Header';
import Search from './Search';
import ReactGA from 'react-ga';

const App = () => {
  ReactGA.pageview('/');

  return (
    <>
      <Header />
      <Search />
    </>
  );
};

export default App;
