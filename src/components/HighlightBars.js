import React from 'react';

//class HighlightBars extends React.Component {

class HighlightBars extends Component {
  constructor(props){
  super(props);
  }
render() {
  return (
      <button onClick={props.updatebars.bind(null,update.bind(null,bar_list))}>Highlight Bars</button>
  )
}

}

/*
export default ({updatebars=() => {}, bar_list}) => (
  //<button onClick={updatebars.bind(null,bar_list)}>Highlight Bars</button>
  <button onClick={updatebars.bind(null,update.bind(null,bar_list))}>Highlight Bars</button>
//{updatebars.bind(null,update.bind(null,bar_list))
);
*/

function update(bars) {
  for (var i = 0; i < bars.length; i++) {
    bars[i]['color'] = "blue";
    };
  console.log(bars);
  return bars;
};
