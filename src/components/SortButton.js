import React from 'react';

export default ({randomizebars=() => {}}) => (
  <button onClick={() => randomizebars()}>Sort</button>
);
