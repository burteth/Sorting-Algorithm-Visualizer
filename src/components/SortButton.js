import React from 'react';

export default ({randomizebars=() => {}}) => (
  <button onClick={() => randomizebars()}>Sort</button>
);

/*
class SortButton extends React.Component {
  render() {
    return <button onClick={() => this.props.randomizebars()}>Sort</button>;
  }
}

*/
