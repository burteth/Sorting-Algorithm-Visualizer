import React from "react";
//import uuid from "uuid";
import Bars from "./Bars";

import selectionsort from "./SelectionSort"

const num_bars = 100;
const min_bar = 10;
const max_bar = 100;
const color1 = '#007bff';
const speed_max = 100;

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
    this.setState({
      bar_list: GenerateBars(num_bars, min_bar, max_bar)
    });
  }
  stopCurrentSort = () => {


  }

  render() {
    const {bar_list} = this.state;

    return (<div>
      <div id="UI_container">
        <div id="button_container">
          <button className="btn btn-primary" onClick={() => this.randomizebars()}>Randomize</button>
          <button className="btn btn-primary" onClick={() => this.updatebars(selectionsort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Selection Sort</button>
          <button className="btn btn-primary">Merge Sort</button>
          <button className="btn btn-primary">Quick Sort</button>
          <button className="btn btn-primary">Heap Sort</button>
          <button className="btn btn-primary">Bubble Sort</button>
        </div>
        <div className="bars_and_data">
          <div className="data_viz">
            <div>
              <div className="data_header">Number of compairsons:
                <div id="compairsons">0</div>
              </div>
            </div>
            <div>
              <div className="data_header">Number of swaps:
                <div id="swaps">0</div>
              </div>
            </div>
            <div>
              <div className="data_header">Total Number of operations:
                <div id="total_ops">0</div>
              </div>
            </div>
            <label htmlFor="numberange">Number of Bars</label>
            <input type="range" className="custom-range" id="numberange"></input>

            <label htmlFor="speedrange">Sorting Speed</label>
            <input type="range" className="custom-range" id="speedrange" value='99'></input>
          <button className="btn btn-primary">Stop</button>
          </div>
          <Bars bar_list={bar_list}/>
        </div>
      </div>
    </div>);
  }
  updatebars = (updated_bars) => {

    var bar_docs = document.getElementsByClassName("bar");
    var counter = 0;
    var k = 0;
    var animations = updated_bars[1]

    var started = false;

    var temp;
    var temporary_color = [0, 0]

    var num_compairsons = 0;
    var num_swaps = 0;

    //linear
    var speed = Math.abs((((-1*(document.getElementById("speedrange").value))*speed_max/100.0) + speed_max));
    while (counter < animations.length) {

      var timer = setTimeout(() => {
        if (started) {
          bar_docs[animations[k - 1][0]].style.backgroundColor = temporary_color[0];
          bar_docs[animations[k - 1][1]].style.backgroundColor = temporary_color[1];
        } else {
          started = true;
        }

        if (animations[k][2] === 0) {

          temporary_color[0] = bar_docs[animations[k][0]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][1]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = 'red';
          bar_docs[animations[k][1]].style.backgroundColor = 'red';

          num_compairsons += 1;
          document.getElementById('compairsons').innerText = num_compairsons;

        } else if (animations[k][2] === 1) {

          temp = bar_docs[animations[k][0]].style.height;
          bar_docs[animations[k][0]].style.height = bar_docs[animations[k][1]].style.height;
          bar_docs[animations[k][1]].style.height = temp;
          temporary_color[0] = bar_docs[animations[k][1]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][0]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = 'red';
          bar_docs[animations[k][1]].style.backgroundColor = 'red';

          num_swaps += 1;
          document.getElementById('swaps').innerText = num_swaps;

        } else {

          temp = bar_docs[animations[k][0]].style.height;
          bar_docs[animations[k][0]].style.height = bar_docs[animations[k][1]].style.height;
          bar_docs[animations[k][1]].style.height = temp;
          this.setState({bar_list: updated_bars[0]});
        }

        document.getElementById('total_ops').innerText = num_swaps + num_compairsons;

        k++;

      }, counter * speed);
      counter++;
    };

  }
}

//Helper Functions

function GenerateBars(len, min, max) {
  var lst = [];
  for (var i = 0; i < len; i++) {
    var random = getRandomInt(min, max);
    lst.push({
      id: i,
      len: random,
      color: colorpernum(min, max, random)
    });
    colorpernum(min, max, random);
  }

  return lst;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function colorpernum(min, max, number) {
  var place = Math.floor(255 * (number - min) / (max - min));
  var color = "rgb(" + 0 + "," + Math.floor(place * 123 / 255) + "," + place + ")";
  return color;
}

/*
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
*/
