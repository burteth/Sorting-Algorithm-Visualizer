import React from 'react';

import Bar from './Bar'

export default ({bar_list}) => (
  <div id='bar_container'>{bar_list.map(({id, len, color}) =>
    <Bar key={id} length={len} color={color}/>
  )}</div>
)
