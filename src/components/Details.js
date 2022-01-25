import React from 'react';
import Header from './Header/Header';

function Details({ isDark, setIsDark }) {
  return <div>
    <Header
      list={[]}
      isDark={isDark}
      setIsDark={setIsDark}
    />
    <h1>Details</h1>
  </div>;
}

export default Details;
