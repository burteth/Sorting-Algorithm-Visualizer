import React from "react";
import Bars from "./Bars";

import mergesort from "./MergeSort"
import selectionsort from "./SelectionSort"
import bubblesort from "./BubbleSort"

var num_bars = 200;
const min_bar = 10;
const max_bar = 600;
//const color1 = '#007bff'; (0, 123, 255)
const speed_max = 50;
const highlight_color = "red";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bar_list: GenerateBars(num_bars, min_bar, max_bar)
    };

  }

  componentDidMount() {

    this.stopCurrentSort = this.stopCurrentSort.bind(this);
    this.updatebars = this.updatebars.bind(this);
    this.updateBarsFromState = this.updateBarsFromState.bind(this);
    this.clearCounters = this.clearCounters.bind(this);
    this.timeouts = [];

  }

  clearCounters = () => {
    document.getElementById('compairsons').innerText = 0;
    document.getElementById('swaps').innerText = 0;
    document.getElementById('total_ops').innerText = 0;
  }

  randomizebars = () => {
    this.stopCurrentSort();
    this.setState({
      bar_list: GenerateBars(num_bars, min_bar, max_bar)
    });
    this.clearCounters();

  }

  //Update the bars based on the current state of bar_list
  updateBarsFromState = () => {

    var bar_docs = document.getElementsByClassName("bar");
    var current_bars = []
    for (var j = 0; j < bar_docs.length; j++) {
      current_bars.push({
        color: bar_docs[j].style.backgroundColor,
        id: j,
        len: parseInt(bar_docs[j].style.height)
      })
    }
    this.setState({bar_list: current_bars});

  }

  //Interrupts the current sorting process
  stopCurrentSort = () => {

    //Clear all timeouts
    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }

    //Remove the bars that are currently red
    var bar_docs = document.getElementsByClassName("bar");
    for (var i = 0; i < bar_docs.length; i++) {
      if (bar_docs[i].style.backgroundColor === highlight_color) {
        bar_docs[i].style.backgroundColor = colorpernum(min_bar, max_bar, parseInt(bar_docs[i].style.height));
      }
    }

    //Update the current state with the bars that are visable
    this.updateBarsFromState();
  }

  render() {
    const {bar_list} = this.state;

    return (<div>
      <div id="UI_container">
        <div className="header">
          <div id="banner">
            <h1>Sorting Algorithm Visualizer</h1>
          </div>
          <div id="button_container">
            <button className="navbar_btn" onClick={() => this.randomizebars()}>Randomize</button>
            <button className="navbar_btn" onClick={() => this.updatebars(selectionsort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Selection Sort</button>
            <button className="navbar_btn">Merge Sort</button>
            <button className="navbar_btn">Quick Sort</button>
            <button className="navbar_btn">Heap Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(bubblesort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Bubble Sort</button>
          </div>
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
            <input type="range" className="custom-range" id="speedrange" defaultValue='99'></input>
            <div className="control_button_container">
            <button className="control_button navbar_btn">Start</button>
            <button className="control_button navbar_btn" onClick={() => this.stopCurrentSort()}>Stop</button>
            </div>

          </div>

          <Bars bar_list={bar_list}/>
        </div>
      </div>
    </div>);
  }

  updatebars = (updated_bars) => {
    this.clearCounters();

    this.timeouts = [];

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
    var speed = Math.abs((((-1 * (document.getElementById("speedrange").value)) * speed_max / 100.0) + speed_max));
    while (counter < animations.length) {

      this.timeouts.push(setTimeout(() => {
        if (started) {
          bar_docs[animations[k - 1][0]].style.backgroundColor = temporary_color[0];
          bar_docs[animations[k - 1][1]].style.backgroundColor = temporary_color[1];
        } else {
          started = true;
        }

        if (animations[k][2] === 0) {

          temporary_color[0] = bar_docs[animations[k][0]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][1]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = highlight_color;
          bar_docs[animations[k][1]].style.backgroundColor = highlight_color;

          num_compairsons += 1;
          document.getElementById('compairsons').innerText = num_compairsons;

        } else if (animations[k][2] === 1) {

          temp = bar_docs[animations[k][0]].style.height;
          bar_docs[animations[k][0]].style.height = bar_docs[animations[k][1]].style.height;
          bar_docs[animations[k][1]].style.height = temp;
          temporary_color[0] = bar_docs[animations[k][1]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][0]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = highlight_color;
          bar_docs[animations[k][1]].style.backgroundColor = highlight_color;

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

      }, counter * speed));
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
  //var place = Math.floor(255 * (number - min) / (max - min));
  //153,211,223
  var colors = [58,175,169]; //color 3
  var colors = [43,122,119]; //color 2
  /*222, 242, 241*/
  for (var i = 0; i < colors.length; i++) {
    colors[i] = Math.floor(colors[i] * (number - min) / (max - min));
  }

  var color = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  //return "#88BBD6"
  return color;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
