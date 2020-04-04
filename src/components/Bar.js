import React from 'react';

export default ({length, color}) => (
    <div className='bar' style={{ height: length, backgroundColor: color }}></div>
);
