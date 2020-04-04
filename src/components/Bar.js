import React from 'react';

export default ({length, color}) => (
    <div className='bar' style={{ height: length * 7, backgroundColor: color }}></div>
);
