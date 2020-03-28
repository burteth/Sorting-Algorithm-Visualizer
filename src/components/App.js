import React from "react";
import uuid from "uuid";
import Bars from "./Bars";
import SortButton from "./SortButton"


const num_bars = 125;
const min_bar = 10;
const max_bar = 500;
const color1 = '#6A4A93';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bar_list: []
    };
}

componentDidMount() {
  this.randomizebars();
}

  randomizebars = () => {
    this.setState({bar_list: GenerateBars(num_bars,min_bar,max_bar)});
  }

  updatebars = (updated_bars) => {
    console.log("update bars");
    //this.setState({bar_list: updated_bars});
  }

  render() {
    const { bar_list } = this.state;

    return (
      <div>
        <div id="UI_container">
          <div id="button_container">
            <SortButton randomizebars={() => this.randomizebars()} />
          </div>
            <Bars bar_list={bar_list} />
        </div>
      </div>
    );
  }
}//////<HighlightBars bar_list={bar_list} updatebars={this.updatebars}/>

function GenerateBars(len, min, max) {
  var lst = [];
  for (var i = 0; i < len; i++) {
    lst.push({id: uuid.v4(),length: getRandomInt(min, max),color: color1});
  }

  return lst;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
