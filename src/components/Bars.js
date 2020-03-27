import React from 'react';

import Bar from './Bar'

export default ({bar_list}) => (
  <div id='bar_container'>{bar_list.map(({id, length, color}) =>
    <Bar key={id} length={length} color={color}/>
  )}</div>
)
